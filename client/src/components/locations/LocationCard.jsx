import logo from '../../assets/react.svg'
export function LocationCard({ img, name, address }) {

    return (
        <>
            <div className="col">
                <div className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
                    style={{ backgroundImage: `url(${img})` }}>
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{name}</h3>
                        <ul className="d-flex list-unstyled mt-auto">
                            <li className="me-auto">
                                <img src={logo} alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                            </li>
                            {/* <li className="d-flex align-items-center me-3">
                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill"></use></svg>
                                <small>{address.country}</small>
                            </li> */}
                            <li className="d-flex align-items-center">
                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3"></use></svg>
                                <small>3d</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}