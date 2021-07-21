import React from "react";
import { useContext, useEffect, useState } from "react";
import Product from "../components/Product";
import { CartContext } from "../pages/CartContext";
const Cart = () => {
    let total =0;
  const [ products, setProduct ] = useState([]);
  const { cart ,setCart } = useContext(CartContext);
  
  const [priceFetched,togglePricedFetched] =useState(false);
  
  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if(priceFetched){
        return;
    }
    fetch("/api/products/cart-items", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((products) => {
        setProduct(products);
        togglePricedFetched(true);
      });
  }, [cart]);

  const getQty = (productId) =>{
      return cart.items[productId];
  }

  const handleDelete = (productId) =>{
      const _cart ={...cart};
      const qty =_cart.items[productId];
      delete _cart.items[productId];
      _cart.totalItems-=qty;
      setCart(_cart);
      const updatedProductsList = products.filter((product) => product._id !==productId);
      setProduct(updatedProductsList);

  } 

  const getSum =(productId, productPrice) => {
      const sum=productPrice*getQty(productId);
      total+=sum;
      return sum;
  }

  const increment = (productId) => {
      const oldQty =cart.items[productId];
      const _cart ={...cart};
      _cart.items[productId]=oldQty+1;
      _cart.totalItems +=1;
      setCart(_cart);
  }
  
  const decrement = (productId) => {
    const oldQty =cart.items[productId];
    if(oldQty === 1){
        return;
    }
    const _cart ={...cart};
    _cart.items[productId]=oldQty-1;
    _cart.totalItems -=1;
    setCart(_cart);
}

const handleOrderNow = () => {
    window.alert('Order Placed ');
    setProduct([]);
    setCart([]);
}

  return (
      products.length ?
    <div className="container mx-auto lg:w-1/2 w-full pb-24 pl-5">
      <h1 className="my-12 font-bold">Cart Item</h1>
      <ul>
        {
            products.map( product => {
                return (
                    <li className="mb-12 " key={product._id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-16"
                          src={product.image}
                          alt="pizaa"
                        ></img>
                        <span className="font-bold ml-4 w-48">{product.name}</span>
                      </div>
                      <div>
                        <button onClick={()=>{decrement(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading -none">
                          -
                        </button>
                        <b className="px-4">{ getQty(product._id)}</b>
                        <button onClick={()=>{increment(product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading -none">
                          +
                        </button>
                      </div>
                      <span> $ {getSum(product._id,product.price)}</span>
                      <button onClick={()=>{handleDelete(product._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                        Delete
                      </button>
                    </div>
                  </li>
                );
            })
        }
      </ul>

      <hr className="my-6"></hr>
      <div className="text-right font-bold">Grand Total : $ {total}</div>
      <div className="text-right mt-6">
        <button onClick={handleOrderNow} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
    :
    <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="kuch kharid lo"></img>
  );
};

export default Cart;
