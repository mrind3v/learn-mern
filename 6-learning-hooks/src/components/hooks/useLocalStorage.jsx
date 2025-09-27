import { useState, useEffect } from "react";
import React from "react";

const useLocalStorage = (key, iniVal) => {
  const [name, setName] = useState(
    // basically the inital value of name would be taken from localstorage if it exists,
    // otherwise, it would be an empty string
    localStorage.getItem(key) ? localStorage.getItem(key) : iniVal
  );

  // useEffect will execute the callback fn inside it every time the name state changes -> what will the
  // callback fn do? whatever change has occured to the name state, will write it to the 'username' key
  // in the localstorage
  useEffect(() => {
    localStorage.setItem(key, name);
  }, [name,key]);

  return [name, setName]; // return the updated name and setName
};

export default useLocalStorage;
