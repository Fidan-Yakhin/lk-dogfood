import { ArrowClockwise } from "react-bootstrap-icons";
import "./style.css";



const Loader = () => {
    return <>
    <div className="Loader">
        <span className="loader-img">
            <ArrowClockwise/>
        </span>
        <h6>Данные загружаются</h6>
    </div>
    </>
}
export default Loader;