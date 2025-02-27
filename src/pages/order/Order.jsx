import React, { useEffect } from "react";
import { uContext } from "../../context/MyState";

function Order() {
  const context = uContext();
  const { mode, order, user } = context;
  useEffect(() =>{
    order
  },[order])
  return (
    <div>
      {order.length > 0 ? (
        <div className=" h-full pt-10">
          {order.map((order) => {
            if (user) {
              if (user.uid === order.userid) {
                return (
                  <div
                    key={order.id}
                    className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
                  >
                    {order.cartItems.map((item) => {
                      return (
                        <div key={item.id} className="rounded-lg md:w-2/3">
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={{
                              backgroundColor: mode === "dark" ? "#282c34" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <img
                              src={item.imageURL}
                              alt="product-image"
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={{
                                    color: mode === "dark" ? "white" : "",
                                  }}
                                >
                                  {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            } else {
              return (
                <h2 key={order.id} className=" text-center tex-4xl font-bold text-gray-600">Not Order</h2>
              );
            }
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Order;
