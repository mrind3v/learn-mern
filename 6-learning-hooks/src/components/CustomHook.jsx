import React, { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const CustomHook = () => {
//   const [name, setName] = useState(
//     // basically the inital value of name would be taken from localstorage if it exists,
//     // otherwise, it would be an empty string
//     localStorage.getItem("username") ? localStorage.getItem("username") : ""
//   );

//   // useEffect will execute the callback fn inside it every time the name state changes -> what will the
//   // callback fn do? whatever change has occured to the name state, will write it to the 'username' key
//   // in the localstorage
//   useEffect(()=>{
//     localStorage.setItem('username', name)
//   }, [name]) 

// but if we want to say have this logic of accessing item from localstorage and then saving it in localstorage
// again when the state changes in some other compnt we will have to write the same piece of code in that compnt
// as well. So we will create a custom hook so we do not have to repeat stuff. The name of our hook will start
// with "use..." --> go to the hooks folder now, and write useLocalStorage

// will now use our custom hook 
const [name, setName] = useLocalStorage('username','')
// say i want to store one more data in local storage
const [id,setId] = useLocalStorage('userId', '')

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <h1>Hello, {name}!</h1>
      <input type="text" value={id} placeholder="Type in your id" onChange={(e)=>{setId(e.target.value)}}/>
      <h1>Your ID: {id}</h1>
    </div>
  );
};

export default CustomHook;
