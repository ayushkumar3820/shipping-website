import "../styles.css"
import React from "react";



const NavCard = ({props}) => {

    return (

        <div className="navcard-container"> 
        <img src={props.img} alt="" />
        <p>{props.type}</p>

        </div>
    )

}
export default NavCard;