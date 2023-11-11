import { useDispatch } from "react-redux";
import { orderCards } from "../../../redux/actions";




const AlphabeticalOrder = () => {
    const dispatch = useDispatch();
    const handleOrder = (event) => {
        return dispatch(orderCards(event.target.value))
    }

    return (
        <span>
            <select onChange={handleOrder} >
                <option value="A">Ascendant{' [A-Z]'}</option>
                <option value="B">Descending{' [Z-A]'}</option>
            </select>
        </span>
    )
}
export default AlphabeticalOrder;