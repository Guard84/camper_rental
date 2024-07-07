import css from "./Features.module.css";
import Form from "../Form/Form";

const Features = ({ ad }) => (
  <div className={css.featuresCont}>
    <div className={css.wrap}>
      <div className={css.features}>
        <p className={css.featuresItem}>{ad.adults} adults</p>
        <p className={css.featuresItem}>
          {ad.transmission.charAt(0).toUpperCase() + ad.transmission.slice(1)}
        </p>
        <p className={css.featuresItem}>
          {ad.engine.charAt(0).toUpperCase() + ad.engine.slice(1)}
        </p>
        {ad.details.bathroom !== 0 && <p className={css.featuresItem}>Bathroom</p>}
        {ad.details.kitchen && <p className={css.featuresItem}>Kitchen</p>}
        <p className={css.featuresItem}>{ad.details.beds} beds</p>
        <p className={css.featuresItem}>
          {ad.details.airConditioner} air conditioner
        </p>
        {ad.details.TV !== 0 && <p className={css.featuresItem}>TV</p>}
        {ad.details.CD !== 0 && <p className={css.featuresItem}>CD</p>}
        {ad.details.radio !== 0 && <p className={css.featuresItem}>Radio</p>}
        {ad.details.shower !== 0 && <p className={css.featuresItem}>Shower</p>}
        {ad.details.toilet !== 0 && <p className={css.featuresItem}>Toilet</p>}
        {ad.details.freezer !== 0 && (
          <p className={css.featuresItem}>Freezer</p>
        )}
        <p className={css.featuresItem}>{ad.details.hob} hob</p>
        {ad.details.microwave !== 0 && (
          <p className={css.featuresItem}>Microwave</p>
        )}
        {ad.details.gas !== 0 && (
          <p className={css.featuresItem}>Gas: {ad.details.gas}</p>
        )}
        <p className={css.featuresItem}>Water: {ad.details.water}</p>
      </div>
    <div className={css.details}>
      <h3 className={css.detailsTitle}>Vehicle details</h3>
      <ul className={css.detailsList}>
        <li>
          <span>Form</span>
          <span>{ad.form.charAt(0).toUpperCase() + ad.form.slice(1)}</span>
        </li>
        <li>
          <span>Length</span>
          <span>{ad.length}</span>
        </li>
        <li>
          <span>Width</span>
          <span>{ad.width}</span>
        </li>
        <li>
          <span>Height</span>
          <span>{ad.height}</span>
        </li>
        <li>
          <span>Tank</span>
          <span>{ad.tank}</span>
        </li>
        <li>
          <span>Consumption</span>
          <span>{ad.consumption}</span>
        </li>
      </ul>
    </div>
    </div>
    <Form />
  </div>
);

export default Features;
