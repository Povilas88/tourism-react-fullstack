export function LocationTableRow({ index, name, img, country, city, street, number, zip, linkVisibility }) {
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>
                <img src={img} alt={name} style={{ maxHeight: '4rem', maxWidth: '6rem' }} />
            </td>
            <td>{name}</td>
            {linkVisibility ? <td>{img}</td> : null}
            <td>{country}</td>
            <td>{city}</td>
            <td>{street}</td>
            <td>{number}</td>
            <td>{zip}</td>
            <td>
                <button className="btn btn-small btn-danger" type="button">Delete</button>
            </td>
        </tr>
    );
}