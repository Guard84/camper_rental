import css from './Button.module.css'

const Button = ({ onClick, children }) => {
  return (
    <button className={css.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

