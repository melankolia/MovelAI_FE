import React, { useState, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap';
import Pagination from 'react-bootstrap-4-pagination';
import Helper from "common/helper";
import { Meal } from 'assets/images';
import TransactionService from 'services/resources/transaction.service';
import './index.css';
import { DataNotFound } from 'components';


const MealDetail = (props, index) => {
    return (
        <Card key={index} className="meal-card-detail">
            <Card.Body className="card-body-detail">
                <div className="container-restaurant-img">
                    <div className="restaurant-img">
                        <Card.Title style={{ fontSize: "12px", alignSelf: "flex-start" }}>
                            Restaurant : <br />
                            <b> {props.restaurant_name}</b>
                        </Card.Title>
                        <img width="50px" height="50px" src={Meal} alt="Restaurant Logo"/>
                    </div>
                    <div className="ml-4">
                        <Card.Text style={{ fontSize: "14px" }} className="mb-0">
                            <b>Meal Set :</b> {Helper.upperCase(props.type_set)}
                        </Card.Text>
                        <Card.Text style={{ fontSize: "14px" }}>{props.description}</Card.Text>
                        <Card.Text style={{ fontSize: "14px" }}>
                            <b>Transaction Date : </b>{ Helper.converterDate(props.transaction_date)}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

const History = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [page, setPage] = useState(1);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        const getData = () => {
            const payload = {
                limit: 5,
                page: activePage
            }
            setError(false);
            setLoading(true);
            TransactionService.getHistory(payload)
            .then(({ data: { message, result } }) => {
                if (message === "OK") {
                    setPage(result.pages);
                    setHistoryList([...result.TransactionList]);
                } else {
                    throw result;
                }
            })
            .catch(err => {
                console.error(err);
                setError(true);
            })
            .finally(() => setLoading(false));
        }

        getData();
    }, [activePage])

    return (
        <div className="cart-container mt-4">
            <Card className="card-history-container mb-4 pb-4">
                <Card.Title className="px-4 pt-4">Transaction History</Card.Title>
                <hr />
                <Card.Body className="card-history-body">
                    {  isLoading ? (<Spinner animation="border" variant="primary"/> ) : 
                        historyList.map((e, i) => MealDetail(e, i))    
                    }
                </Card.Body>
                {
                    !isError ? 
                    !isLoading && (
                        <Pagination 
                            totalPages={page}
                            currentPage={activePage}
                            showMax={5}
                            size="sm"
                            threeDots={true}
                            prevNext={true}
                            onClick={(e) => {
                                setActivePage(e);
                            }}
                        /> 
                    ) :
                    <DataNotFound link="/transaction" text="Transaction Empty" />
                }
            </Card>
        </div>
    )
}

export default History
