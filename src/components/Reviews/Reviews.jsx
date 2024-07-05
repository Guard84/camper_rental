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
        <div key={index} className={css.review}>
          {getInitialsCircle(review.reviewer_name)}
          <div className={css.reviewContent}>
            <h3>{review.reviewer_name}</h3>
            <p>{review.reviewer_rating}</p>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
    <div className={css.formContainer}>
      <Form />
    </div>
  </div>
);

export default Reviews;
