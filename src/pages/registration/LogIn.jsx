import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uContext } from "../../context/MyState";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import google from "../../assets/image/google.svg";
function LogIn() {
  const context = uContext();
  const { signInEmailAndPassword, signInGoogle, isLoggedIn, user } = context;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  // User LoggedIn to navigate
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [context, isLoggedIn]);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    const domainRegex = /^[a-zA-Z.-]+$/; // updated pattern to disallow numbers in domain
    const [localPart, domain] = email.split("@");
    return (
      emailRegex.test(email) && domainRegex.test(domain.replace(/\./g, ""))
    );
  };

  // Password Validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const signIn = (e) => {
    e.preventDefault();

    let valid = true;
    if (email === "" || password == "") {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number."
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      signInEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <form onSubmit={signIn}>
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-0">{emailError}</p>
            )}
          </div>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            <span
              className="absolute  right-2 top-5 -translate-y-1/2  cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-200" />
              ) : (
                <FaEye className="text-gray-200" />
              )}
            </span>
            {passwordError && (
              <p className="text-red-500 text-sm text-wrap w-[320px]">
                {passwordError}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-white py-2"> OR</p>
        <div className="flex-center items-center">
          <button
            type="button"
            onClick={signInGoogle}
            className="bg-gray-100 w-full flex items-center justify-between text-black px-6 font-medium py-2 rounded-lg"
          >
            <span>Google</span>
            <img src={google} className="w-4" />
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/register"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
