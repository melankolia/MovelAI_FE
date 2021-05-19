import React from 'react';
import { DataNotFound } from 'assets/images';

const dataNotFound = ({ link, text, tryAgain = false }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img width="240px" src={DataNotFound} alt="Data Not Found"/> 
            <h3>{ text }</h3>
            { tryAgain && 
                <p>
                    <a href={link}>Try Again</a>
                </p>
            }

        </div>
    )
}

export default dataNotFound;
