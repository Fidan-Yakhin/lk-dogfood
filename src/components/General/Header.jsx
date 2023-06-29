import Logo from "./Logo";

import { 
    Folder2, 
    Star, 
    Cart4, 
    PersonSquare, 
    BoxArrowInRight,
    PlusSquare
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import Context from "../../context"
import Search from "../Search";


const Header = ({user, setModalActive, serverGoods}) => {
    
    const navigate = useNavigate();

    const [likeCnt, setLikeCnt] = useState(0);
    // const [basketCnt, setBasketCnt] = useState(0);
    const {basket} = useContext(Context);
   
    useEffect(() => {
        // Фильтруем только те товары, у которых в лайках есть id нашего пользователя - id берем из ls, ибо мы про него забыли))
        setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)
    },[serverGoods]);


    // useEffect(() => {
	// 	setBasketCnt(basketArr?.length)
	// }, [basketArr]);

    const logIn = (e) => {
        e.preventDefault();
        // setUser("lk-band");
        // localStorage.setItem("rockUser", "lk-band");
        setModalActive(true);
        navigate("/profile")
    }
    return <header>
        <Logo/>
        <Search arr={serverGoods} />
        <div className="search"></div>
        <nav className="header__menu">
            {/* Если пользователь === true */}
            {user && <>
                <Link to="/add" title="Добавить товар"  className="badge-el">
                    <PlusSquare/>
                </Link>
                <Link to="/catalog" title="Каталог" className="badge-el">
                    <Folder2/>
                    {/* <span className="badge-item">{serverGoods.length}</span> */}
                </Link>
                <Link to="/favorites" title="Избранное" className="badge-el">
                    <Star/>
                    <span className="badge-item">{likeCnt}</span>
                </Link>
                <Link to="/basket" title="Корзина" className="badge-el">
                    <Cart4/>
                    <span className="badge-item">{basket && basket.length > 0 ? basket.length : null}</span>
                </Link>
                <Link to="/profile" title="Профиль">
                    <PersonSquare/>
                </Link>
            </>}
            {!user && <Link href="/profile" onClick={logIn} title="Войти">
                <BoxArrowInRight/><span>Войти</span>
            </Link>}
        </nav>
    </header>
}

export default Header;