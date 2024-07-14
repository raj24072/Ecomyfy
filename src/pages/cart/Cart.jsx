import React, { useEffect, useState } from "react";
import { db, uContext } from "../../context/MyState";
import { Modal } from "../../components/component";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCart } from "../../redux/CreateSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

function Cart() {
  const context = uContext();
  const { mode, formatNumber, user } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Delete To Cart
  const deleteToCarts = (item) => {
    dispatch(deleteToCart(item));
    toast.success("Successfully deleted to cart", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Subtotal and shipping charge
  const [subtotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const shippingCharge = 20;

  // Calculate subtotal and total
  useEffect(() => {
    let newSubtotal = 0;
    cartItems.forEach((item) => {
      newSubtotal += parseInt(item.price, 10);
    });
    setSubTotal(newSubtotal);
  }, [cartItems]);

  // Calculate Total Amount
  useEffect(() => {
    const totalShippingCharge = cartItems.length * shippingCharge;
    setTotalAmount(subtotal + totalShippingCharge);
  }, [subtotal, cartItems]);

  //
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const buyNow = async () => {
    // Validation
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
    const addressInfo = {
      cartItems,
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      email: user.email,
      userid: user.uid,
    };

    try {
      const orderRef = collection(db, "order");
      await addDoc(orderRef, addressInfo).then(() =>
        toast.success("Orderd Successfully", {
          autoClose: 1000,
          hideProgressBar: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // Cart Product Start here

    <div
      className="h-auto bg-gray-100 pt-5"
      style={{
        backgroundColor: mode === "dark" ? "#282c34" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <h1 className="pb-5 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-2/3 ">
          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
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
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {item.title}
                      </h2>
                      <h2
                        className="text-sm  text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {item.description}
                      </h2>
                      <p
                        className="mt-1 text-xs font-semibold text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{formatNumber(item.price)}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => deleteToCarts(item)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div
          className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
          style={{
            backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <div className="mb-2 flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Subtotal
            </p>
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              ₹{formatNumber(subtotal)}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Shipping
            </p>
            <p
              className="text-gray-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              ₹{shippingCharge}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-3">
            <p
              className="text-lg font-bold"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Total
            </p>
            <div className>
              <p
                className="mb-1 text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹{formatNumber(totalAmount)}
              </p>
            </div>
          </div>
          {/* <Modal  /> */}
          <Modal
            name={name}
            address={address}
            pincode={pincode}
            phoneNumber={phoneNumber}
            setName={setName}
            setAddress={setAddress}
            setPincode={setPincode}
            setPhoneNumber={setPhoneNumber}
            buyNow={buyNow}
          />
        </div>
      </div>
    </div>
    // Cart Product End here
  );
}

export default Cart;
