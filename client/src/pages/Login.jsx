import { useContext, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export function Login() {
    const { changeLoginStatus, changeRole, changeUsername } = useContext(GlobalContext);
    const { VITE_MODE, VITE_USERNAME, VITE_PASSWORD } = import.meta.env;
    const initialUsername = VITE_MODE === 'dev' ? (VITE_USERNAME ?? 'admin') : '';
    const initialPassword = VITE_MODE === 'dev' ? (VITE_PASSWORD ?? 'adminadminadmin') : '';

    const minUsernameLength = 3;
    const maxUsernameLength = 20;
    const minPasswordLength = 12;
    const maxPasswordLength = 100;

    const [username, setUsername] = useState(initialUsername);
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState(initialPassword);
    const [passwordError, setPasswordError] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    const navigate = useNavigate();

    function submitForm(e) {
        e.preventDefault();

        setIsFormValidated(true);

        let usernameError = '';
        if (username.length < minUsernameLength) {
            usernameError = `Username is too short, minimum ${minUsernameLength} characters`;
        } else if (username.length > maxUsernameLength) {
            usernameError = `Username is too long, maximum ${maxUsernameLength} characters`;
        }
        setUsernameError(usernameError);

        let passwordError = '';
        if (password.length < minPasswordLength) {
            passwordError = `Password is too short, minimum ${minPasswordLength} characters`;
        } else if (password.length > maxPasswordLength) {
            passwordError = `Password is too long, maximum ${maxPasswordLength} characters`;
        }
        setPasswordError(passwordError);

        if (!usernameError && !passwordError) {
            fetch('http://localhost:5020/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setApiResponse(data);

                    if (data.status === 'success') {
                        changeLoginStatus(data.isLoggedIn);
                        changeRole(data.role);
                        changeUsername(data.username);
                        navigate('/dashboard');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <>
            <Header />
            <main className="form-signin container">
                <div className="row">
                    <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <h1 className="h3 mb-3 fw-normal">Login</h1>

                        {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.msg}</p> : null}
                        {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.msg}</p> : null}

                        <div className="form-floating">
                            <input value={username} onChange={e => setUsername(e.target.value.trim())}
                                type="text" id="username" placeholder="Chuck"
                                className={'form-control ' + (isFormValidated ? usernameError ? 'is-invalid' : 'is-valid' : '')} />
                            <label htmlFor="username">Username</label>
                            {usernameError && <p className="invalid-feedback">{usernameError}</p>}
                        </div>

                        <div className="form-floating">
                            <input value={password} onChange={e => setPassword(e.target.value)}
                                type="password" id="password" placeholder="Password"
                                className={'form-control ' + (isFormValidated ? passwordError ? 'is-invalid' : 'is-valid' : '')} />
                            <label htmlFor="password">Password</label>
                            {passwordError && <p className="invalid-feedback">{passwordError}</p>}
                        </div>

                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Login</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}