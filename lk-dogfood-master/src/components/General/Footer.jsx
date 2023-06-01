import Logo from './Logo';
import { Link } from "react-router-dom";
import {Folder2Open, Star, Cart3} from "react-bootstrap-icons";

const Footer = ()=> {
    return(
        <footer>
            <div className="footer_cell">
                <Logo/>
                <div>©{new Date().getFullYear()}</div>
            </div>
            <div className='footer_cell footer_menu'>
            <Link to="/catalog" title="Каталог" ><Folder2Open/></Link>
            <Link to="/" title="Избранное"><Star/></Link>
            <Link to="/" title="Корзина"><Cart3/></Link>
            <Link to='/draft'>Черновик</Link>
            </div>
        </footer>
    )
}

export default Footer;