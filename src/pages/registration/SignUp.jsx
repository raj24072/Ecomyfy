import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, uContext } from "../../context/MyState";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
function SignUp() {
  const context = uContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { signUpUserWithEmailAndPassword, isLoggedIn, user } = context;
  const navigate = useNavigate();

  // Signin to redirect Home page
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

  const signUp = (e) => {
    e.preventDefault();

    let valid = true;
    if (name === "" || email === "" || password == "") {
      // alert("require all fields");
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
      signUpUserWithEmailAndPassword(email, password)
        .then(async () => {
          await setUser();
          toast.success("Signup Sucessfully", {
            autoClose: 1200,
            hideProgressBar: false,
          });
        })
        .catch((error) => {
          console.log(error),
            toast.error("Already Logged Account", {
              autoClose: 1200,
              hideProgressBar: false,
            });
        });
      setName("");
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  };
  const setUser = async () => {
    const usersData = collection(db, "user");
    return await addDoc(usersData, {
      name: name,
      email: email,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <form onSubmit={signUp}>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-0">{emailError}</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
            />
            <span
              className="absolute top-5 right-2 -translate-y-1/2  cursor-pointer text-white"
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
          <div className=" flex justify-center mb-3">
            <button
              type="submit"
              className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
            >
              Signup
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
