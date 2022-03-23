import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    getAuth
  } from "firebase/auth";
import { auth, provider } from "../configs/firebase-config";
import {useState} from 'react'


// Show and Hide Password

export function useToggle() {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const showPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const hidePassword = (event) => {
    event.preventDefault();
  };

  return {values, setValues, showPassword,hidePassword};
}

// Login with Google ACCOUNT

export function GoogleSign(isAuth, setIsAuth, navigate) {
  signInWithPopup(auth, provider).then((result) => {
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    navigate("/")
  });
}



// Login Function

  export async function LoginRequest(data, navigate) {
    try {
      const user =  await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("isAuth", true);
      navigate("/")
  
    } catch (error) {
      console.log(error.message);
    }
  
}


// Sign Up

export function SignUpRequest(data, setLoginPage) {
  const authentication = getAuth();
  createUserWithEmailAndPassword(authentication, data.email, data.password);
  setLoginPage(true)

}


