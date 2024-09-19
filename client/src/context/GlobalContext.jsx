/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"

export const initialContext = {
    isLoggedIn: false,
    changeLoginStatus: () => { },
}

export const GlobalContext = createContext(initialContext)

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);

    function changeLoginStatus(newStatus = false) {
        setIsLoggedIn(newStatus)
    }

    return (
        <GlobalContext.Provider value={{ isLoggedIn, changeLoginStatus }}>
            {props.children}
        </GlobalContext.Provider>
    )
}