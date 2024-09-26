import { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { SecretContent } from "../components/secret-content/SecretContent";
import { NewLocationForm } from "../components/forms/NewLocationForm";
export function NewLocation() {
    const { isLoggedIn, role } = useContext(GlobalContext);
    return (
        <>
            <Header />
            {isLoggedIn && role === 'admin' && <NewLocationForm />}
            {(!isLoggedIn || role !== 'admin') && <SecretContent dedicatedRole="admin" />}
            <Footer />
        </>
    );
}