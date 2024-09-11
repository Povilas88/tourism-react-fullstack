import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LocationCard } from "../components/locations/LocationCard";

export function LocationListing() {
    const locationsData = [];

    return (
        <>
            <Header />
            <main>
                <div className="container"></div>
                <div className="container px-4 py-5" id="custom-cards">
                    <h2 className="pb-2 border-bottom">Custom cards</h2>
                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        {locationsData.map((location, index) => <LocationCard key={index} {...location} />)}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}