import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { useContext, useEffect, useState } from 'react';
import resList from '../utils/mockData';
import Shimmer from './Shimmer';
import { Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { DOMAIN_URL } from '../utils/constants';

const Body = () => {

    const [restaurantList,setRestaurantList] = useState([]);
    const [filteredRestaurantList,setFilteredRestaurantList] = useState([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted=withPromotedLabel(RestaurantCard)

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const data = await fetch(
            // "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            // "https://namastedev.com/api/v1/listRestaurants"
            DOMAIN_URL + "/restaurants"
        );

        const json = await data.json();

        const restaurants =
            json?.data?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setRestaurantList(restaurants);
        setFilteredRestaurantList(restaurants);
    }

    const onlineStatus = useOnlineStatus()
    
    if (onlineStatus === false)
    {
        return (<h1>
            Looks like you're offline!!! Please check your internet
        </h1>)
    }

    const { loggedInUser, setUserName } = useContext(UserContext)

    return restaurantList?.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="flex">
                <div className='p-2 m-4'>
                    <input type='text' 
                        className='border border-solid border-black'
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}/>
                    <button className='rounded-lg px-4 m-3 bg-green-100' onClick={()=>{
                        const filteredRestaurants=restaurantList.filter((res)=>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurantList(filteredRestaurants);
                        }}>
                        Search
                    </button>
                </div>
                <div className='flex items-center'>
                    <button
                        className='rounded-lg px-4 bg-gray-100'
                        onClick={() => {
                            const filteredResList = restaurantList.filter(
                                res => res.info.avgRating >= 4.5
                            );
                            setFilteredRestaurantList(filteredResList);
                        }}>
                        Top Rated Restaurants
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurantList.map(restaurant =>
                        <Link
                            key={restaurant.info.resId}
                            to={"/restaurants/" + restaurant.info.resId}>
                            {/* if the restaurant is promoted then add a promoted label to it */}
                            {
                                restaurant.info.isOpen ?
                                    <RestaurantCardPromoted resData={restaurant} /> :
                                    <RestaurantCard resData={restaurant} />
                            }
                            
                        </Link>)
                }
            </div>
        </div>
    );
}

export default Body
