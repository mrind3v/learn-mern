// first import create context - step 1
import { createContext } from "react";

export const AppContext = createContext();

// next - define a provider function
const ContextProvider = (props) => {
    // here we declare the data we want to share/provide
    const phone = "+91 1234567890"
    const name = "mrind3v"
    return (
        // Use appcontext, we can provide the data defined above to other compnts   
        // value will be returned to compnt - where we want to send data using this context
        <AppContext.Provider value={{phone,name}}> {/* when we want to send more than one data - make obj */} 
            {props.children}
        </AppContext.Provider>
    )

}
export default ContextProvider

// next go to main.jsx file - for providing context support in our react project