import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slice';
import { isFavorite } from '../redux/selectors';
import Button from './Button';
import Modal from './Modal/Modal';

const Card = ({ ad }) => {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => isFavorite(state, ad._id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = () => {
    if (favorite) {
      dispatch(removeFavorite(ad));
    } else {
      dispatch(addFavorite(ad));
    }
  };

  const openModal = () => {
    console.log('Opening modal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>{ad.name}</h2>
      <p>
        <img src={ad.gallery[0]} alt="First Image" />
      </p>
      <p>€ {ad.price.toFixed(2)}</p>
      <p>
        {ad.rating}
        <span>({ad.reviews.length} Reviews)</span>
      </p>
      <p>{ad.location}</p>
      <p>{ad.description}</p>
      <p>{ad.adults} adults</p>
      <p>{ad.transmission.charAt(0).toUpperCase() + ad.transmission.slice(1)}</p>
      <p>{ad.engine.charAt(0).toUpperCase() + ad.engine.slice(1)}</p>
      {ad.details.kitchen && <p>Kitchen</p>}
      <p>{ad.details.beds} beds</p>
      <button
        onClick={toggleFavorite}
        style={{ color: favorite ? 'red' : 'black' }}
      >
        {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Button onClick={openModal}>Show more</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} ad={ad} />
    </div>
  );
};

export default Card;
