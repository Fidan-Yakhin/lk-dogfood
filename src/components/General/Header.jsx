import Logo from "./Logo";
import { Folder2Open, Star, Cart3, PersonSquare, BoxArrowInRight } from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ user, setModalActive, serverGoods }) => {
    const [LikeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    useEffect(() => {
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("bandId"))).length)
    }, [serverGoods]);

    // const navigate = useNavigate();
    const logIn = (e) => {
        e.preventDefault();
        // setUser('lk-band')
        // localStorage.setItem("bandUser", "lk-band")
        setModalActive(true);
           }

    return (
        <header>
            <Logo />
            <div className="search"></div>
            <nav className="header_menu">
                {/* Если пользователь есть ===true */}
                {user && <>
                    <Link to="/catalog" title="Каталог" className="badge-el"><Folder2Open>
                    {/* <span className="badge-item">{serverGoods.length}</span> */}
                        </Folder2Open></Link>
                    <Link to="/favorites" title="Избранное" className="badge-el"><Star />
                    <span className="badge-item">{LikeCnt}</span>
                    </Link>
                    <Link to="/" title="Корзина" className="badge-el">
                        <Cart3 />
                        <span className="badge-item">{cartCnt}</span>    
                        </Link>
                    <Link to="/profile" title="Профиль"><PersonSquare /></Link>
                </>}
                {!user && <a href="" onClick={logIn} title="Вoйти"><BoxArrowInRight /></a>}
            </nav>
        </header>
    )
}
export default Header;