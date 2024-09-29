import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar.jsx'
import ItemCard from './components/itemcard.jsx'
import FarmerCard from './components/farmercard.jsx'
import RecipeCard from './components/recipecard.jsx'
import MoreButton from './components/morebutton.jsx';
import Shop from './pages/shoppage.jsx';
import FarmersPage from './pages/farmerspage.jsx';
import FarmerPage from './pages/individualfarmerpage.jsx';

const recipe = {
  bannerImage: "../public/images",
  food: "Baggel",
  writer: "Johnston",
  ingredients: [
      "Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"
  ]
}
const farmer = {
  bannerImage: "../public/images",
  name: "Johnston",
  location: "Kenya",
  products: [
      "Veges", "Fruits", "Cereals"
  ]
}
const item = {
  bannerImage: "../public/images",
  name: "Baggel",
  location: "Kenya",
}
const moreText = {
  farmers: "More Farmers",
  shop: "More In Shop",
  recipes: "More Recipes"
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <NavBar />
            <div className="farmTitle"><h3>FARMERS</h3></div>
            <div className="farmCards displayFlexRowSpc_BTN">
              <FarmerCard farmer={farmer}/>
            </div>
            <MoreButton textContent={moreText.farmers}/>
            <div className="shopTitle"><h3>SHOP</h3></div>
            <div className="shopCards displayFlexRowSpc_BTN">
              <ItemCard item={item}/>
            </div>
            <MoreButton textContent={moreText.shop}/>
            <div className="recipeTitle"><h3>RECIPES</h3></div>
            <div className="recipeCards displayFlexRowSpc_BTN">
              <RecipeCard recipe={recipe}/>
            </div>
            <MoreButton textContent={moreText.recipes}/>
          </div>
        } />
        <Route path="/farmers" element={<FarmersPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/farmers/id" element={<FarmerPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
