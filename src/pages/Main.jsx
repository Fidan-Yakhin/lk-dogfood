import Card from "../components/Card";
import baner_1 from "../assets/images/baner1.jpg";
import baner_2 from "../assets/images/baner2.jpg";
import baner_3 from "../assets/images/baner3.jpg";
import baner_4 from "../assets/images/baner4.jpg";
import baner_5 from "../assets/images/baner5.jpg";
import PromoBaner from '../components/PromoBaner/PromoBaner';
import icon from "../assets/icons/icon.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from 'react';
import Ctx from "../context";
import News from "../components/News";
import {BoxArrowInRight} from "react-bootstrap-icons";

const Main = ({user, goods, setServerGoods, setModalActive }) => {


    // const { user, goods, setServerGoods, setModalActive } = useContext(Ctx);
    const {news} = useContext(Ctx);
    const navigate = useNavigate();
    // const logIn = (e) => {
    //     e.preventDefault();
    //     // setUser("lk-band");
    //     // localStorage.setItem("rockUser", "lk-band");
    //     setModalActive(true);
    //     navigate("/profile")
    // }
    return (<>

        {user && <>
            <h1>Главная</h1>
            <div className="container_old">

                <PromoBaner type="lg" pic={baner_2} />
                {goods.filter((el, i) => i >= 8 && i < 12).map(el => <Card {...el} key={el._id} img={el.pictures} setServerGoods={setServerGoods} />)}
                <News/>

                <PromoBaner pic={baner_4} />

                <PromoBaner pic={baner_5} />

                {goods.filter((el, i) => i >= 4 && i < 8).map(el => <Card {...el} key={el._id} img={el.pictures} setServerGoods={setServerGoods} />)}

            </div>
            <News/>
        </>}
        {!user && <>
            <h1 className="text">Требуется авторизация</h1>
            <div className="container_old">
                <span className="profile__greetings"> Войдите в аккаунт или зарегистрируйтесь!</span>
                
                 {/* <Link href="" onClick={logIn} title="Войти">
                <BoxArrowInRight/> Войти
            </Link> */}
                <PromoBaner type="lg" pic={baner_2} />
                
                <PromoBaner  pic={baner_1} />
                <PromoBaner  pic={baner_5} />
               
                </div>
                <News/>

        </>}

    </>
    )
}

export default Main;