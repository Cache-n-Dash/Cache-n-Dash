import React from "react";
import "./Contact.css";
import { useState } from "react";
import axios from "axios";
import { Parallax } from "react-parallax";

function Contact() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");

   const img1 =
      "https://images.pexels.com/photos/5302814/pexels-photo-5302814.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

   const submitEmail = () => {
      axios
         .post("/contact", { name, email, message })
         .then((res) => {
            console.log(res);
            alert("Message sent. Thank you for your feedback.");
            resetFrom();
         })
         .catch((err) => {
            console.log(err);
            alert("Send error.");
         });
   };

   const resetFrom = () => {
      setName("");
      setEmail("");
      setMessage("");
   };

   //   console.log(name)
   //   console.log(email)
   //   console.log(message)

   return (
      <div className="center">
         <Parallax className="para2" bgImage={img1} strength={400} blur={3}>
            <div className="bg-img" />
            <div className="box">
               <div>
                  <h1>Contact Us</h1>
                  <div className="line" />
               </div>
               <form className="contact-form">
                  <div className="form-title">
                     <p>Name</p>
                     <input
                        placeholder="Name"
                        id="name"
                        type="text"
                        className="contactInput"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>

                  <br></br>
                  <div className="form-title">
                     <p>Email</p>
                     <input
                        placeholder="Email"
                        id="email"
                        type="email"
                        className="contactInput"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>

                  <br></br>
                  <p>Message</p>

                  <textarea
                     placeholder="Message"
                     id="message"
                     type="text"
                     className="message-field"
                     required
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  />

                  <br></br>
                  <br></br>

                  <button
                     className="btn"
                     onClick={() => {
                        submitEmail();
                     }}
                  >
                     Submit
                  </button>
               </form>
            </div>
         </Parallax>
      </div>
   );
}

export default Contact;
