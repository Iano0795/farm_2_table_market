// src/components/RecipeCard.jsx
import React from 'react';
import './styles/recipecard.css'; // We'll create this CSS file for RecipeCard styles

const recipe = {
    bannerImage: "../public/images",
    food: "Baggel",
    writer: "Johnston",
    ingredients: [
        "Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"
    ]
}

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipeCard">
      <div className="recipeBanner">
        <img src={recipe.bannerImage} alt={`${recipe.food} Banner`} /> {/* Replace with actual image path */}
      </div>
      <div className='content'>
        <div>
          <p><strong>Food:</strong> {recipe.food}</p>
          <p><strong>Writer:</strong> {recipe.writer}</p>
        </div>
        <h3>Ingredients</h3>
        <div>
          {recipe.ingredients.map((ingredient, index) => (
            <p key={index}>{`${index + 1}. ${ingredient}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
