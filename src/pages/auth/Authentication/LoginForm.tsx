// IMPORTS

import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import { useContext, MainContext } from "../../../hooks/Context";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { LoginRequest, useToggle} from './../../../helpers/helpers';

//COMPONENT

interface Props {
  loginPage: boolean;
  setLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({loginPage, setLoginPage}: Props) => {
  const { inputLabel, inputLabel2, setInputLabel, setInputLabel2 } = useContext(MainContext);
  const [error, setError] = useState(false)
  const [visibility, setVisibility] = useState(false);
  const {values, setValues, showPassword, hidePassword} = useToggle();
  const navigate = useNavigate();

  const logged = async (data: Props) => {
    LoginRequest(data, navigate)
  };

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
       {loginPage ?
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
              onClick={showPassword}
              onMouseDown={hidePassword}
            >
                {!values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton></div>
}
<input type={values.showPassword ? "text" : "password"} id="pass" className={errors.password  ? "form-error" : "form-input" } 
{...register("password")} 
onFocus={() => (setInputLabel2(true), setVisibility(true))} 
onBlur={() => (setVisibility(false), setInputLabel2(false),  
setValues({ ...values, showPassword: false }))}  
/></div>
{errors.password && <span style={{fontSize: "12px", color: "#C61C33"}}>Password is invalid</span>}
{error && <span style={{fontSize: "12px", color: "#C61C33"}}>Email or password is wrong. Please try again...</span>}
 {/* Buttons */}

<button className="form-button">Log in</button>

<button className="form-button-secondary">Email me a login link</button>
</div>
</form>
: ""}
    </>
  )
}

export default LoginForm