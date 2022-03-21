import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    getAuth
  } from "firebase/auth";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { auth, provider } from "../configs/firebase-config";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React,{useState, useCallback} from 'react'

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

export function SignUpRequest(data) {
  const authentication = getAuth();
    
  createUserWithEmailAndPassword(authentication, data.email, data.password);
  
}

