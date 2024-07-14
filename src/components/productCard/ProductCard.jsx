import React, { useEffect, useState } from "react";
import { db, uContext } from "../../context/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CreateSlice";
import { toast } from "react-toastify";
import { Loader } from "../component";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ProductCard({ category, heading }) {
  const context = uContext();
  const { mode, formatNumber, loading } = context;
  const [visibleProducts, setVisibleProducts] = useState(4);
  const dispatch = useDispatch();
  const cartSlice = useSelector((state) => state.cart);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Add to cart", {
      autoClose: 1200,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    if (!category) return;

    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("time"),
      limit(8)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productArray = [];
      querySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setProduct(productArray);
    });

    return () => unsubscribe();
  }, [category]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartSlice));
  }, [cartSlice]);

  // const handleMore = () => {
  //   setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  // };
  useEffect(() => {
    window.scrollTo(0, 0)
   },[])

   const handleMore2 = () => {
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("time"),
      limit(visibleProducts + 4) // Increment the limit to load more items
    );
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productArray = [];
      querySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id: doc.id });
      });
      setProduct(productArray);
    });
  
    setVisibleProducts(visibleProducts + 4);
  
    return () => unsubscribe();
   }
  return (
    <div>
      {/* Section Start Here */}
      <section>
        {loading ? <Loader /> : null}
        <div className="container px-5 py-8 md:py-16 mx-auto">
          {/* Heading */}
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              {heading}
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Card start here */}
            {product &&
              product.slice(0, visibleProducts).map((item, index) => {
                return (
                  <div
                    onClick={() => navigate(`/productinfo/${item.id}`)}
                    className="p-4 md:w-1/4 drop-shadow-lg"
                    key={index}
                  >
                    <div
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out  border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div
                        onClick={() => navigate(`/productinfo/${item.id}`)}
                        className="flex justify-center cursor-pointer"
                      >
                        <img
                          className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                          src={item.imageURL}
                          alt="blog"
                        />
                      </div>
                      <div className="p-5 border-t-2">
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ECOMYFY
                        </h2>
                        <h1
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {item.title}
                        </h1>
                        <p
                          className="leading-relaxed mb-3"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹ {formatNumber(item.price)}
                        </p>
                        <div className=" flex justify-center">
                          <button
                            onClick={() => addCart(item)}
                            type="button"
                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Card End here */}
          </div>
          {product && visibleProducts <= product.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleMore2}
                type="button"
                className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </section>
      {/* Section End Here */}
    </div>
  );
}

export default ProductCard;
