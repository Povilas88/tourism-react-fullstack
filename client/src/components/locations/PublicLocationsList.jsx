import { useContext } from 'react';
import { LocationCard } from './LocationCard';
import { GlobalContext } from '../../context/GlobalContext';

export function PublicLocationsList({ locations }) {
    const { likedLocations } = useContext(GlobalContext);
    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                {locations.map((location, index) =>
                    <LocationCard
                        key={index}
                        isLiked={likedLocations.includes(location.id)}
                        {...location} />)}
            </div>
        </div>
    );
}