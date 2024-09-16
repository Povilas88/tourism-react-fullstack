import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"

export function Register() {
    return (
        <>
            <Header />
            <main className="form-signin w-100 m-auto">
                <div className="row">
                    <form className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <h1 className="h3 mb-3 fw-normal">Please register</h1>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign in</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}