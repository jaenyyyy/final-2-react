import { useRecoilValue } from "recoil";
import { busIdState } from "../../recoil";
import { useEffect, useState } from "react";

const MyResList = () => {
  const busId = useRecoilValue(busIdState);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/business/myres/${busId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setRestaurants(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
  }, []); 
  
  return (
    <div className="container mt-5">
      <h1>{busId}님 매장목록</h1>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div key={restaurant.resNo} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant.resName}</h5>
                <p className="card-text">{restaurant.resAddr1}</p>
                <p className="card-text">{restaurant.resNo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResList;
