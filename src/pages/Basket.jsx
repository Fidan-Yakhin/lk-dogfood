import { useContext } from "react";
import { Link } from "react-router-dom";
import { Row } from 'react-bootstrap';
import Ctx from "../context";
import { useNavigate } from "react-router-dom";
import { EmojiDizzyFill } from 'react-bootstrap-icons';
const Basket = () => {
    const { basket, setBasket } = useContext(Ctx);

    const navigate = useNavigate()
    const setPrice = ({ price, cnt, discount }) => {
        return price * cnt * (1 - discount / 100)
    }
    const sum = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price
    }, 0)
    const sale = basket.reduce((acc, el) => {
        return acc + el.cnt * el.price * (1 - el.discount / 100)
    }, 0)
    const inc = (id) => {
        setBasket(prev => prev.map(el => {
            if (el.id === id) {
                el.cnt++;
            }
            return el;
        }))
    }
    const dec = (id, cnt) => {
        if (cnt === 1) {
            setBasket(prev => prev.filter(el => el.id !== id))
        } else {
            setBasket(prev => prev.map(el => {
                if (el.id === id) {
                    el.cnt--;
                }
                return el;
            }))
        }
    }
    return <> {basket.length > 0 && <>
     <Row className='basket1'>
        <h1>Корзина</h1>
        <table>
            <thead>
                <tr>
                    <td>Изображение</td>
                    <td>Название</td>
                    <td>Количество</td>
                    <td>Цена</td>
                    <td>Скидка</td>
                    <td>Цена со скидкой</td>
                </tr>
            </thead>
            <tbody>
                {basket.map(el => <tr key={el.id}>
                    <td>
                        <img src={el.img} alt={el.name} height="50" />
                    </td>
                    <td>
                        <Link to={`/product/${el.id}`}>{el.name}</Link>
                    </td>
                    <td>
                        <button onClick={() => dec(el.id, el.cnt)}>-</button>
                        <span style={{ padding: "0 10px" }}>{el.cnt}</span>
                        <button onClick={() => inc(el.id)}>+</button>
                    </td>
                    <td>{el.price * el.cnt}&nbsp;₽</td>
                    <td>{el.discount > 0 && `${el.discount}%`}</td>
                    <td>{el.discount > 0 && <>{setPrice(el).toFixed(2)}&nbsp;₽</>}</td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>Итоговая сумма:</td>
                    {/* Отобразить в корзине общую сумму товаров со скидкой и ту, что должна была быть без скидки */}
                    <td colSpan={3}>{sale.toFixed(2)} ₽<del>{sum}  ₽</del></td>
                </tr>
            </tfoot>
        </table>
        </Row>

    </>}
        {basket.length === 0 && <>
            <Row className='basket2'>
                <EmojiDizzyFill style={{ color: "brown", fontSize: "40px" }} />
                <h4 style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>В корзине пусто</h4>
                <Link to="/catalog" title='перейти в каталог' style={{ display: "flex", justifyContent: "center" }} >нажмите, чтобы перейти в каталог</Link>
            </Row>

        </>}

    </>
}

export default Basket;