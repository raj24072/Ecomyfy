import React from "react";
import { uContext } from "../../context/MyState";
import { FaUserTie } from "react-icons/fa";
import DashboardTab from "./DashboardTab";

function Dashboard() {
  const context = uContext();
  const { mode, getProduct, order, users} = context;
  return (
    // Secton start here
    <section className="text-gray-600 body-font mt-10 mb-10">
      <div className="container px-5 mx-auto mb-10">
       
        <div className="flex flex-wrap -m-4 text-center">
          {/* First Card */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {getProduct && getProduct.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Products
              </p>
            </div>
          </div>
          {/* Second Card */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {order && order.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Orders
              </p>
            </div>
          </div>
          {/* Third Card */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {users && users.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Users
              </p>
            </div>
          </div>
          {/* Fourth Card */}
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div
              className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div
                className="text-purple-500 w-12 h-12 mb-3 inline-block"
                viewBox="0 0 24 24"
              >
                <FaUserTie size={50} />
              </div>
              <h2
                className="title-font font-medium text-3xl text-black fonts1"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {getProduct && getProduct.length}
              </h2>
              <p
                className=" text-purple-500  font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total Products
              </p>
            </div>
          </div>
        </div>
      </div>
      <DashboardTab />
    </section>
  );
}

export default Dashboard;
