import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import { useContext, MainContext } from "../../../hooks/Context";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import { auth, provider } from "../../../configs/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { SignUpRequest, useToggle } from "../../../helpers/helpers";
const SignUp = ({loginPage, setLoginPage}) => {
  const { isAuth, setIsAuth, inputLabel, inputLabel2, setInputLabel, setInputLabel2} = useContext(MainContext);
  const [visibility, setVisibility] = useState(false)
  const {values, setValues, showPassword, hidePassword} = useToggle();

  const [error, setError] = useState(false)
  let navigate = useNavigate();

  const handleAction =  (data) => {
    SignUpRequest(data)
        
      }
    // useForm settings 

    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(4).max(24).required()
      })

      const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

  return (
    <>
       {!loginPage ?
       <form onSubmit={handleSubmit(handleAction)}>

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
              onClick={showPassword}
              onMouseDown={hidePassword}
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