import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import {Trash} from "react-bootstrap-icons";
import { Percent, HeartFill, TruckFront, Award, StarFill, StarHalf, Star } from "react-bootstrap-icons";
import Ctx from "../context";

import Review from "../components/Review";

import Loader from "../components/Loader";

import ReviewModal from "../components/ReviewModal"

import EditProductForm from "../components/EditProductFrom";



const Product = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const {userId, setServerGoods, api} = useContext(Ctx);


    const { token } = useContext(Ctx);
    const { setGoods } = useContext(Ctx);
    const { serverGoods } = useContext(Ctx);
    const { setModalReviewActive } = useContext(Ctx);
    const { setEditProductFormActive } = useContext(Ctx);
   
    const makeReview = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setModalReviewActive(true);
    }

    const [reviewCnt, setReviewCnt] = useState(0);

    const [isLike, setIsLike] = useState(product?.likes?.includes(localStorage.getItem("rockId")));
    const [reviewRating, setRatingStat] = useState(0);

  

    useEffect(() => {
        api.getSingleProduct(id)
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                }
            })
    }, []);





    /*
        product?.name
        ~
        product && product.name
    */

    // const del = () => {
    //     api.delProduct(id)
    //         .then(data => {
    //             console.log(data);
    //             setServerGoods(prev => prev.filter(el => el._id !== id))
    //             navigate("/catalog")
    //         })
    // }

    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);

        const token = localStorage.getItem("rockToken");
        fetch(`https://api.react-learning.ru/products/likes/${product?._id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Изменить основной массив с товарами внутри React (на стороне клиента)//
                setServerGoods(function (old) {

                    // Нам надо из массива взять 1 карточку и заменить её. При этом, положение карточки в массиве не должно поменяться. Единственный способ пройтись помассиву, модифицировав его - это метод мап.
                    const arr = old.map(el => {
                        if (el._id === product?._id) {
                            return data;
                        }
                        else {
                            return el;
                        }
                    })
                    return arr;
                });
            })

    }



    const updProductsAfterDeleteProduct = () => {
        fetch("https://api.react-learning.ru/products", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
            })

    }

    const deleteProduct = async (e) => {
        e.preventDefault();
        let res = await fetch(`https://api.react-learning.ru/products/${product?._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        let data = await res.json();

        fetch("https://api.react-learning.ru/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                })

        alert("Товар удалён. Вы будете переадресованы на страницу каталога");
        navigate("/catalog");

    }



    const editProductForm = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setEditProductFormActive(true);
    }





    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setReviewCnt(data.reviews.length)
                    setRatingStat(data.reviews)
                }


            })
    }, [product]);


    const getAverage = (numbers) => {
        let sum = 0;
        for (let i = 0; i < numbers.length; i += 1) {
            sum += numbers[i].rating;
        }
        return (sum / numbers.length).toFixed(1);
    };
    const averageRating = (getAverage(reviewRating));
    function averageRatingIsNan(averageRating) {
        if (isNaN(averageRating)) {
            return "0"
        }
        else {
            return averageRating;
        }
    }
    const averageRatingNotNan = averageRatingIsNan(averageRating);




    return <>
        {/* { product.name 
            ? <>
                {userId === product.author._id && <button style={{justifySelf: "flex-end"}} onClick={del}><Trash/></button>}
                <h1>{product.name}</h1>
                <img src={product.pictures} alt={product.name} height="200" />
                <mark>{product.price}₽</mark>
            </>
            : <Loader/>
        }
         */}

        {/* <h1>
            {product.name ? product.name : "Страница одного товара"}
        </h1>
        {product.pictures && <img src={product.pictures} alt={product.name} />}
        {product.price && <mark>{product.price}₽</mark>} */}
   <section className="container__product">


{product?.name ? <>

    <h2 className="product__name">{product?.name}</h2>


    <div className="product__synopsis">
        <span className="product__artikul">Артикул: {product?._id}</span>
        <br />
        {averageRatingNotNan <= 0 && <span className="product__review__grey"> <Star /> <Star /> <Star /> <Star /> <Star /></span>}
        {averageRatingNotNan > 0 && averageRatingNotNan < 1 && <><span className="product__review__cnt"> <StarHalf /> </span> <span className="product__review__grey"> <Star /> <Star /> <Star /> <Star /></span></>}


        {averageRatingNotNan >= 1 && averageRatingNotNan <= 1 && <><span className="product__review__cnt"> <StarFill /></span> <span className="product__review__grey"> <Star /> <Star /> <Star /> <Star /></span></>}
        {averageRatingNotNan > 1 && averageRatingNotNan < 2 && <><span className="product__review__cnt"> <StarFill /> <StarHalf /></span> <span className="product__review__grey"> <Star /> <Star /> <Star /></span></>}

        {averageRatingNotNan >= 2 && averageRatingNotNan <= 2 && <><span className="product__review__cnt"> <StarFill /> <StarFill /> </span> <span className="product__review__grey"><Star /> <Star /> <Star /></span></>}
        {averageRatingNotNan > 2 && averageRatingNotNan < 3 && <><span className="product__review__cnt"> <StarFill /> <StarFill /> <StarHalf /></span> <span className="product__review__grey"> <Star /> <Star /></span></>}

        {averageRatingNotNan >= 3 && averageRatingNotNan <= 3 && <><span className="product__review__cnt"> <StarFill /> <StarFill /> <StarFill /> </span> <span className="product__review__grey"><Star /> <Star /></span></>}
        {averageRatingNotNan > 3 && averageRatingNotNan < 4 && <><span className="product__review__cnt"> <StarFill /> <StarFill /> <StarFill /> <StarHalf /> </span> <span className="product__review__grey"><Star /></span></>}

        {averageRatingNotNan >= 4 && averageRatingNotNan <= 4 && <><span className="product__review__cnt"> <StarFill /> <StarFill /> <StarFill /> <StarFill /> </span> <span className="product__review__grey"><Star /></span></>}
        {averageRatingNotNan > 4 && averageRatingNotNan < 5 && <span className="product__review__cnt"> <StarFill /> <StarFill /> <StarFill /> <StarFill /> <StarHalf /></span>}

        {averageRatingNotNan >= 5 && <span className="product__review__cnt"> <StarFill /> <StarFill /> <StarFill /> <StarFill /> <StarFill /></span>}

        <span> {averageRatingNotNan} / 5 </span>
        <span>Отзывов: {reviewCnt} шт.</span>
    </div>


    <div className="product__picture">
        <img className="product__img" src={product?.pictures} alt={product?.name} />
        {product?.discount > 0 && <span className="card__discount">{product?.discount} <Percent />  </span>}

    </div>


    {product?.discount > 0 &&
        <div className="product__price">
            <span className="product__old__price">{product?.price}  ₽</span>
            <br />
            <span className="product__new__price">{product?.price * (100 - product?.discount) / 100} ₽</span>
        </div>
    }



    {userId === product?.author._id && <><button className="product__cart__btn" onClick={deleteProduct}>Удалить товар</button><button className="product__cart__btn" onClick={editProductForm}>Редактировать товар</button></>}




    {!product?.discount &&
        <div className="product__price">
            <span className="product__new__price">{product?.price} ₽</span>
        </div>
    }

    <div className="product__add__cart">

        <input type="number" min="0" className="product__cart__cnt" placeholder="1" />

        <button className="product__cart__btn">В корзину</button>
    </div>


    <div className="product__add__favorites" onClick={updLike}><HeartFill /> В избранное</div>

    <div className="product__delivery"><div className="product__delivery__garanty__ico"><TruckFront /></div><div className="product__delivery__garanty__text"><h3>Доставка по всему Миру!</h3><span>Доставка курьером —— от 399 ₽</span><br /><span>Доставка в пункт выдачи — от 199 ₽</span></div></div>
    <div className="product__garanty"><div className="product__delivery__garanty__ico"><Award /></div> <div className="product__delivery__garanty__text"><h3>Гарантия качества</h3><span>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды.</span></div></div>



    {product?.description &&
        <div className="product__description">
            <h3>Описание</h3>
            {product?.description}</div>
    }

    {product?.wight &&
        <div className="product__char">
            <h3>Характеристики</h3>
            Количество: {product?.wight}</div>}


    <div className="product__review">
        <h3>Отзывы</h3>




        <div>
            <button className="product__add__review__btn" onClick={makeReview}>Добавить отзыв</button>
        </div>
        {product?.reviews[0] && <>
            {product?.reviews.map(el => <Review {...el} key={el._id} product_id={product?._id} product={product} />)}
        </>
        }

        {!product?.reviews[0] && <>
            <span>Отзывов пока нет, но вы можете написать новый!</span>
        </>
        }
    </div>


</>
    : <Loader />
}

</section>
<ReviewModal />
<EditProductForm/>

  
  
    </>
}

export default Product;