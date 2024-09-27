/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react"

export const initialContext = {
    isLoggedIn: false,
    role: 'public',
    username: '',
    changeLoginStatus: () => { },
    likedLocations: [],
    addLike: () => { },
    removeLike: () => { },
};

export const GlobalContext = createContext(initialContext)

export function GlobalContextWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);
    const [likedLocations, setLikedLocations] = useState(initialContext.likedLocations);

    useEffect(() => {
        fetch('http://localhost:5020/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(data.isLoggedIn);
                setRole(data.role);
                setUsername(data.username);
            })
            .catch(e => console.error(e));
    }, []);

    useEffect(() => {
        if (isLoggedIn !== true || role !== 'user') {
            return;
        }

        fetch('http://localhost:5020/api/likes-list', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLikedLocations(data.list);
                }
            })
            .catch(e => console.error(e));
    }, [isLoggedIn, role]);

    function changeLoginStatus(newStatus = false) {
        setIsLoggedIn(newStatus)
    }

    function changeRole(newRole = initialContext.role) {
        setRole(newRole);
    }

    function changeUsername(newUsername = initialContext.username) {
        setUsername(newUsername);
    }

    function addLike(locationId) {
        fetch('http://localhost:5020/api/like', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ locationId }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLikedLocations(pre => [...pre, locationId]);
                }
            })
            .catch(err => console.log(err));
    }
    function removeLike(locationId) {
        fetch('http://localhost:5020/api/like', {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({ locationId }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setLikedLocations(pre => pre.filter(n => n !== locationId));
                }
            })
            .catch(err => console.log(err));
    }

    const values = {
        isLoggedIn,
        changeLoginStatus,
        role,
        changeRole,
        username,
        changeUsername,
        likedLocations,
        addLike,
        removeLike,
    };

    return (
        <GlobalContext.Provider value={values}>
            {props.children}
        </GlobalContext.Provider>
    );
}