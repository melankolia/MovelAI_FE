import React, { useState } from 'react';
import Helper from "common/helper";
import { Meal } from 'assets/images';
import { Card } from 'react-bootstrap';
import { Buttons as Button, Alerts, DataNotFound } from 'components';
import TransactionService from 'services/resources/transaction.service';
import './index.css';

const MealDetail = (props, index, handleCart) => {
    return (
        <Card key={index} className="meal-card-detail">
            <Card.Body className="card-body-detail">
                <div className="container-restaurant-img">
                    <div className="restaurant-img">
                        <Card.Title style={{ fontSize: "12px", alignSelf: "flex-start" }}>
                            Restaurant: <br />
                            <b>{props.name}</b>
                        </Card.Title>
                        <img width="50px" height="50px" src={Meal} alt="Restaurant Logo"/>
                    </div>
                    <div className="ml-4">
                        <Card.Text style={{ fontSize: "14px" }} className="mb-0">
                            <b>Meal Set : </b>
                            { Helper.upperCase(props.type_set) }
                        </Card.Text>
                        <Card.Text style={{ fontSize: "14px" }}>{props.description}</Card.Text>
                    </div>
                </div>
                <Button 
                    handleClick={() => handleCart(props)} 
                    className="mr-1" 
                    sizes="sm"
                    variant="danger"
                    textButton="Remove"
                />
            </Card.Body>
        </Card>
    )
}

const Cart = ({ cart, handleCart, handleClearCart }) => {
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [show, setShow] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        TransactionService.checkout({
            mealSet: cart
        })
        .then(({ data: { message, result } }) => {
            if (message === "OK") {
                setError(false);
                handleClearCart();
            } else {
                setError(true);
                console.error(result);
            }
        })
        .catch(err => {
            console.error(err);
            setError(true);
        })
        .finally(() => {
            setLoading(false);
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000)
        });
    }

    return (
        <div className="cart-container mt-4">
            <Card className="card-meal-container">
                <Card.Title className="px-4 pt-4">Cart</Card.Title>
                <hr />
                <Card.Body>
                    { cart.length > 0 ? cart.map((e, i) => MealDetail(e, i, (e) => handleCart(e))) : 
                        (<DataNotFound link="/cart" text="Cart Empty"/>)
                    }
                    { show && (<Alerts isError={isError} text="Checkout Data" className="mx-4 my-4" />) }
                </Card.Body>
                <Button 
                    handleClick={() => handleSubmit()} 
                    className="my-4 mx-4" 
                    disabled={cart.length < 1}
                    isLoading={loading}
                    textButton="Checkout"
                />
            </Card>
        </div>
    )
}

export default Cart
