import { useState } from 'react';
import { AiOutlineEnvironment } from 'react-icons/ai';
import css from './Filter.module.css';

const Filter = ({ filters, onFilterChange, onSearch }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFilters = { ...localFilters };
    newFilters[name] = value;
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className={css.wrap}>
      <div className={css.inputWrapper}>
        <AiOutlineEnvironment className={css.icon} />
        <input className={css.input}
          type="text"
          name="location"
          placeholder="enter the desired location"
          value={localFilters.location}
          onChange={handleChange}
        />
      </div>
      <button className={css.btnSearch} onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default Filter;
