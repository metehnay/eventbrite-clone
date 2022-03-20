import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import { useContext, MainContext } from "../hooks/Context";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../configs/firebase-config";
import { signInWithPopup } from "firebase/auth";
const SignUp = ({loginPage, setLoginPage}) => {
  const { isAuth, setIsAuth } = useContext(MainContext);
  const [error, setError] = useState(false)
  let navigate = useNavigate();

  const signIn = useCallback(() => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  }, [isAuth, setIsAuth, navigate]);

  const logged = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
 
      localStorage.setItem("isAuth", true);
      console.log("good");

    } catch (error) {
      console.log(error.message);
      console.log("wrong");
      setError(true)
    }

  };

    // Show / Hide Toggle 
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
      });

      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const [visibility, setVisibility] = useState(false)


    // useForm settings 

    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(4).max(24).required()
      })

      const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
      // const onSubmit = (data) => (console.log(data));

  // Input Label Colors 
  const [inputLabel, setInputLabel] = useState(false);
  const [inputLabel2, setInputLabel2] = useState(false);
      
  return (
    <>
       {!loginPage ?
       <form onSubmit={handleSubmit(logged)}>

<div className="login-form">

   {/* Email Input */}
  <div className="first-input">

    <label className="label"> 
      <span className={errors.email  ? "form-error" : "form-input" } id={inputLabel ? "blue-label" : ""}>Email adress</span>
    </label>
    
<input className={errors.email  ? "form-error" : "form-input" } 
{...register("email")} 
onFocus={ () => setInputLabel(true)} 
onBlur={() => setInputLabel(false)} 
/></div>
  {errors.email && <span style={{fontSize: "12px", color: "#C61C33", margin: "1px"}}>Please enter a valid email address</span>}


 {/* Password Input */}
<div className="second-input">
    <label className="label"> 
      <span className={errors.password  ? "form-error" : "form-input" } id={inputLabel2 ? "blue-label" : ""}>Password</span>
    </label>
    {visibility && 
    <div className="icon">
    <IconButton className="show-hide"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
                {!values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton></div>
}
<input type={values.showPassword ? "text" : "password"} id="pass" className={errors.password  ? "form-error" : "form-input" } 
{...register("password")} 
onFocus={ () => (setInputLabel2(true), setVisibility(true))} 
onBlur={() => (setVisibility(false), setInputLabel2(false),  setValues({ ...values, showPassword: false }))}  /></div>
{errors.password && <span style={{fontSize: "12px", color: "#C61C33"}}>Password is invalid</span>}
{error && <span style={{fontSize: "12px", color: "#C61C33"}}>Email or password is wrong. Please try again...</span>}
 {/* Buttons */}

<button className="form-button">Sign Up</button>
</div>
</form>
: ""}
    </>
  )
}

export default SignUp