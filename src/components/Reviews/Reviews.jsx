import css from "./Reviews.module.css";
import Form from "../Form/Form";

const getInitialsCircle = (name) => {
  const initials = name.trim().charAt(0).toUpperCase();
  return (
    <div className={css.avatar}>
      <span>{initials}</span>
    </div>
  );
};

const Reviews = ({ reviews }) => (
  <div className={css.reviewsContainer}>
    <div className={css.reviews}>
      {reviews.map((review, index) => (
        <div key={index}>
          <div className={css.reviewHeader}>
          {getInitialsCircle(review.reviewer_name)}
          <div className={css.reviewRating}>
          <h3 className={css.reviewName}>{review.reviewer_name}</h3>
          <p>{review.reviewer_rating}</p>
          </div>
          </div>
          <div className={css.reviewContent}>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
    <Form />
  </div>
);

export default Reviews;
