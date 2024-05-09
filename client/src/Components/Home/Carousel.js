import "../styles.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";


export const bannerData = [
    { id: 1, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50' },
    { id: 2, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50' },
    { id: 3, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50' },
    { id: 4, url: 'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50' }
]

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,// optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
};

const Banner = ()=>{

    return <div className="carousel-container">
      <Carousel responsive={responsive} swipeable={false} draggable={false} infinite={true}  autoPlay={true}>
        {
            bannerData.map(banner=> 
           
                    <img  style={{
                        width:"100%",
                        height:"280px"
                    }} key={banner.id} src={banner.url} alt="Banner Image" />
                
            )

        }
      </Carousel>
    </div>

}

export default Banner;