import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
const SingleProduct = () => {
  const [product, setProduct] = useState([]);

  const params = useParams();

  const history = useHistory();
  useEffect(() => {
    fetch(`/api/products/${params._id}`)
      .then((resposne) => resposne.json())
      .then((product) => {
        setProduct(product);
        //    console.log(product);
      });
  }, [params._id]);

  return (
    <div className="container mx-auto mt-12">
      <button
        className="mb-12 font-bold bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4"
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </button>
      <div className="flex">
        <img src={product.image} alt="pizzaPhoto"></img>
        <div className="ml-12">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">{product.price}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
