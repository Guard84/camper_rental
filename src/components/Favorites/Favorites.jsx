import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/selectors';
import Card from '../Card/Card';
import css from './Favorites.module.css'

const Favorites = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.wrap}>
      <div className={css.infoWrap}>
      {favorites.length === 0 ? (
        <p>No favorites selected yet.</p>
      ) : (
        favorites.map((ad) => <Card key={ad._id} ad={ad} />)
      )}
      </div>
    </div>
  );
};

export default Favorites;