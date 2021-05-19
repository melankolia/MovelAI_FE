import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Restaurant as RestaurantLogo } from '../../assets/images';
import Helper from 'common/helper';
import "./index.css";

const Restaurant = ({ value, footer }) => {
  const History = useHistory();

  const handleClick = (secureId) => {
    History.push(`/restaurant/${secureId}`);
  };

  return (
    <Card className="card">
      <Card.Img variant="top" src={RestaurantLogo} />
      <Card.Body>
        <Card.Title>{value.name}</Card.Title>
        <Card.Text style={{ fontSize: "14px" }}>
            <b>Open Hours :</b> { Helper.convert12HourMode(value.openHours) } <br />
            <b>Close Hours :</b> { Helper.convert12HourMode(value.closeHours) }
        </Card.Text>
      </Card.Body>
      { footer && 
        <>
          <Card.Footer>
            <Card.Link href="#" onClick={() => handleClick(value.secureId)}>Detail</Card.Link>
          </Card.Footer>
        </>
      }
    </Card>
  )
}

export default Restaurant;
