/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react"

export const initialContext = {
    isLoggedIn: false,
    changeLoginStatus: () => { },
}

export const GlobalContext = createContext(initialContext)

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);

    useEffect(() => {
        fetch('http://localhost:5020/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setIsLoggedIn(data.isLoggedIn))
            .catch(e => console.error(e))
    }, [])

    function changeLoginStatus(newStatus = false) {
        setIsLoggedIn(newStatus)
    }

    return (
        <GlobalContext.Provider value={{ isLoggedIn, changeLoginStatus }}>
            {props.children}
        </GlobalContext.Provider>
    )
}