import image from "../../assets/image/logo.png"

const Logo = () => {
    return (
        <a href="/" className="logo">
            <img src={image} alt="DogFood" />
            <span>RockDog</span>
        </a>
    )
}

export default Logo;