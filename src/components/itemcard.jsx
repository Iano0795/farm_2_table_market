import React from 'react';
import './styles/itemcard.css'; // We'll create this CSS file for ItemCard styles

const ItemCard = ({ item }) => {
  return (
    <div className="itemCard">
      <div className="itemBanner">
        <img src={item.bannerImage} alt={`${item.name} Banner`} /> {/* Replace with actual image path */}
      </div>
      <div className='descriptionContainer'>
        <div>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Price:</strong> {item.price}</p>
        </div>
        <div>
          <p>Add to cart</p>
          <img src="" alt="cart icon" />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;