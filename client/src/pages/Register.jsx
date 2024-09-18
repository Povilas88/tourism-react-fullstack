import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Register() {
    const minUsernameLength = 3;
    const maxUsernameLength = 20;
    const minPasswordLength = 8;
    const maxPasswordLength = 100;

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    function submitForm(e) {
        e.preventDefault();
        setIsFormValidated(true);

        let usernameError = '';

        if (username.length < minUsernameLength) {
            usernameError = `Username is too short, must be atleast ${minUsernameLength} symbols.`;
        } else if (username.length > maxUsernameLength) {
            usernameError = `Username is too long, must be a maximum of ${maxUsernameLength} symbols.`;
        }
        setUsernameError(usernameError);

        let passwordError = '';
        if (password.length < minPasswordLength) {
            passwordError = `Password is too short, must be atleast ${minPasswordLength} symbols.`;
        } else if (password.length > maxPasswordLength) {
            passwordError = `Password is too long, must be a maximum of ${maxPasswordLength} symbols.`;
        }
        setPasswordError(passwordError);

        if (!usernameError && !passwordError) {
            fetch('http://localhost:5020/api/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            })
                .then(res => res.json())
                .then(data => setApiResponse(data))
                .catch(err => console.error(err))
        }
    }

    return (
        <>
            <Header />
            <main className="form-signin w-100 m-auto">
                <div className="row">
                    <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>

                        {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.data}</p> : null}
                        {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.data}</p> : null}

                        <div className="form-floating">
                            <input value={username} onChange={e => setUsername(e.target.value.trim())}
                                type="text" id="username" placeholder="Username"
                                className={'form-control ' + (isFormValidated ? usernameError ? 'is-invalid' : 'is-valid' : '')}
                            />
                            <label htmlFor="username">Username</label>
                            {/* {usernameError ? <p>{usernameError}</p> : null} */}
                            {usernameError && <p className="invalid-feedback">{usernameError}</p>}
                        </div>

                        <div className="form-floating">
                            <input value={password} onChange={e => setPassword(e.target.value.trim())}
                                type="password" id="password" placeholder="Password"
                                className={'form-control ' + (isFormValidated ? passwordError ? 'is-invalid' : 'is-valid' : '')} />
                            <label htmlFor="password">Password</label>
                            {passwordError && <p className="invalid-feedback">{passwordError}</p>}
                        </div>

                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Register</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}