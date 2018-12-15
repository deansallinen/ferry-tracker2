import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default (props) => {
  const { routeName } = props;
  const favourites = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('favourites')) || [] : [];
  const [isFavourite, toggleFavourite] = useState(favourites && favourites.includes(routeName));
  useEffect(() => {
    let newFavourites = [];
    if (favourites.includes(routeName) && !isFavourite) {
      newFavourites = favourites.filter(favourite => favourite !== routeName);
    }
    if (!favourites.includes(routeName) && isFavourite) {
      newFavourites = [routeName, ...favourites];
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
  }, [isFavourite]);

  return (
      <div className="icon" onClick={() => toggleFavourite(!isFavourite)}>
          {isFavourite ? <FontAwesomeIcon icon={['fas', 'star']} /> : <FontAwesomeIcon icon={['far', 'star']} />}
        </div>
  );
};
