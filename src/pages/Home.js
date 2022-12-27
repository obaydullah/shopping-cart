import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsCartDashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addCart } from "../features/cart/cartSlice";

export default function Home() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await axios.get(
        "https://obaydullah.github.io/shopping-cart-api/products.json"
      );
      setProducts(data);
    }

    fetchProduct();
  }, []);

  const handleCart = (product) => {
    dispatch(addCart({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div className="max-w-container mx-auto">
        <div className="flex flex-wrap p-4">
          {products.map((product) => (
            <div key={product.id} className="w-[25%] bg-gray-100 p-2">
              <div className="p-3 bg-white">
                <div className="group relative">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-[230px]"
                  />

                  <div className="absolute top-0 right-0 w-full h-full bg-green-600/40 hidden group-hover:block">
                    <div className="w-full h-full flex items-center justify-center">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-white border border-solid border-white font-bold p-2 text-lg bg-orange-600/40"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
                <h2>{product.name}</h2>
                <div
                  className="flex justify-between"
                  onClick={() => handleCart(product)}
                >
                  <h3 className="text-orange-400">{product.price}$</h3>
                  <BsCartDashFill className="text-orange-600 text-2xl cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
