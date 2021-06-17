import React from "react";
import "./Contact.css";
import { useState } from "react";
import axios from "axios";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitEmail = () => {
    axios
      .post("/contact", {name, email, message})
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
    <form className="contact-form">
      <input
        placeholder="Name"
        id="name"
        type="text"
        className="contactInput"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br></br>

      <input
        placeholder="Email"
        id="email"
        type="email"
        className="contactInput"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br></br>

      <textarea
        placeholder="Message"
        id="message"
        type="text"
        className="message-field"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br></br>
      <br></br>

      <button
        className="submit-button"
        onClick={() => {
          submitEmail();
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default Contact;
