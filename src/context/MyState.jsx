import myContext from "./context";
import { useContext, useEffect, useState } from "react";

// Firebase Config
import { firebaseApp } from "../firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Use context
export const uContext = () => useContext(myContext);

// getAuth
const auth = getAuth(firebaseApp);

// Google auth provider
const provider = new GoogleAuthProvider();

// getFirestore
export const db = getFirestore(firebaseApp);

// MyState function
function MyStateProvider({ children }) {
  // user
  const [user, setUser] = useState(null);

  // Loading
  const [loading, setLoading] = useState(false);

  // Dark And light Button
  const [mode, setMode] = useState("light");
  //  Dark and light btn
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  // SignIn Authentication function
  const signUpUserWithEmailAndPassword = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // Login Authentication
  const signInEmailAndPassword = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  // Signin With Google
  const signInGoogle = async () => {
    return await signInWithPopup(auth, provider);
  };

  //  SignOut method
  const logOut = async () => {
    if (user) {
      localStorage.clear();
    }
    return await signOut(auth).then(() =>
      toast.success("Successfully Logout", {
        autoClose: 1200,
        hideProgressBar: false,
      })
    );
  };

  //  OnAuthStateChange - User Login or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // add data in firestore function
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageURL: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });
  const addProducts = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageURL == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    // add data in firebase
    const date = new Date()
    const timestamp = Timestamp.fromDate(date)
    products.time = timestamp
    const productRef = collection(db, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product add Successfully", {
        hideProgressBar: true,
        autoClose: 1000,
      });
      setLoading(false);
      readData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts({
      title: "",
      price: "",
      imageURL: "",
      category: "",
      description: "",
    });
  };

  const [getProduct, setGetProduct] = useState(null);
  // Read data
  const readData = async () => {
    try {
      const q = query(collection(db, "products"), orderBy("time"));
      const data = onSnapshot(q, (querySnapshot) => {
        let productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetProduct(productArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const unsubscribe = readData();
    return () => unsubscribe;
  }, []);

  // Edit Product Function
  const editHandle = (item) => {
    setProducts(item);
  };

  // Update Data
  const updateProduct = async () => {
    try {
      const productRef = doc(db, "products", products.id);
      await setDoc(productRef, products);
      toast.success("Updated Successfully");
      readData();
      setProducts({});
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Data
  const deleteProduct = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      toast.success("Deleted Successfully", {
        hideProgressBar: true,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Format Numbers With Commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Order Data function
  const [order, setOrder] = useState([]);
  const getOrderData = async () => {
    try {
      const result = await getDocs(collection(db, "order"));
      const orderData = [];
      result.forEach((doc) => {
        if (user) {
          orderData.push({ ...doc.data(), id: doc.id, userId: user.uid });
        } else {
          orderData.push({ ...doc.data(), id: doc.id});
        }
      });
      setOrder(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  // GetuserData
  const [users, setUsers] = useState([]);

  const getUserData = async () => {
    try {
      const userResult = await getDocs(collection(db, "user"));
      const userData = [];
      userResult.forEach((doc) => {
        userData.push(doc.data());
      });
      setUsers(userData);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter logic States
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);
  const isLoggedIn = user ? true : false;
  return (
    <myContext.Provider
      value={{
        mode,
        toggleMode,
        signUpUserWithEmailAndPassword,
        signInEmailAndPassword,
        signInGoogle,
        logOut,
        setProducts,
        addProducts,
        formatNumber,
        readData,
        updateProduct,
        editHandle,
        deleteProduct,
        products,
        isLoggedIn,
        getProduct,
        user,
        loading,
        order,
        users,
        searchKey,
        setSearchKey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
      }}
    >
      {children}
    </myContext.Provider>
  );
}

export default MyStateProvider;
