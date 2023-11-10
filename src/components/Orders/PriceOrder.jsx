import { useDispatch } from "react-redux";
import { orderCards } from "../../redux/actions"

    const PriceOrder = () => {
    const dispatch = useDispatch();

    const handleOrder = (event) => {
        return dispatch(orderCards(event.target.value));
        
    }

    return (
        <span>
        <select onChange={handleOrder}>
            <option value="priceLowToHigh">Ascendente {' [Menor a Mayor]'} </option>
            <option value="priceHighToLow">Descendente {' [Mayor a Menor]'} </option>
        </select>
        </span>
    );
    }

export default PriceOrder;
