import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Ctx from "./context"

import { Header, Footer } from "./components/General";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from './pages/Catalog';
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";

const App = () => {
    // let key = "be9b1151be0141c5b61c218f2f2e54ce"
    'https://newsapi.org/v2/everything?apiKey=be9b1151be0141c5b61c218f2f2e54ce&q=dogs'
    const [user, setUser] = useState(localStorage.getItem('bandUser'))
    const [token, setToken] = useState(localStorage.getItem('bandToken'))
    const [userId, setUserId] = useState(localStorage.getItem('bandId'))
    const [serverGoods, setServerGoods] = useState();
    const [goods, setGoods] = useState(serverGoods);
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("https://newsapi.org/v2/everything?q=животные&sources=lenta&apiKey=be9b1151be0141c5b61c218f2f2e54ce")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNews(data.articles)
            })
    }, [])
    const [modalActive, setModalActive] = useState(false);


    useEffect(() => {
        if (token) {
            fetch('https://api.react-learning.ru/products', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                })
        }
    }, [token])

    useEffect(() => {
        if (!goods.length) {
        console.log("=)")
        setGoods(serverGoods);
        }
    }, [serverGoods]);
    // useEffect(() => {
    //     console.log("dd")
    // }, [modalActive]);

    useEffect(() => {
        console.log("Change")
        if (user) {
            setToken(localStorage.getItem('bandToken'))
            setUserId(localStorage.getItem('bandId'))
        } else {
            setToken("");
            setUserId('');
        }
        console.log('u', user);
    }, [user]);

    const ctxVal = {
        goods,
        setGoods,
        news
    }

    return (
        <Ctx.Provider value={ctxVal}>
            <Header 
                user={user} 
                setModalActive={setModalActive}
                serverGoods={serverGoods}
            />
            <main>
                <Search arr={serverGoods} />
                {/* 
                    SPA - Single Page Application (одностраничное)
                */}
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/catalog" element={<Catalog
                        setServerGoods={setServerGoods}
                    />}/>
                    <Route path="/favorites" element={<Favorites 
                        goods={goods}
                        userId={userId}
                        setServerGoods={setServerGoods}
                    />}/>
                    <Route path="/draft" element={<Draft/>}/>
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser} color="yellow"/>
                    }/>
                    <Route path="/product/:id" element={<Product/>}/>
                </Routes>
                {/* 
                    /v2/:gr/posts/likes/:id
                    /v2/group-12/posts/likes/83745613476812
                    /v2/group-9/posts/likes/768883746527383
                */}
            </main>
            <Footer/>
            <Modal 
                active={modalActive} 
                setActive={setModalActive}
                setUser={setUser}
            />
        </Ctx.Provider>
    )
}

export default App;