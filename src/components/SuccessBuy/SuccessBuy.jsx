    import { useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { useDispatch, useSelector } from 'react-redux';
    import {  cleanShoppingCart, } from '../../redux/actions';
    import axios from 'axios';

    const SuccessBuy = () => {



    const dispatch = useDispatch();


    // Obtén la información del carrito desde el estado global
    const { user } = useSelector((state) => state);
    const shoppingCart = useSelector(state => state.shoppingCart);
    const totalShoppingCart = shoppingCart.map(game => game.price * game.quantity).reduce((acc, subtotal) => acc + subtotal, 0) 
    const idsJuegos = [];

    shoppingCart.forEach(game => {
        for (let i = 0; i < game.quantity; i++) {
            idsJuegos.push(game.id);
        }
    });
    
    console.log("idessss",idsJuegos);
    console.log('user',user.id)

        const createOrder = async (orderData) => {
            try {
                console.log(orderData, 'Antes del post');
        
                // Agregado el string 'http://localhost:3001' antes de '/orders'
                const response = await axios.post('https://ecomercestorebacken.vercel.app/orders', orderData);//! Envío
                console.log('Respuesta del servidor:', response.data);
        
            } catch (error) {
                console.error("Error al crear la orden:", error.message);
                
                alert("Error al procesar la orden. Por favor, inténtelo de nuevo.");
            }
        };
        // {
        //     "userId": "7b421428-631f-488f-aaea-1faae149c928",
        //     "products": [2,1,2]
        //    }
        const orderData = {
            products: idsJuegos,
            userId: user.id
        };
        

    

    useEffect(() => {
        
        console.log('Esta es la orden',orderData)

        createOrder(orderData)


        return () => {
            
            console.log('DESMONTA EL COMPONENTE y lIMPIA EL CARRITO')
            dispatch(cleanShoppingCart());
        };
        
    }, [dispatch]);
    const renderPurchasedGames = () => {
        return shoppingCart.map(({ name, quantity, id }) => (
            <p key={id}>
                * Nombre: {name} Cantidad: {quantity}
            </p>
        ));
    };
    return (
        <div>
            <button>
                <Link to='/'>Home</Link>
            </button>
            <p>Compra Exitosa</p>
            <p>Detalles de la compra:</p>
            <p>ID Usuario: {user.id} </p>

            <p>Juegos Comprados: </p>
            <div>{renderPurchasedGames()}</div>
            <div key={totalShoppingCart}>
                Total: {typeof totalShoppingCart === 'number' ? `${totalShoppingCart} $ USD` : 'Error en el total'}
            </div>
        </div>
    );
    };

    export default SuccessBuy;
