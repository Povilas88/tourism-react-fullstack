import { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LocationCard } from "../components/locations/LocationCard";

export function LocationListing() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5020/api/locations')
            .then(res => res.json())
            .then(obj => {
                if (typeof obj !== 'object') {
                    throw new Error('Non object type');
                } else {
                    setLocations(obj.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
        // .finally(() => {
        //     console.log('Final');

        // })
    }, []);

    return (
        <>
            <Header />
            <main>
                <div className="container"></div>
                <div className="container px-4 py-5" id="custom-cards">
                    <h2 className="pb-2 border-bottom">Custom cards</h2>
                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        {locations.map((location, index) => <LocationCard key={index} {...location} />)}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}