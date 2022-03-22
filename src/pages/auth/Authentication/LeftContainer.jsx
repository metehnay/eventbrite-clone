import React, {useState, useCallback} from 'react'
import google from "../../../images/svg/google.svg"
import facebook from "../../../images/svg/facebook.svg"
import apple from "../../../images/svg/apple.svg"
import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import { auth, provider } from "../../../configs/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useContext, MainContext } from "../../../hooks/Context";
import { useNavigate, Link } from "react-router-dom";

const LeftContainer = () => {
  const [loginPage, setLoginPage] = useState(true)
  const { isAuth, setIsAuth } = useContext(MainContext);
  let navigate = useNavigate();

  const signIn = useCallback(() => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  }, [isAuth, setIsAuth, navigate]);

  return (
    <div className="left-container">
    <div className="left-inside">

  {/* Header Content */}
  
<div className="login-header">
<h1>eventbrite</h1>
<h2>{loginPage ? "Log in" : "Create an account"}</h2>

</div>

{/* Login Form and Buttons  */}

<LoginForm loginPage={loginPage} setLoginPage={setLoginPage} />
<SignUp loginPage={loginPage} setLoginPage={setLoginPage}/>


</div>


{/* Divider  */}

<div className="divider">
  <div className="responsive-circle">
<div className="lines">
<div className="circle">
<span className="circle-text">or</span>
</div></div></div>

</div>

{/* Social Login Links */}
<div className="sign-container">
<h4 className="google" onClick={signIn}><img src={google} alt="google" /><span>Sign in with Google</span></h4>
<h4 className="facebook" onClick={signIn}><img src={facebook} alt="facebook" /><span>Sign in with Facebook</span></h4>
<h4 className="apple" onClick={signIn}><img src={apple} alt="apple" /><span>Sign in with Apple</span></h4>
<h5 onClick={() => setLoginPage(!loginPage)}>{loginPage ? "Sign up for Eventbrite" : "Log in"}</h5>
</div></div>

  )
}

export default LeftContainer