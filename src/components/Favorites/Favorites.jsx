import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/selectors';
import Card from '../Card/Card';
import css from './Favorites.module.css';

const Favorites = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <div className={css.wrap}>
      <div className={css.infoWrap}>
        {favorites.length === 0 ? (
          <p>No favorites selected yet.</p>
        ) : (
          <ul className={css.cardList}>
            {favorites.map((ad) => (
              <li key={ad._id} className={css.cardItem}>
                <Card ad={ad} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;
