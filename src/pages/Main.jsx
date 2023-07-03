import PromoFlex from "../components/PromoFlex/PromoFlex";
import baner_1 from "../assets/images/baner1.jpg";
import baner_2 from "../assets/images/baner2.jpg";
import baner_3 from "../assets/images/baner3.jpg";
import baner_4 from "../assets/images/baner4.jpg";
import baner_5 from "../assets/images/baner5.jpg";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


import News from "../components/News";

import Ctx from "../context"
import { useContext } from "react";

const Main = () => {
    const {news} = useContext(Ctx);
 
    const {user} = useContext(Ctx);
    const {goods} = useContext(Ctx);
    const {setServerGoods} = useContext(Ctx);
    const {setModalActive} = useContext(Ctx);
    const navigate = useNavigate();
    // const logIn = (e) => {
    //     e.preventDefault();
    //           setModalActive(true);
    //     navigate("/profile")
    // }

    return (<>

        {!user && <>
            <div className="container_old">
            <h1>Главная</h1>

            <PromoFlex type="lg" header="Подарок за первый заказ!" pic={baner_1} />
            {goods.filter((el, i) => i >= 8 && i < 12).map(el => <Card {...el} key={el._id} img={el.pictures} setServerGoods={setServerGoods} />)}
            

            <PromoFlex header="Лакомства для собак" text="от 840 ₽" pic={baner_5} />
            
            <PromoFlex header="Микс " text="пищевая здоровая натуральная добавка" pic={baner_3} />

            {goods.filter((el, i) => i >= 4 && i < 8).map(el => <Card {...el} key={el._id} img={el.pictures} setServerGoods={setServerGoods} />)}

            <PromoFlex header="Лучшие друзья" text="" pic={baner_2} />
            <PromoFlex header="Питание" text="100 % натуральное" pic={baner_4} /></div>
           <div>
            <News /></div>
           <div>
            <PromoFlex type="lg" header="Подарок за десятый заказ!"  pic={baner_5} />
            </div>
                        </>}
            {user && <> 
                
                <div className="container_old">
            <span className="profile__greetings">Функционал сайта ограничен. Bойдите в аккаунт или зарегистрируйтесь!</span>
                           
                                
            <PromoFlex type="lg" header="Подарок за первый заказ!"  pic={baner_1} />
            <PromoFlex header="Лакомства для собак" text="от 840 ₽" pic={baner_2} />
            <PromoFlex  header="Микс " text="пищевая здоровая натуральная добавка" pic={baner_3} />
            <PromoFlex header="Лучшие друзья" text="" pic={baner_2} />
            <PromoFlex header="Питание" text="100 % натуральное" pic={baner_4} />
            <PromoFlex type="lg" header="Подарок за десятый заказ!" pic={baner_5} />
            </div>
            
            </>}

        </>
    )
}

 export default Main;