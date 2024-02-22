import "./homepage.css";
import Image from "../images/image1.avif";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllRestaurants } from "../state/restaurantSlice";
import { Link, useNavigate } from "react-router-dom";
export const HomePage = () => {
  const restaurants = useSelector((state) => state.restaurant.allRestaurants);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        await dispatch(getAllRestaurants());
      } catch (error) {
        console.log(error);
        // setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
    // console.log(restaurants.data.restaurants.);
  }, [dispatch]);
  return (
    <div className="restaurants-list">
      <div className="restaurants">
        <div className="individual-res">
          {restaurants?.data?.restaurants?.map((restaurant) => {
            return (
              <div key={restaurant._id}>
                <div
                  className="single-res"
                  onClick={() =>
                    navigate(`restaurant-detail/${restaurant._id}`)
                  }
                >
                  <div className="res-image">
                    <img
                      src={Image}
                      width="250px"
                      height="250px"
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                  <div className="res-detail">
                    <div className="res-name">
                      {restaurant.name || "McDonald's"}
                    </div>
                    <div className="res-time">
                      <p>4.2</p>
                      <p>33 mins</p>
                    </div>
                    <div className="res-category">
                      <p>{restaurant.foodCategory || "Pizza,indian"}</p>
                    </div>
                    <div className="res-location">
                      {restaurant.address || "Ahmedabad"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="individual-res">
          <div>
            <div className="single-res">
              <div className="res-image">
                <img
                  src={Image}
                  width="250px"
                  height="250px"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="res-detail">
                <div className="res-name">McDonald's</div>
                <div className="res-time">
                  <p>4.2</p>
                  <p>33 mins</p>
                </div>
                <div className="res-category">
                  <p>Burgers,indian thali</p>
                </div>
                <div className="res-location">Ahmedabad</div>
              </div>
            </div>
          </div>
        </div>
        <div className="individual-res">
          <div>
            <div className="single-res">
              <div className="res-image">
                <img
                  src={Image}
                  width="250px"
                  height="250px"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="res-detail">
                <div className="res-name">McDonald's</div>
                <div className="res-time">
                  <p>4.2</p>
                  <p>33 mins</p>
                </div>
                <div className="res-category">
                  <p>Burgers,indian thali</p>
                </div>
                <div className="res-location">Ahmedabad</div>
              </div>
            </div>
          </div>
        </div>
        <div className="individual-res">
          <div>
            <div className="single-res">
              <div className="res-image">
                <img
                  src={Image}
                  width="250px"
                  height="250px"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="res-detail">
                <div className="res-name">McDonald's</div>
                <div className="res-time">
                  <p>4.2</p>
                  <p>33 mins</p>
                </div>
                <div className="res-category">
                  <p>Burgers,indian thali</p>
                </div>
                <div className="res-location">Ahmedabad</div>
              </div>
            </div>
          </div>
        </div>
        <div className="individual-res">
          <div>
            <div className="single-res">
              <div className="res-image">
                <img
                  src={Image}
                  width="250px"
                  height="250px"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="res-detail">
                <div className="res-name">McDonald's</div>
                <div className="res-time">
                  <p>4.2</p>
                  <p>33 mins</p>
                </div>
                <div className="res-category">
                  <p>Burgers,indian thali</p>
                </div>
                <div className="res-location">Ahmedabad</div>
              </div>
            </div>
          </div>
        </div>
        <div className="individual-res">
          <div>
            <div className="single-res">
              <div className="res-image">
                <img
                  src={Image}
                  width="250px"
                  height="250px"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="res-detail">
                <div className="res-name">McDonald's</div>
                <div className="res-time">
                  <p>4.2</p>
                  <p>33 mins</p>
                </div>
                <div className="res-category">
                  <p>Burgers,indian thali</p>
                </div>
                <div className="res-location">Ahmedabad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
