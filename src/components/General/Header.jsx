import Logo from "./Logo";

const Header = ({user}) => {
    const logOut = (e) =>{
        e.preventDefault ();
        localStorage.removeItem("bandUser")
    }
    const logIn = (e) =>{
        e.preventDefault ();
        localStorage.setItem("bandUser", "lk-band")
    }
    return(
        <header>
            <Logo/>
            <div className ="search"></div>
            <nav className="header_menu">
            {/* Если пользователь есть ===true */}
            {user && <>
                <a href="">Избранное</a>
                <a href="">Корзина</a>
                <a href="">Профиль</a>
                <a href="" onClick={logOut}>Выйти</a>
                </>}
                {!user && <a href="" onClick={logIn}>Вoйти</a>}
            </nav>
        </header>
    )
}
export default Header;