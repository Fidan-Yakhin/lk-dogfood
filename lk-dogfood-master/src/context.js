import { createContext } from "react";

export default createContext({
    getRandom: (max = 11, min = 0) => {
        // Случайное число от 0 до 10 или свои варианты
        Math.floor(Math.random() * (max - min) + min)
    }
    //  TODO: сщздать контектст для корзины работающей с LS
});