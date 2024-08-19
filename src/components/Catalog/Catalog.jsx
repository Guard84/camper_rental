import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, setFilters } from "../../redux/operations";
import { selectAllAds } from "../../redux/selectors";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Filter from "../Filter/Filter";
import css from "./Catalog.module.css";

const Catalog = () => {
  const dispatch = useDispatch();
  const ads = useSelector(selectAllAds);
  const adStatus = useSelector((state) => state.ads.status);
  const error = useSelector((state) => state.ads.error);
  const filteredAds = useSelector((state) => state.ads.filteredAds);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showNoResults, setShowNoResults] = useState(false);

  useEffect(() => {
    if (adStatus === "idle") {
      dispatch(fetchAds(1));
    }
  }, [adStatus, dispatch]);

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
    dispatch(setFilters(newFilters));
  };

  const handleSearch = () => {
    const results = filteredAds.filter(ad => {
      if (!filteredAds.filters) {
        return true;
      }
      const { location, equipment, vehicleType } = filteredAds.filters;
      const matchesLocation = location ? ad.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesEquipment = equipment.length > 0
        ? equipment.every(eq => ad.details[eq] > 0)
        : true;
      const matchesVehicleType = vehicleType ? ad.form === vehicleType : true;
      return matchesLocation && matchesEquipment && matchesVehicleType;
    });

    if (results.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
  };

  return (
    <div className={css.wrap}>
      <div className={css.filters}>
        <Filter onFilterChange={handleFilterChange} onSearch={handleSearch} />
      </div>
      <div className={css.cards}>
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <Card key={ad._id} ad={ad} onClick={() => handleCardClick(ad)} />
          ))
        ) : showNoResults ? (
          <p>No ads found for the selected filters.</p>
        ) : null}
        {adStatus === "loading" && <p>Loading...</p>}
        {adStatus === "failed" && <p>Error: {error}</p>}
        {adStatus !== "loading" &&
          filteredAds.length % 4 === 0 &&
          filteredAds.length > 0 && (
            <button className={css.btnLoadMore} onClick={loadMore}>
              Load more
            </button>
          )}
        {adStatus !== "loading" &&
          filteredAds.length % 4 !== 0 &&
          filteredAds.length > 0 && <p>End of catalog.</p>}
        {selectedAd && (
          <Modal
            isOpen={!!selectedAd}
            onClose={handleCloseModal}
            ad={selectedAd}
          />
        )}
      </div>
    </div>
  );
};

export default Catalog;
