import "./style.css";
import { useState, useEffect, useContext } from 'react';
// import {useState, useEffect, useContext} from 'react';
import Ctx from "../../context";

const News = () => {
    const {news} = useContext(Ctx);
    const [data, setData] = useState(news || [])

    useEffect(() => {
       
       const id = setTimeout(() => {
            let updateArr =[...data];
            let firstNew = updateArr.shift();
            updateArr.push(firstNew);
            setData(updateArr);
        }, 2000)
    
    // } else {
    //     setData(news)
    // }
    }, [data])
    useEffect (() => {
        setData(news)
    }, [news])

return <div>
    <h2> Новости Lenta.ru</h2>
    <div className="news-block">
        {data.slice(0, 5).map((el,i) => <img 
        key={i}
        src={el.urlToImage} 
        alt={el.title}
        style={{
            animation: "slide 2000ms linear 1"
        }}
        />)}
    </div>
    </div>
}

export default News;