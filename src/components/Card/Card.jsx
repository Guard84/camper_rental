import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slice";
import { isFavorite } from "../../redux/selectors";
import toast from "react-hot-toast";
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
      toast("Removed from favorites", {
        icon: "❌",
        position: "top-right",
        duration: 2000
      });
    } else {
      dispatch(addFavorite(ad));
      toast("Added to favorites", {
        icon: "✅",
        position: "top-right",
        duration: 2000
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!ad || !ad.gallery || ad.gallery.length === 0) {
    return null;
  }

  return (
    <div className={css.wrap}>
      <img src={ad.gallery[0]} alt="First Image" className={css.image} />
      <div className={css.infoWrap}>
        <div>
          <div className={css.headerWrap}>
            <h2 className={css.cardTitle}>{ad.name}</h2>
            <div className={css.favoriteAction} onClick={toggleFavorite}>
              <p className={css.cardPrice}>€ {ad.price.toFixed(2)}</p>
              <svg
                className={favorite ? css.favoriteIconActive : css.favoriteIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <g clipPath="url(#clip0_58_198)">
                  <path
                    d="M21.3401 4.60999C20.8294 4.099 20.2229 3.69364 19.5555 3.41708C18.888 3.14052 18.1726 2.99817 17.4501 2.99817C16.7276 2.99817 16.0122 3.14052 15.3448 3.41708C14.6773 3.69364 14.0709 4.099 13.5601 4.60999L12.5001 5.66999L11.4401 4.60999C10.4084 3.5783 9.00915 2.9987 7.55012 2.9987C6.09108 2.9987 4.69181 3.5783 3.66012 4.60999C2.62843 5.64169 2.04883 7.04096 2.04883 8.49999C2.04883 9.95903 2.62843 11.3583 3.66012 12.39L4.72012 13.45L12.5001 21.23L20.2801 13.45L21.3401 12.39C21.8511 11.8792 22.2565 11.2728 22.533 10.6053C22.8096 9.93789 22.9519 9.22248 22.9519 8.49999C22.9519 7.77751 22.8096 7.0621 22.533 6.39464C22.2565 5.72718 21.8511 5.12075 21.3401 4.60999Z"
                    stroke="#101828"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={favorite ? css.heartPathActive : css.heartPath}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_58_198">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
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
          <Button onClick={openModal}>Show more</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} ad={ad} />
      </div>
    </div>
  );
};

export default Card;
