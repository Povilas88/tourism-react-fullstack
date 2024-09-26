import { useState } from 'react';
import { LocationTableRow } from './LocationTableRow';

export function AdminLocationsList({ locations }) {
    const [linkVisibility, setLinkVisibility] = useState(true);
    function changeVisibility() {
        setLinkVisibility(pre => !pre);
    }
    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                <button onClick={changeVisibility} type="button">Rodyti/nerodyti nuotraukos nuorodą</button>
                <table className="table table-bordered border-primary">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nuotrauka</th>
                            <th scope="col">Pavadinimas</th>
                            {linkVisibility ? <th scope="col">Nuotraukos nuoroda</th> : null}
                            <th scope="col">Šalis</th>
                            <th scope="col">Miestas</th>
                            <th scope="col">Gatvė</th>
                            <th scope="col">Numeris</th>
                            <th scope="col">Paško kodas</th>
                            <th scope="col">Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            locations.map((location, index) =>
                                <LocationTableRow
                                    key={index}
                                    index={index}
                                    linkVisibility={linkVisibility}
                                    {...location} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}