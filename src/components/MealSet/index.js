import React, { useState } from 'react';
import Helper from "common/helper";
import { Meal } from 'assets/images';
import { Buttons as Button } from 'components';
import './index.css';

const MealSet = ({ detailRestaurant, detail, handleCart }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <div className="card-set mb-2 px-2 py-2">
            <div style={{ display: "flex" }}>
                <img width="50px" height="50px" src={Meal} alt="Restaurant Logo"/>
                <div className="meal-detail ml-2">
                    <p className="mb-0">
                        <b>{ Helper.upperCase(detail.type_set) }</b>
                    </p>
                    <p className="mb-0" style={{ fontSize: "12px" }}>
                        { detail.description }
                    </p>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Button 
                    handleClick={() => {
                            setLoading(true);
                            handleCart({
                                ...detailRestaurant,
                                ...detail
                            });
                            setTimeout(() => {
                                setLoading(false);
                            }, 500);
                        }
                    } 
                    isLoading={isLoading}
                    className="mr-1" 
                    sizes="sm"
                    textButton="Add"
                />
            </div>
        </div>
    )
}

export default MealSet;
