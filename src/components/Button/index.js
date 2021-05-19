import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const Buttons = ({ isLoading, handleClick, variant = 'primary', textButton, className = '', sizes = 'lg', disabled = false }) => {

    return (
        <Button 
            className={className}
            variant={variant}
            disabled={isLoading || disabled}
            sizes={sizes}
            onClick={!isLoading ? () => handleClick() : null}
        >
            { isLoading ?
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                : <span>{ textButton }</span>
            }
        </Button>
    )
};

export default Buttons;