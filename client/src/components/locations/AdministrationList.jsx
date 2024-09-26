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
                <button onClick={changeVisibility} type="button">Show/hide picture link</button>
                <table className="table table-bordered border-primary">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Picture</th>
                            <th scope="col">Title</th>
                            {linkVisibility ? <th scope="col">Picture link</th> : null}
                            <th scope="col">Country</th>
                            <th scope="col">City</th>
                            <th scope="col">Street</th>
                            <th scope="col">Number</th>
                            <th scope="col">Postal code</th>
                            <th scope="col">Actions</th>
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