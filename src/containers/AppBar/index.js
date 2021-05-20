import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, Badge, Dropdown } from "react-bootstrap";
import TimeKeeper from 'react-timekeeper'

const Container = ({ handleSubmit, countCart }) => {
    const History = useHistory();

    const [search, setSearch] = useState("");
    const [filterDayList] = useState({
        Sunday: "sun",
        Monday: "mon",
        Tuesday: "tue",
        Wednesday: "wed",
        Thursday: "thu",
        Friday: "fri",
        Saturday: "sat"
    });
    const [filterDay, setFilterDay] = useState([]);
    const [time, setTime] = useState({
        openHour: "08:00",
        closeHour: "21:00"
    });

    const handleOnSubmit = (arg, type = "valid") => {
        arg && arg.preventDefault();
        if (type === "button" || arg.currentTarget.checkValidity()){
            History.push("/");
            handleSubmit({search, availableDays: filterDay.join(""), ...time, resetPage: true});
        };
    };

    const handleCheckBox = (arg, arg2, index) => {
        const copyFilter = [...filterDay];
        arg2 ? copyFilter[index] = arg : copyFilter[index] = null;
        setFilterDay([...copyFilter]);
    }

    return (
        <React.Fragment>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand onClick={() => History.push("/")}>Movel AI</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => History.push("/")}>Home</Nav.Link>
                    <Nav.Link onClick={() => History.push("/cart")}>Cart 
                        <Badge className="ml-1" variant="danger" pill>{countCart}</Badge>
                    </Nav.Link>
                    <Nav.Link onClick={() => History.push("/transaction")}>Transaction History</Nav.Link>
                    <Nav.Link onClick={() => History.push("/migrations")}>Migrations</Nav.Link>
                </Nav>
                <Form inline onSubmit={handleOnSubmit}>
                <Dropdown className="mr-1">
                        <Dropdown.Toggle id="dropdown-basic">
                            Available Day
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            { Object.entries(filterDayList).map((e,i) => (
                                <div key={i}>
                                    <Form.Row className="ml-4 mb-2">
                                        <Form.Check 
                                            type="checkbox"
                                            id="default-checkbox"
                                            label={e[0]}
                                            key={i}
                                            onChange={(e2) => handleCheckBox(e[1], e2.target.checked , i)}
                                        />
                                    </Form.Row>
                                </div>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mr-1">
                        <Dropdown.Toggle id="dropdown-basic">
                            Open Hour
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <TimeKeeper
                                time={time.openHour}
                                onChange={(newTime) => 
                                    setTime(cv => { return {...cv, openHour: newTime.formatted24}})}
                                switchToMinuteOnHourSelect
                                hour24Mode
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mr-1">
                        <Dropdown.Toggle id="dropdown-basic">
                            Close Hour
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <TimeKeeper
                                time={time.closeHour}
                                onChange={(newTime) => 
                                    setTime(cv => { return {...cv, closeHour: newTime.formatted24}})}
                                switchToMinuteOnHourSelect
                                hour24Mode
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                    <FormControl onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button 
                        onClick={() => handleOnSubmit(null, "button")} 
                        variant="outline-light"
                    >
                        Search
                    </Button>
                </Form>
            </Navbar>
        </React.Fragment>
    )
}

export default Container;
