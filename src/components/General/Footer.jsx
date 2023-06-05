import Logo from "./Logo";
import telegram from "../../assets/icons/telegram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import vk from "../../assets/icons/vk.png";

import { Link } from "react-router-dom";

const Footer = () => {
    return <footer>
        <div className="footer__cell">
            <Logo />
            <div className="footer__logo">©{new Date().getFullYear()}</div>
        </div>
        <div className="footer__cell footer__menu">
        <div className="footer__messagener">
                <Link href="https://telegram.org/" target="_blank" rel="noreferrer"><img src={telegram} alt="telegram" /></Link>
                <Link href="https://whatsapp.com/" target="_blank" rel="noreferrer"><img src={whatsapp} alt="whatsapp" /></Link>
                <Link href="https://vk.com/" target="_blank" rel="noreferrer"><img src={vk} alt="vk" /></Link>
            </div>          
        </div>
        <div className="footer__cell footer__contacts">

<div className="footer__cell footer__phone"> <a href="tel:+7999999999">8 (999) 99-99-99</a></div>
<div className="footer__cell footer__mail"><a href="mailto:RockDog@mail.com">RockDog@mail.com</a></div>
</div>
        

    </footer>
}

export default Footer;