import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { GlobalContext } from "../context/GlobalContext"
import { Link } from "react-router-dom";
import { PublicLocationsList } from "../components/locations/PublicLocationsList";

export function Dashboard() {
    const { isLoggedIn, role, likedLocations } = useContext(GlobalContext);
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

    return (
        <>
            <Header />
            {
                isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <h1>Dashboard</h1>
                                    <Link to='/locations/new' className="btn btn-primary">+ New location</Link>
                                </div>
                                {
                                    role === 'user' &&
                                    <PublicLocationsList
                                        locations={locations.filter(obj => likedLocations.includes(obj.id))} />
                                }
                            </div>
                        </div>
                    </section>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>401</h1>
                                <p>This page can only be seen by logged in users, log in first</p>
                            </div>
                        </div>
                    </section>
                </main>
            }
            <Footer />
        </>
    );
}