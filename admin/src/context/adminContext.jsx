import { createContext, useState } from "react";
export const adminContext = createContext(null);


const AdminContextProvider = (props) =>{



const contextValue = {
}

return(
  <adminContext.Provider value={contextValue}>
    {props.children}
  </adminContext.Provider>
)
}

export default AdminContextProvider;