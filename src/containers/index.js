import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Restaurant, 
         RestaurantDetail, 
         Page404,
         Migrations, 
         Cart, 
         TransactionHistory } from '../views';
import { RESTAURANT, MIGRATIONS, CART, TRANSACTION } from './name.types';
import AppBar from './AppBar';

const Routes = props => {
    const [payload, setPayload] = useState({
        search: "",
        availableDays: "",
        openHour: "08:00",
        closeHour: "21:00",
        resetPage: false
    });
    const [cart, setCart] = useState([]);
    const [countCart, setCountCart] = useState(0);

    useEffect(() => {
        setCountCart(cart.length);
    }, [cart])

    const handleCart = arg => {
        const index = cart.findIndex(e => e.secureId === arg.secureId);
        const copyCart = [...cart];
        copyCart.splice(index, 1);
        setCart(copyCart);
    };

    return (
        <BrowserRouter>
            <AppBar handleSubmit={(e) => setPayload({...e})} countCart={countCart}/>
            <Switch>
                <Route exact path={RESTAURANT.ROOT} render={() => <Restaurant params={payload} handleResetPage={() => setPayload({...payload, resetPage: false})}/>} />
                <Route exact path={MIGRATIONS.ROOT} component={ Migrations } />
                <Route exact path={RESTAURANT.DETAIL} render={() => <RestaurantDetail handleCart={e => setCart(current => [...current, e])} /> } />
                <Route exact path={CART.ROOT} render={() => <Cart cart={cart} handleCart={e => handleCart(e)} handleClearCart={() => setCart([]) }/> } />
                <Route exact path={TRANSACTION.ROOT} component={ TransactionHistory } />
                <Route exact path="" component={ Page404 } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
