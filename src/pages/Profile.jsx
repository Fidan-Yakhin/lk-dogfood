import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import News from "../components/News";
import Ctx from "../context";
import "./style.css";
import {Figure} from "react-bootstrap";
import UpdatedInput from "../components/UpdatedInput/index";
const Profile = () => {
   
    const{ user, color, setUser, token, userId } = useContext(Ctx)
    const { api, baseData } = useContext(Ctx);
	const [userData, setUserData] = useState({});
	const [inpName, setInpName] = useState(false);
	const [inpAbout, setInpAbout] = useState(false);
	const [inpAvatar, setInpAvatar] = useState(false);
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
    const updUser = (name, val) => {
		let body = {
			name: userData.name,
			about: userData.about
		}
		if (name === "avatar") {
			body =  {avatar: userData.avatar};
		}
		body[name] = val;
		console.log(body);
		api.updAdmin(body, name === "avatar").then(data => setUserData(data));
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
                <img className="product_img" src={userInfo.avatar} alt={userInfo.name} /><Figure>
							<Figure.Image
								src={userData.avatar}
								alt={userData.email}
							/>
							<Figure.Caption>
								 <UpdatedInput
									 val={userData.avatar}
									 isActive={inpAvatar}
									 changeActive={setInpAvatar}
									 upd={updUser}
									 name="avatar"
								 />
							</Figure.Caption>
						</Figure>
            </div>


            <div>
                <div >
                    Роль: <span>{userInfo.about} <UpdatedInput
							val={userData.name}
							isActive={inpName}
							changeActive={setInpName}
							upd={updUser}
							name="name"
						/></span>
                </div>
                <div>
                    Email: <span style={captionStyle}>{userInfo.email}<div><UpdatedInput
							val={userData.about}
							isActive={inpAbout}
							changeActive={setInpAbout}
							upd={updUser}
							name="about"
						/></div></span>
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
       
        <News/>
        </>)

}

export default Profile;