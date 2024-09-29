import MoreButton from "../components/morebutton"
import NavBar from "../components/navbar"
import RecipeCard from "../components/recipecard"
import './styles/individualfarmerpage.css'

const text = {
    veges: "Veges",
    fruits: "Fruits",
    cereals: "Cereals"
}
const farmer = {
    bannerImage: "../public/images",
    name: "Johnston",
    location: "Kenya",
    products: [
        "Veges", "Fruits", "Cereals"
    ]
}
const recipe = {
    bannerImage: "../public/images",
    food: "Baggel",
    writer: "Johnston",
    ingredients: [
        "Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"
    ]
}
const FarmerPage = ({farmer}) => {
    return(
        <div className="farmerPage">
            <NavBar />
            <div className="farmerTitle "><h1>MEET, {farmer.name}!</h1></div>
            <h4>{farmer.location}</h4>
            <div className="titleWithBTNS">
                <h3>PRODUCTS</h3>
                <MoreButton textContent={text.veges}/>
                <MoreButton textContent={text.fruits}/>
                <MoreButton textContent={text.cereals}/>
            </div>
            <div class="recipeTitle "><h3>RECIPES</h3></div>
            <div class=" recipeCards displayFlexRowSpc_BTN">
                <RecipeCard recipe={recipe}/>
            </div>
        </div>
    )
}

export default FarmerPage;