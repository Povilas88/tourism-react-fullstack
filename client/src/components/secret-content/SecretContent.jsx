import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
export function SecretContent({ dedicatedRole }) {
    const { isLoggedIn, role } = useContext(GlobalContext);
    return (
        <main className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Turinys nepasiekiamas</h1>
                    {role !== dedicatedRole &&
                        <p>Turinys yra skirtas tik &quot;{dedicatedRole}&quot; vartotojams</p>
                    }
                    {!isLoggedIn &&
                        <Link to='/login' className="btn btn-primary">Prisijungti</Link>
                    }
                </div>
            </div>
        </main>
    );
}