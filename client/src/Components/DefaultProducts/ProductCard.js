

export const ProductCard = ({props}) => {
    props.title.longTitle = props.title.longTitle.slice(0,18)+"...";

    return (
        <div className="product-card">
            <img src={props.url} alt="" />
            <p style={{
                fontWeight: "bold",
            }}>

             {props.title.longTitle}

            </p>

            <p style={{
                color:"green",
            }}>

               {props.discount}
            </p>

            <p style={{
                color:"gray"
            }}>
                {props.tagline}
            </p>
        </div>
    )

}