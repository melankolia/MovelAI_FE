import React, { useState, useEffect } from 'react'
import { MealSet, DataNotFound } from 'components';
import { Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Restaurant as RestaurantLogo } from 'assets/images';
import Helper from 'common/helper';
import RestaurantService from 'services/resources/restaurant.service';
import './index.css';

const Detail = ({ handleCart }) => {
    const { secureId } = useParams();
    const [detail, setDetail] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    
    useEffect(() => {
        const getListData = async (id) => {
            RestaurantService.getDetail(id)
            .then(({ data: { message, result }}) => {
                if (message === "OK") {
                    setError(false);
                    setDetail(result);
                } else {
                    setError(true);
                }
            })
            .catch(err => {
                setError(true);
            })
            .finally(() => setLoading(false));
        };

        secureId && getListData(secureId);
    }, [secureId]);

    const RestaurantDetail = () => {

        return (
            <div className="restaurant-container">
                <Card className="card-detail pb-4">
                    <Card.Body style={{ display: "flex" }}>
                        <img src={RestaurantLogo} alt="Restaurant Logo"/>
                        <Card.Body className="card-desc pr-0">
                            <Card.Title>{detail.name}</Card.Title>
                            <Card.Text className="mb-0" style={{ fontSize: "14px" }}>
                                Opeation Hours: {`${Helper.convert12HourMode(detail.openHours)} - ${Helper.convert12HourMode(detail.closeHours)}`}
                            </Card.Text>
                            <Card.Text style={{ fontSize: "14px" }}>
                                Off Days: {detail.offDays}
                            </Card.Text>
                            <Card.Title style={{ fontSize: "14px" }}>Menu Meal Set</Card.Title>
                            <Card className="card-menu">
                                <Card.Body className="pt-3 pb-3 pl-3 pr-3 card-meal-set">
                                    {   detail.MealSet.length > 0 && detail.MealSet.map((e, index) => (<MealSet detailRestaurant={{id_restaurant: detail.id_restaurant, name: detail.name}} detail={e} key={index} handleCart={(e) => handleCart(e)}/>) )  }
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        )
    };

    return (
        <div className="detail-container">
            { isError ? <DataNotFound link={`/restaurant/${secureId}`} text="Data Not Found" tryAgain/>   :
                <>
                    { isLoading ? <Spinner animation="border" variant="primary"/> : 
                        RestaurantDetail()
                    }
                </>
            }
        </div>
    )
}

export default Detail
