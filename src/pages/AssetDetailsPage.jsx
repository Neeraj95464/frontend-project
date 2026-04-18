// AssetDetailsPage.jsx - Parent component
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssetDetails from './AssetDetails';
import { getAssetByTag, getAllAssets, getAssetPhotos } from '../services/api';

const AssetDetailsPage = () => {
  const { assetTag } = useParams();
  const navigate = useNavigate();
  const [allAssets, setAllAssets] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [assetPhotos, setAssetPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllAssets();
  }, []);

  useEffect(() => {
    if (allAssets.length > 0 && assetTag) {
      const index = allAssets.findIndex(asset => asset.assetTag === assetTag);
      if (index !== -1) {
        setCurrentIndex(index);
        loadCurrentAsset(allAssets[index]);
      }
    }
  }, [allAssets, assetTag]);

  const loadAllAssets = async () => {
    try {
      const assets = await getAllAssets();
      setAllAssets(assets);
    } catch (error) {
      console.error("Failed to load assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentAsset = async (asset) => {
    setCurrentAsset(asset);
    try {
      const photos = await getAssetPhotos(asset.assetTag);
      setAssetPhotos(photos);
    } catch (error) {
      console.error("Failed to load photos:", error);
    }
  };

  const handleNavigate = (newIndex) => {
    const newAsset = allAssets[newIndex];
    if (newAsset) {
      navigate(`/asset/${newAsset.assetTag}`);
      loadCurrentAsset(newAsset);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!currentAsset) {
    return <div className="flex justify-center items-center h-screen">Asset not found</div>;
  }

  return (
    <AssetDetails
      asset={currentAsset}
      assetPhotos={assetPhotos}
      allAssets={allAssets}
      currentIndex={currentIndex}
      onNavigate={handleNavigate}
    />
  );
};

export default AssetDetailsPage;