import { useState } from 'react';
import css from './Filter.module.css'

const Filter = ({ filters, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...localFilters };

    if (type === 'checkbox') {
      if (checked) {
        newFilters.equipment.push(value);
      } else {
        newFilters.equipment = newFilters.equipment.filter((item) => item !== value);
      }
    } else if (type === 'radio') {
      newFilters.type = value;
    } else {
      newFilters[name] = value;
    }

    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className={css.wrap}>
      <input
        type="text"
        name="location"
        placeholder="Search by location"
        value={localFilters.location}
        onChange={handleChange}
      />
      <div>
        <label>
          <input
            type="checkbox"
            name="equipment"
            value="kitchen"
            checked={localFilters.equipment.includes('kitchen')}
            onChange={handleChange}
          />
          Kitchen
        </label>
        <label>
          <input
            type="checkbox"
            name="equipment"
            value="beds"
            checked={localFilters.equipment.includes('beds')}
            onChange={handleChange}
          />
          Beds
        </label>
        {/* Add more checkboxes for other equipment as needed */}
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="type"
            value="camper"
            checked={localFilters.type === 'camper'}
            onChange={handleChange}
          />
          Camper
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="van"
            checked={localFilters.type === 'van'}
            onChange={handleChange}
          />
          Van
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="fullyIntegrated"
            checked={localFilters.type === 'fullyIntegrated'}
            onChange={handleChange}
          />
          Fully Integrated
        </label>
        {/* Add more radio buttons for other types as needed */}
      </div>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default Filter;
