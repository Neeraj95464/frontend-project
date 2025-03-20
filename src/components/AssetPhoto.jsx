import axios from "axios";
import { useEffect, useState } from "react";

const AssetPhotos = ({ assetTag }) => {
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/assets/${assetTag}/photos`
        );

        setPhotoUrls(response.data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [assetTag]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
      {photoUrls.length > 0 ? (
        photoUrls.map((photoUrl, index) => (
          <img
            key={index}
            src={`http://localhost:8080/api/assets/photos/${photoUrl
              .split("\\")
              .pop()}`}
            alt={`Asset ${index}`}
            className="w-full h-40 object-cover rounded-lg shadow"
          />
        ))
      ) : (
        <p className="text-gray-500">No photos available</p>
      )}
    </div>
  );
};

export default AssetPhotos;
