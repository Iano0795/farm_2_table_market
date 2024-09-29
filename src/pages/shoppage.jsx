import ItemCard from "../components/itemcard";
import NavBar from "../components/navbar";
import './styles/shoppage.css'

const Shop = (item) => {
    return(
        <div className="shopPage">
            <NavBar />
            <h1>SHOP</h1>
            <div className="shopItems">
                <ItemCard item={item}/>
                <ItemCard item={item}/>
                <ItemCard item={item}/>
                <ItemCard item={item}/>
                <ItemCard item={item}/>
                <ItemCard item={item}/>
                <ItemCard item={item}/>
                <ItemCard item={item}/>
            </div>
        </div>
    )
}

export default Shop;