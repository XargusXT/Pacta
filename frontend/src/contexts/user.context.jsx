import { createContext } from "react";

//plantilla basica para un contexto
const UserContext=createContext();

function UserProviderWrapper({props}){
    //value={}
    return(
        <UserContext.Provider >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProviderWrapper};