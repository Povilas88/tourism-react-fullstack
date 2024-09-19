import { useContext } from "react"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { GlobalContext } from "../context/GlobalContext"

export function Dashboard() {
    const { isLoggedIn } = useContext(GlobalContext)

    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <h1>Dashboard</h1>
                    <p>Only loged in users can see this page.</p>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <h1>404</h1>
                    <p>Only loged in users can see this page.</p>
                </main>
            }
            <Footer />
        </>
    )
}