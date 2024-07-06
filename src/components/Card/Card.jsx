import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slice";
import { isFavorite } from "../../redux/selectors";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import css from "./Card.module.css";

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
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div className={css.wrap}>
    
        <img src={ad.gallery[0]} alt="First Image" className={css.image} />
     
      <div className={css.infoWrap}>
        <div>
          <div className={css.headerWrap}>
            <h2 className={css.cardTitle}>{ad.name}</h2>
            <p className={css.cardPrice}>€ {ad.price.toFixed(2)}</p>
          </div>
          <div className={css.ratingWrap}>
            <p className={css.cardRating}>
              {ad.rating}
              <span>({ad.reviews.length} Reviews)</span>
            </p>
            <p className={css.cardLocation}>{ad.location}</p>
          </div>
        </div>
        <p className={css.cardDescription}>{ad.description}</p>
        <div className={css.detailsCont}>
          <p className={css.cardDetails}>{ad.adults} adults</p>
          <p className={css.cardDetails}>
            {ad.transmission.charAt(0).toUpperCase() + ad.transmission.slice(1)}
          </p>
          <p className={css.cardDetails}>
            {ad.engine.charAt(0).toUpperCase() + ad.engine.slice(1)}
          </p>
          {ad.details.kitchen && <p className={css.cardDetails}>Kitchen</p>}
          <p className={css.cardDetails}>{ad.details.beds} beds</p>
        </div>
        <div>
        <button className={css.btnFavorite}
          onClick={toggleFavorite}
          style={{ color: favorite ? "red" : "black" }}
        >
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        </div>
        <div>
        <Button onClick={openModal}>Show more</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} ad={ad} />
      </div>
    </div>
  );
};

export default Card;
