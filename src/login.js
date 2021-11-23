import React from "react";
import firebase from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
// import { getAuth, RecaptchaVerifier } from "firebase/auth";
class Login extends React.Component{
    handleChange=(e)=>{
        const {name,value} =e.target;
        this.setState({
            [name]:value
        })
    }

    
    captchaconfig=()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            this.onGetOTPSubmit();
            console.log("recaptcha success");
        }
        });
    }
    onGetOTPSubmit=(e)=> {
        e.preventDefault();
        this.captchaconfig();
        const phoneNumber = "+91" + this.state.mobile;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log("OTP has been successfully sent");
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("SMS not sent");
            });
    }
    onSubmitOTP = (e) => {
        e.preventDefault();
        const code = this.state.otp;
        const userName = this.state.userName;
        if(code==null){
            alert("Please enter the OTP first")
        }
        window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        alert(`${userName} signed in successfully`);
        // ...
        }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("OTP is incorrect");
        });
    }
    onClickGoggle=(e)=>{
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            alert(`${user.displayName} is signed in  via ${user.email} successfully`);
            // ...
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <>
            <label></label>
            <div id="sign-in-button"></div>
            <h3 className="mt-5">Welcome back !!</h3>
            <div className="container pt-5 mt-2 ml-auto col-md-4 border rounded border-danger bg-dark ">
                <form>
                <div className="mb-3 ">
                    <label for="inputName" className="form-lable text-white">User Name</label>
                    <input type="text" name="userName" className="form-control" id="inputText" placeholder="User Name" onChange={this.handleChange} required></input>
                    </div>
                    <div className="mb-3 ">
                    <label for="inputEmail" className="form-lable text-white">Email Address</label>
                    <input type="email" className="form-control" id="inputEmail" onChange={this.handleChange} area-discribedby="emailHelp" placeholder="XXXXu**XXXX@mnit.ac.in" required></input>
                    <div className="form-text">Please enter your Institute mail id</div>
                    </div>
                    
                        <div className="mb-3 ">
                        <label for="inputMobile" className="form-lable text-white">Mobile</label>
                        <div className="form-text">Please enter your registrated Mobile Number</div>
                        <input type="tel" name="mobile" placeholder="123-456-7890" className="form-control" id="inputMobile" onChange={this.handleChange}required ></input>
                        <button className="btn btn-secondary mt-2" onClick={this.onGetOTPSubmit}>Get OTP</button>
                        
                    
                    </div>
                    <div className="col-xs-3 form-group">
                    <label for="inputMobile" className="form-lable text-white">OTP</label>
                    <input type="" name="otp"  className="form-control col-xs-2" placeholder="123456" onChange={this.handleChange}></input>
                    <button className="btn btn-danger mt-2 mb-2" type="submit" onClick={this.onSubmitOTP}>Submit</button>
                    </div>
                    <div className="form-text text-light">OR</div>
                    <div className="col-xs-3 form-group">
                    <button className="btn btn-warning mt-2 mb-2" type="submit" onClick={this.onClickGoggle}>Login With Google</button>
                    </div>
                </form>
            </div>
            </>
        )
    }
}
export default Login;