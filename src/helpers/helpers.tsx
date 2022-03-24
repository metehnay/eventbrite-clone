import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    getAuth
  } from "firebase/auth";
import { auth, provider } from "../configs/firebase-config";
import {useState} from 'react'

interface props {
  isAuth: string | boolean;
  SetIsAuth: React.Dispatch<React.SetStateAction<string | boolean>>
}
// Show and Hide Password

export function useToggle() {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const showPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const hidePassword = (event: Event) => {
    event.preventDefault();
  };

  return {values, setValues, showPassword,hidePassword};
}

// Login with Google ACCOUNT

export function GoogleSign(isAuth: any, setIsAuth: any, navigate: any) {
  signInWithPopup(auth, provider).then((result) => {
    localStorage.setItem("isAuth", "true");
    setIsAuth(true);
    navigate("/")
  });
}



// Login Function

  export async function LoginRequest(data: any, navigate: any) {
    try {
      const user =  await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      localStorage.setItem("isAuth", "true");
      navigate("/")
  
    } catch (error) {
      console.log("error");
    }
  
}


// Sign Up

export function SignUpRequest(data: any, setLoginPage: any) {
  const authentication = getAuth();
  createUserWithEmailAndPassword(authentication, data.email, data.password);
  setLoginPage(true)

}


