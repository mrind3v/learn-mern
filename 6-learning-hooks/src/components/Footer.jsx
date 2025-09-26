import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
// Contact and Footer should show phone number
// we will consume the context here - step3 
const Footer = () => {
    const {phone,name} = useContext(AppContext) // useContext is required for consuming the context - provide name
    // of context to useContext 
  return (
    <div>
        <h1>Footer</h1>
        <h3>Phone: {phone}</h3>
        <h3>Name: {name}</h3>
    </div>
  )
}

export default Footer