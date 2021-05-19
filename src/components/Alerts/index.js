import React from 'react';
import { Alert } from 'react-bootstrap';

const Alerts = ({ isError, text = "", className = "mt-4" }) => {
    return (
        <Alert className={className} variant={!isError ? "success" : "danger"}>
            {
                !isError ? `${text} Success` : `${text} Failed`
            }
        </Alert>
    )
}

export default Alerts;
