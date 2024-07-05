import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import css from './Modal.module.css';
import Features from '../Features/Features';
import Reviews from '../Reviews/Reviews';

const Modal = ({ isOpen, onClose, ad }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const closeModal = () => {
    onClose();
    navigate(-1); // Go back to the previous route when closing modal
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalBackdrop} onClick={closeModal}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.modalClose} onClick={closeModal}>×</button>
        <h2>{ad.name}</h2>
        <div className={css.gallery}>
          {ad.gallery.map((image, index) => (
            <img key={index} src={image} alt={`camper gallery ${index + 1}`} />
          ))}
        </div>
        <p>€ {ad.price.toFixed(2)}</p>
        <p>
          {ad.rating}
          <span>({ad.reviews.length} Reviews)</span>
        </p>
        <p>{ad.location}</p>
        <p>{ad.description}</p>
        <div className={css.tabs}>
          <Link to={`${ad._id}/features`}>Features</Link>
          <Link to={`${ad._id}/reviews`}>Reviews</Link>
        </div>
        <Routes>
          <Route path={`${ad._id}/features`} element={<Features ad={ad} />} />
          <Route path={`${ad._id}/reviews`} element={<Reviews reviews={ad.reviews} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Modal;
