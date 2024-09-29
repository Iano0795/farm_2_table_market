import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/farmercard.css';

const FarmerCard = ({ farmer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/farmers/id`); // Navigate to the farmer's detail page with their ID
  };

  return (
    <div className="farmerCard" onClick={handleCardClick}> {/* Clickable card */}
      <div className="farmBanner">
        <img src={farmer.bannerImage} alt={`${farmer.name} Banner`} />
      </div>
      <div>
        <p><strong>Name:</strong> {farmer.name}</p>
        <p><strong>Location:</strong> {farmer.location}</p>
      </div>
      <h3>Products</h3>
      <div>
        {farmer.products.map((product, index) => (
          <p key={index}>{product}</p>
        ))}
      </div>
    </div>
  );
};

export default FarmerCard;
