// import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import {useHistory} from "react-router-dom";

export const DataContext = createContext();

export const UserProvider = ({ children }) => {
    const [selected,setSelected] = useState(false)
    const [courses,setCourses] = useState([])
    const [crseLocs,setCrseLocs] = useState([])
    const [oneCourse,setOneCourse] = useState({})
    // const history = useHistory();

    useEffect(()=>{
        axios.get("/courses")
        .then(res=>{
            setCourses(res.data)
            // console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

   return (
      <DataContext.Provider
        //  value={{ user, setUser, handleLogin, handleRegister }}
        value={{selected,setSelected,courses,setCourses,crseLocs,setCrseLocs,oneCourse,setOneCourse}}
      >
         {children}
      </DataContext.Provider>
   );
};