import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Parallax } from "react-parallax";
import "./Auth.css";

function Auth() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [username, setUsername] = useState("");
   const { handleLogin, handleRegister } = useContext(UserContext);
   const img1 =
      "https://images.unsplash.com/photo-1603623898182-2cd32c343d70?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";

   const [showReg, setShowReg] = useState(true);

   return (
      <div className="background">
         <Parallax className="para1" bgImage={img1} strength={400} blur={3}>
            <div className="center">
               {showReg ? (
                  <div className="auth-box">
                     <div>
                        <h1>Login</h1>
                        <div className="line" />
                        <div className="center auth">
                           <input
                              value={email}
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                           />
                           <input
                              value={password}
                              placeholder="password"
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                           />
                           <button
                              className="btn"
                              onClick={() => handleLogin(email, password)}
                           >
                              Login
                           </button>
                        </div>
                     </div>
                     <div>
                        <p> Not yet a user? </p>
                        <button
                           className="btn purple"
                           onClick={() => setShowReg(!showReg)}
                        >
                           Register Now!
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="auth-box">
                     <h1>Register</h1>
                     <div className="line" />
                     <div className="center auth">
                        <input
                           value={email}
                           placeholder="email"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                           value={username}
                           placeholder="username"
                           onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                           value={password}
                           placeholder="password"
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                           value={confirmPassword}
                           placeholder="confirm password"
                           type="password"
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                           className="btn"
                           onClick={() =>
                              handleRegister(
                                 email,
                                 username,
                                 password,
                                 confirmPassword
                              )
                           }
                        >
                           Register
                        </button>
                     </div>
                     <div>
                        <p>Already a user?</p>
                        <button
                           className="btn purple"
                           onClick={() => setShowReg(!showReg)}
                        >
                           Go To Login
                        </button>
                     </div>
                  </div>
               )}
            </div>
         </Parallax>
      </div>
   );
}

export default Auth;
