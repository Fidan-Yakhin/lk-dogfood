import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Profile = ({user, color, setUser}) => {
    const navigate =useNavigate();
    const captionStyle ={
        fontWeght: "bold",
        color: color,
       }
       const logOut = (e) =>{
        e.preventDefault ();
        setUser('')
        localStorage.removeItem("bandUser");
        localStorage.removeItem("bandToken");
        localStorage.removeItem("bandId");
        navigate('/');
    }
    return <>
    <h1>Личный кабинет</h1>
    <div>
        Добро пожаловать,&nbsp;
        <span style ={captionStyle}>{user}</span>!
    </div>
    <a href="" title="Выйти" onClick={logOut}><BoxArrowLeft/></a>
           
    </>
}
export default Profile;