import "./style.css";

const Promo = (props) => {
    let name = "promo";
    switch (props.type) {
        case "lg": name = "promo big"; break;
        case "sm": name = "promo small"; break;
        default: name = "promo";
    }

    return (
        <div className={name}>
            <div className={props.pic ? "promo-pic" : "promo-pic pic2"}></div>
            <h3>{props.text}</h3>
        </div>
    )
}
// const Promo = ({}) => {
//     let promoImg= promoList[Math.floor(Math.random())].img;
//     return (
//         <img src={promoImg} className="promo__img"></img>
//     )
// }


export default Promo;