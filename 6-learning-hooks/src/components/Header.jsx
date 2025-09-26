import React from 'react'

const Header = () => {
    console.log("Header rendered") 
  return (
    <div>
        <h2>Header</h2>
    </div>
  )
}

export default React.memo(Header) // memoizing the entire compnt
// so even after incg count in useCallback, we wont see "Header rendered in console"