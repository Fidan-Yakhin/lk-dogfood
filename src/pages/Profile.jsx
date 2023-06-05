import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Ctx from "../context";
import "./style.css";

const Profile = () => {
   
    const{ user, color, setUser, token, userId } = useContext(Ctx)
   
    const navigate = useNavigate();

    const captionStyle = {
        fontWeight: "bold",
        color: color
    }
    const [userInfo, setUserInfo] = useState({});
    const logOut = (e) => {
        e.preventDefault();
       
        localStorage.removeItem("rockUser");
        localStorage.removeItem("rockToken");
        localStorage.removeItem("rockId");
        navigate("/");
       
    }
    useEffect(() => {
        fetch(`https://api.react-learning.ru/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setUserInfo(data);
                }
            })
    }, [token]);
    return (<>
      <section className="container_prof">
            <h1 className="product_name">Личный кабинет</h1>

            <div className="product_avtor"><span style={captionStyle}>Добро пожаловать,
                <br />уважаемый {userInfo.name}!</span></div>



            <div className="product_picture">
                <img className="product_img" src={userInfo.avatar} alt={userInfo.name} />
            </div>


            <div>
                <div >
                    Роль: <span>{userInfo.about}</span>
                </div>
                <div>
                    Email: <span style={captionStyle}>{userInfo.email}</span>
                </div>
                <div>
                    Группа: <span style={captionStyle}>{userInfo.group}</span>
                </div>
            </div>
            <div>
        <a href="" onClick={logOut} title="Выйти">
            <BoxArrowLeft/>
        </a>
        </div>
        </section>
        </>)

}

export default Profile;