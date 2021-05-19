import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Form } from 'react-bootstrap';
import { Buttons, Alerts } from '../../components';
import MigrationService from '../../services/resources/migration.service';
import './index.css';

const Migrations = () => {
    const [file, setFile] = useState({
        name: "Input File"
    });
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [show, setShow] = useState(false);
    
    const History = useHistory();
    const handleFormInput = (arg) => {
        setFile(arg.files[0]);
    };

    const handleSubmit = () => {
        setError(false);
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        MigrationService.importData(formData)
        .then(({ data: { message, result} }) => {
            if (message === "OK") {
                setError(false);
            } else {
                setError(true);
            }
        })
        .catch(err => {
            setError(true);
            console.error(err);
        })
        .finally(() => {
            setShow(true);
            setLoading(false);
            setTimeout(() => {
                setShow(false);
            }, 10000)
        });
    }

    return (
        <div className="migration-container">
            <Card style={{ width: "100%", height: "40%" }}>
                <Card.Body>
                    <Card.Title>Import Data CSV</Card.Title>
                    <Form>
                        <Form.File 
                            type="file"
                            id="custom-file-translate-scss"
                            label={file.name}
                            lang="en"
                            onChange={(e) => handleFormInput(e.target)}
                            custom
                        />
                    </Form>
                    { show && <Alerts isError={isError} text="Import Data" /> }
                    <Buttons 
                      isLoading={isLoading}
                      handleClick={() => History.goBack()}
                      variant="secondary"
                      textButton="Cancel"
                      className="mt-4 mr-2"
                    />
                    <Buttons 
                      isLoading={isLoading}
                      handleClick={handleSubmit}
                      variant="primary"
                      textButton="Submit"
                      className="mt-4 mr-2"
                    />
                </Card.Body>
            </Card>
        </div>
    )
}

export default Migrations
