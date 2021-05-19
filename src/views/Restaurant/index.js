import React, { useState, useEffect } from 'react';
import { Restaurant as RestaurantCard, DataNotFound } from 'components';
import Pagination from 'react-bootstrap-4-pagination';
import RestaurantService from 'services/resources/restaurant.service';
import { Spinner } from 'react-bootstrap';
import './index.css';

const Restaurant = ({ params }) => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const getListData = async () => {
      setIsError(false);
      setLoading(true);
      const payload = {
        limit: 10,
        page: activePage,
        openHours: params.openHour,
        closeHours: params.closeHour,
        availableDays: params.availableDays,
        search: params.search
      };
  
      RestaurantService.getList(payload)
      .then(({ data: { message, result } }) => {
        if (message === "OK") {
          setPage(result.pages);
          setList([...result.RestaurantList]);
        } else {
          setIsError(true);
          console.error("ERROR");
        }
      }).catch(err => {
        setIsError(true);
        console.error("ERROR");
      })
      .finally(() => setLoading(false));
    };

    getListData();
  }, [activePage, params]);

  return (
    <div className="super-container">
      { isError ? <DataNotFound link="/" text="Data Not Found" tryAgain/>:
        <>
          <div className="restaurant-container">
            { isLoading ? <Spinner animation="border" variant="primary"/> :
                list.map((e, i) => <RestaurantCard value={e} key={i} footer/>)
            }
          </div>
          { !isLoading && !isError && 
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
          />}
        </>
      }
    </div>
  );
}

export default Restaurant;
