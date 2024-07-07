import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds } from '../../redux/operations';
import { selectAllAds } from '../../redux/selectors';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import Filter from '../Filter/Filter';
import css from './Catalog.module.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const ads = useSelector(selectAllAds);
  const adStatus = useSelector((state) => state.ads.status);
  const error = useSelector((state) => state.ads.error);
  const [selectedAd, setSelectedAd] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    equipment: [],
    type: '',
  });
  const [filteredAds, setFilteredAds] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    if (adStatus === 'idle') {
      dispatch(fetchAds(1));
    }
  }, [adStatus, dispatch]);

  useEffect(() => {
    setFilteredAds(ads);
  }, [ads]);

  const loadMore = () => {
    dispatch(fetchAds(ads.length / 4 + 1));
  };

  const handleCardClick = (ad) => {
    setSelectedAd(ad);
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowNoResults(false);
    setFilteredAds(ads);
  };

  const handleSearch = () => {
    const result = ads.filter((ad) => {
      return (
        (!filters.location || ad.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.equipment.length === 0 || filters.equipment.every((eq) => ad.details[eq])) &&
        (!filters.type || ad.type === filters.type)
      );
    });
    setFilteredAds(result);
    setShowNoResults(result.length === 0);
  };

  return (
    <div className={css.wrap}>
      <div className={css.filters}>
        <Filter filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />
      </div>
      <div className={css.cards}>
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <Card key={ad._id} ad={ad} onClick={() => handleCardClick(ad)} />
          ))
        ) : showNoResults ? (
          <p>No ads found for the selected location.</p>
        ) : null}
        {adStatus === 'loading' && <p>Loading...</p>}
        {adStatus === 'failed' && <p>Error: {error}</p>}
        {adStatus !== 'loading' && filteredAds.length % 4 === 0 && filteredAds.length > 0 && (
          <button className={css.btnLoadMore} onClick={loadMore}>Load more</button>
        )}
        {adStatus !== 'loading' && filteredAds.length % 4 !== 0 && filteredAds.length > 0 && (
          <p>End of catalog.</p>
        )}
        {selectedAd && (
          <Modal isOpen={!!selectedAd} onClose={handleCloseModal} ad={selectedAd} />
        )}
      </div>
    </div>
  );
};

export default Catalog;
