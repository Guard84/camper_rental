import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds } from '../redux/operations';
import { selectAllAds } from '../redux/selectors';
import Card from '../components/Card';
import Modal from '../components/Modal/Modal';
import { Routes, Route } from 'react-router-dom';
import Features from '../components/Features/Features';
import Reviews from '../components/Reviews/Reviews';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const ads = useSelector(selectAllAds);
  const adStatus = useSelector((state) => state.ads.status);
  const error = useSelector((state) => state.ads.error);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    if (adStatus === 'idle') {
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

  return (
    <div>
      <h1>Catalog</h1>
      {ads.map((ad) => (
        <Card key={ad._id} ad={ad} onClick={() => handleCardClick(ad)} />
      ))}
      {adStatus === 'loading' && <p>Loading...</p>}
      {adStatus === 'failed' && <p>Error: {error}</p>}
      {adStatus !== 'loading' && ads.length % 4 === 0 && (
        <button onClick={loadMore}>Load more</button>
      )}
      {adStatus !== 'loading' && ads.length % 4 !== 0 && (
        <p>End of catalog.</p>
      )}
      {selectedAd && (
        <Modal isOpen={!!selectedAd} onClose={handleCloseModal} ad={selectedAd} />
      )}
      <Routes>
        <Route path="features" element={<Features ad={selectedAd} />} />
        <Route path="reviews" element={<Reviews reviews={selectedAd?.reviews} />} />
      </Routes>
    </div>
  );
};

export default CatalogPage;
