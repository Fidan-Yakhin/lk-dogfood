import "./style.css";
const Card = ({img, name, price}) => {
    return (
        <a className ="card" href="">
            <img src={img} alt="Картинка" className="card_img"/>
            <span className="card_name">{name}</span>
            <span className="card_price">{price} p</span>
            <button className="card_btn">В корзину</button>
        </a>
    )
}
export default Card;