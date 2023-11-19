import { useEffect } from "react";
import { getUserById } from "../../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

function DetailUser() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { user } = useSelector((state) => state)

    useEffect(() => {
        dispatch(getUserById(id))
    }, [])

    return (  
        <>
            {user.id}
        </>
    );
}

export default DetailUser;