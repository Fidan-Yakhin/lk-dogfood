import "./style.css";


const PromoBaner = (props) => {
    const imgStyle = {
        backgroundImage: `url(${props.pic})`
    };
  
    let name = "promo_baner";
    switch (props.type) {
        case "lg": name = "promo_baner big"; break;
        case "sm": name = "promo_baner small"; break;
        default: name = "promo_baner default";
    }

    return (
        <div className={name}>
                        
            <div className={"promo_pic_baner"} style={imgStyle}></div>
        </div>
        
    )
}

export default PromoBaner;