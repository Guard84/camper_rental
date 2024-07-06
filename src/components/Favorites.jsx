import { useSelector } from 'react-redux';
import { selectFavorites } from '../redux/selectors';
import Card from './Card/Card';

const Favorites = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div>
      {favorites.length === 0 ? (
        <p>No favorites selected yet.</p>
      ) : (
        favorites.map((ad) => <Card key={ad._id} ad={ad} />)
      )}
    </div>
  );
};

export default Favorites;