import React from 'react'
import FarmerCard from '../components/farmercard'
import './styles/farmerspage.css'
import NavBar from '../components/navbar'
const farmer = {
    bannerImage: "../public/images",
    name: "Johnston",
    location: "Kenya",
    products: [
        "Veges", "Fruits", "Cereals"
    ]
}
const FarmersPage = () =>{
    return (
        <div className="farmersPage">
            <NavBar />
            <div className="farmTitle "><h1>MEET OUR FARMERS</h1></div>
            <div className=" farmCards displayFlexRowSpc_BTN">
                <FarmerCard farmer={farmer}/>
            </div>
        </div>
    );
}

export default FarmersPage;
