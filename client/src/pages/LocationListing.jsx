import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { PublicLocationsList } from "../components/locations/PublicLocationsList";
import { AdminLocationsList } from "../components/locations/AdminLocationsList";
import { GlobalContext } from "../context/GlobalContext";

export function LocationListing() {
    const { role } = useContext(GlobalContext);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5020/api/locations')
            .then(res => res.json())
            .then(obj => {
                if (typeof obj !== 'object') {
                    throw new Error('Is serverio atejo ne objektas');
                } else {
                    setLocations(obj.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    let list = null;

    if (role === 'admin') {
        list = <AdminLocationsList locations={locations} />;
    } else {
        list = <PublicLocationsList locations={locations} />;
    }

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Places to visit</h1>
                            <p>Browse and choose the places you would like to visit!</p>
                        </div>
                    </div>
                </div>
                {list}
            </main>
            <Footer />
        </>
    );
}