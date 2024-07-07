import { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import css from "./Modal.module.css";
import Features from "../Features/Features";
import Reviews from "../Reviews/Reviews";

const Modal = ({ isOpen, onClose, ad }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const closeModal = () => {
    navigate(`/catalog`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={css.modalBackdrop} onClick={closeModal}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.modalClose} onClick={closeModal}>
          ×
        </button>
        <h2 className={css.modalTitle}>{ad.name}</h2>
        <div className={css.ratingCont}>
          <p className={css.modalRating}>
            {ad.rating}
            <span>({ad.reviews.length} Reviews)</span>
          </p>
          <p className={css.modalLocation}>{ad.location}</p>
        </div>
        <p className={css.modalPrice}>€ {ad.price.toFixed(2)}</p>
        <div className={css.gallery}>
          {ad.gallery.map((image, index) => (
            <img key={index} src={image} alt={`camper gallery ${index + 1}`} />
          ))}
        </div>
        <p className={css.modalDescr}>{ad.description}</p>
        <div className={css.tabs}>
          <Link 
            to={`${ad._id}/features`} 
            className={location.pathname.includes('features') ? css.activeTab : css.inactiveTab}
          >
            Features
          </Link>
          <Link 
            to={`${ad._id}/reviews`} 
            className={location.pathname.includes('reviews') ? css.activeTab : css.inactiveTab}
          >
            Reviews
          </Link>
        </div>
        <Routes>
          <Route path={`${ad._id}/features`} element={<Features ad={ad} />} />
          <Route
            path={`${ad._id}/reviews`}
            element={<Reviews reviews={ad.reviews} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Modal;
