import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
// Contact and Footer should show phone number
// we will consume the context here - step3 

const Contact = () => {
    const {phone,name} = useContext(AppContext); 
    // notice that we are directly using context data (i.e. phone) inside this compnt, without even passing
    // it through the parent of this compnt which is profile
  return (
    <div>
        <h1>Contact</h1>
        <h3>Phone: {phone}</h3>
    </div>
  )
}

export default Contact