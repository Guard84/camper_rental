import css from "./Features.module.css";
import Form from "../Form/Form";

const Features = ({ ad }) => (
  <div>
    <div className={css.wrap}>
      <div className={css.features}>
        <p>{ad.adults} adults</p>
        <p>
          {ad.transmission.charAt(0).toUpperCase() + ad.transmission.slice(1)}
        </p>
        <p>{ad.engine.charAt(0).toUpperCase() + ad.engine.slice(1)}</p>
        {ad.details.bathroom && <p>Bathroom</p>}
        {ad.details.kitchen && <p>Kitchen</p>}
        <p>{ad.details.beds} beds</p>
        <p>{ad.details.airConditioner} air conditioner</p>
        {ad.details.TV && <p>TV</p>}
        {ad.details.CD !== 0 && <p>CD</p>}
        {ad.details.radio !== 0 && <p>Radio</p>}
        {ad.details.shower !== 0 && <p>Shower</p>}
        {ad.details.toilet !== 0 && <p>Toilet</p>}
        {ad.details.freezer !== 0 && <p>Freezer</p>}
        <p>{ad.details.hob} hob</p>
        {ad.details.microwave !== 0 && <p>Microwave</p>}
        {ad.details.gas !== 0 && <p>Gas: {ad.details.gas}</p>}
        <p>Water: {ad.details.water}</p>

        <h3>Vehicle details</h3>
        <div className={css.details}>
          <ul>
            <li>Form{ad.form}</li>
            <li>Length{ad.length}</li>
            <li>Width{ad.width}</li>
            <li>Height{ad.height}</li>
            <li>Tank{ad.tank}</li>
            <li>Consumption{ad.consumption}</li>
          </ul>
        </div>
      </div>
      <Form />
    </div>
  </div>
);

export default Features;
