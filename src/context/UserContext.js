import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {useHistory} from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const history = useHistory();

   useEffect(() => {
      axios
         .get("/auth/account")
         .then((res) => {
            setUser(res.data);
         })
         .catch((err) => console.log(err));
   }, []);

   const handleLogin = (email, password) => {
      axios
         .post("/auth/login", { email, password })
         .then((res) => {
            setUser(res.data);
            history.push('/profile');
         })
         .catch((err) => {
            alert(err, "email or password is not recognized");
            console.log(err);
         });
   };

   const handleRegister = (email, username, password, confirmPassword) => {
      if (password !== confirmPassword) {
         alert("Passwords don't match");
      } else {
         axios
            .post("/auth/register", { email, username, password })
            .then((res) => {
               setUser(res.data);
               history.push('/map')
               axios.post("/api/sendMail", { email, username });
            })
            .catch((err) => console.log(err));
      }
   };

   return (
      <UserContext.Provider
         value={{ user, setUser, handleLogin, handleRegister }}
      >
         {children}
      </UserContext.Provider>
   );
};
