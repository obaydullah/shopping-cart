import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [productImg, setProductImg] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(
        "https://obaydullah.github.io/shopping-cart-api/products.json"
      );

      let singleProduct = data.find((item) => {
        if (item.id == id) {
          setProductImg(item.images[0].url);
          return item;
        }
      });

      setProduct(singleProduct);
    }

    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addCart({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div className="max-w-container mx-auto mt-4">
        <div className="flex justify-center gap-10">
          <img
            src={productImg}
            alt="Obaydullah"
            className="h-[400px] bg-gray-400/40 p-10"
          />
          <div>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="mb-1">{product.numOfReviews} Reviews </p>
            <h5 className="mb-2 text-orange-500">{product.price}$</h5>
            <p className="text-base">{product.description}</p>

            <button
              className="mt-4 text-sm bg-green-500 text-white rounded p-2"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
