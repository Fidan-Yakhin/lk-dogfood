import Promo from "./components/Promo/Promo";
import Card from './components/Card';
import { Header, Footer } from "./components/General";
import cardsData from './assets/data.json';

const sizes = ['sm', 'lg', 'md']
const adds = []

let text = 'Основной целью полёта было исследование влияния на организм животных и других биологических объектов факторов космического полёта: перегрузка, длительная невесомость, переход от перегрузок к невесомости и обратно, изучение действия космической радиации на животных и растительные организмы, на состояние их жизнедеятельности и наследственность, отработка систем, обеспечивающих жизнедеятельность человека, безопасность полёта и благополучное возвращение на Землю. Также было проведено несколько медико-биологических экспериментов и научных исследований космического пространства'
text = text.match(/[^\s,.]+/g);

const rand = (n) => Math.floor(Math.random() * n);

let n = 8;
while (n--) {
    adds.push({
        text: `${text[rand(text.length)].slice(0, 8)} ${text[rand(text.length)]} ${text[rand(text.length)]}`,
        pic: !!Math.round(Math.random()),
        sizes: sizes[rand(sizes.length)]
    })
}


const App = () => {
    const user = localStorage.getItem('bandUser')
    return (
        <div>
            <Header user={user}/>
            <div className="container">
                {/*                 
                <Promo text="container" type="lg"/>
                <Promo text="Doggy" type="lg" />
                <Promo text="4" pic={true}/>
                <Promo />
                <Promo text="7" type="sm" /> */}
                {/* <Card
                    img={cardsData[0].pictures}
                    name={cardsData[0].name}
                    price={cardsData[0].price}
                /> */}
                {cardsData.map((el, i) => <Card
                    key={i}
                    img={el.pictures}
                    name={el.name}
                    price={el.price}
                />)}
                {adds.map((el, i) => <Promo key={i}{...el} type={el.sizes} />)}

            </div>
            <Footer />
        </div>
    )
}
export default App;