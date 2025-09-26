import React from 'react'
import Profile from './Profile'
import Footer from './Footer'

// useContext allows you to access data from any compnt without explicitly passing it down through props at
// at every level. It is used to manage global data in a react app -> prevents prop drilling from the topmost
// compnt (App) to some nested compnt (inside)

// three steps to use it
// 1. Create context
// 2. Providing the context
// 3. Consume context

const UseContext = () => {
  return (
    <div>
        
        <Profile/>
        <Footer/> 

    </div>
  )
}

export default UseContext