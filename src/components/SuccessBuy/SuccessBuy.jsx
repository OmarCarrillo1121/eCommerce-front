    import { useEffect } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import { addSuccessfulPurchase } from '../../redux/actions';

    const SuccessBuy = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Obtén la información del carrito desde el estado global
    const shoppingCart = useSelector(state => state.shoppingCart);
        // Obtén los valores directamente de searchParams
        const collectionStatus = searchParams.get('collection_status');
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const merchantOrderId = searchParams.get('merchant_order_id');
        const preferenceId = searchParams.get('preference_id');
    useEffect(() => {


        // Imprimir datos en la consola
        console.log('Datos de la consulta:', {
        collectionStatus,
        paymentId,
        status,
        merchantOrderId,
        preferenceId,
        shoppingCart,
        });

        // Si la compra es exitosa, realiza el dispatch
        dispatch(
            addSuccessfulPurchase({
            collectionStatus,
            paymentId,
            status,
            merchantOrderId,
            preferenceId,
            shoppingCart,
            })
        );
        
    }, [dispatch, collectionStatus, merchantOrderId, paymentId, preferenceId, searchParams, shoppingCart, status]);

    return (
        <div>
        <button>
            <Link to='/carrito'>Carrito</Link>
        </button>
        <button>
            <Link to='/'>Catálogo</Link>
        </button>
        <p>Compra Exitosa</p>
        <p>Otra Cosa</p>
        <p>
            <span>collectionStatus: </span>
            {searchParams.get('collection_status')} <br />
            <span>paymentId: </span>
            {searchParams.get('payment_id')} <br />
            <span>status: </span>
            {searchParams.get('status')} <br />
            <span>merchantOrderId: </span>
            {searchParams.get('merchant_order_id')} <br />
            <span>preferenceId: </span>
            {searchParams.get('preference_id')}
        </p>
        </div>
    );
    };

    export default SuccessBuy;
