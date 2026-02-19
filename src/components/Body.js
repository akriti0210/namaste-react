import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { useContext, useEffect, useState, useRef } from 'react';
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
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('RELEVANCE');
    const sortRef = useRef(null);

    useEffect(() => {
        const handleDocClick = (e) => {
            if (sortOpen && sortRef.current && !sortRef.current.contains(e.target)) {
                setSortOpen(false);
            }
        };

        const handleKey = (e) => {
            if (e.key === 'Escape') setSortOpen(false);
        };

        document.addEventListener('click', handleDocClick);
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('click', handleDocClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [sortOpen]);

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

    const handleVegFilter = (isVeg) => {
        if (!restaurantList || restaurantList.length === 0) {
            setFilteredRestaurantList([]);
            return;
        }

        const filtered = restaurantList.filter(r => {
            // Some entries may nest restaurant info under `info` (from older REST shape)
            const item = r.info ? r.info : r;
            return item.veg === isVeg;
        });

        setFilteredRestaurantList(filtered);
    };

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
                    <div className='relative' ref={sortRef}>
                        <button
                            className='rounded-full px-4 py-2 border border-gray-300 text-sm flex items-center'
                            onClick={() => setSortOpen(!sortOpen)}>
                            <span className='mr-2'>Sort By</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10l5 5 5-5" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>

                        {sortOpen && (
                            <div className='absolute z-20 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg'>
                                <div className='p-4'>
                                    <div className='mb-3 font-semibold text-gray-700'>Sort By</div>
                                    <div className='text-sm text-gray-600'>
                                        <div role="radiogroup" aria-label="Sort options" className='space-y-3'>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-gray-700'>Relevance (Default)</div>
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value="RELEVANCE"
                                                    checked={selectedSort === 'RELEVANCE'}
                                                    onChange={() => setSelectedSort('RELEVANCE')}
                                                    aria-checked={selectedSort === 'RELEVANCE'}
                                                />
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-gray-600'>Delivery Time</div>
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value="DELIVERY_TIME"
                                                    checked={selectedSort === 'DELIVERY_TIME'}
                                                    onChange={() => setSelectedSort('DELIVERY_TIME')}
                                                    aria-checked={selectedSort === 'DELIVERY_TIME'}
                                                />
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-gray-600'>Rating</div>
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value="RATING"
                                                    checked={selectedSort === 'RATING'}
                                                    onChange={() => setSelectedSort('RATING')}
                                                    aria-checked={selectedSort === 'RATING'}
                                                />
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-gray-600'>Cost: Low to High</div>
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value="COST_ASC"
                                                    checked={selectedSort === 'COST_ASC'}
                                                    onChange={() => setSelectedSort('COST_ASC')}
                                                    aria-checked={selectedSort === 'COST_ASC'}
                                                />
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-gray-600'>Cost: High to Low</div>
                                                <input
                                                    type="radio"
                                                    name="sort"
                                                    value="COST_DESC"
                                                    checked={selectedSort === 'COST_DESC'}
                                                    onChange={() => setSelectedSort('COST_DESC')}
                                                    aria-checked={selectedSort === 'COST_DESC'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-t border-gray-100 p-3 text-center'>
                                    <button
                                        className='text-orange-500 font-semibold'
                                        onClick={async () => {
                                            // call GraphQL filterRestaurants with sort
                                            try {
                                                const response = await fetch(DOMAIN_URL + '/graphql', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        query: `
                                                            query FilterRestaurants($sort: String) {
                                                                filterRestaurants(sort: $sort) {
                                                                    info{
                                                                        resId
                                                                        name
                                                                        cloudinaryImageId
                                                                        avgRating
                                                                        cuisines
                                                                        locality
                                                                        areaName
                                                                        costForTwo
                                                                        veg
                                                                        sla{
                                                                            deliveryTime}
                                                                    }
                                                                }
                                                            }
                                                        `,
                                                        variables: { sort: selectedSort }
                                                    })
                                                });

                                                const result = await response.json();
                                                const list = result.data?.filterRestaurants || [];
                                                setFilteredRestaurantList(list);
                                            } catch (err) {
                                                console.error('Error applying sort:', err);
                                            } finally {
                                                setSortOpen(false);
                                            }
                                        }}
                                    >Apply</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex items-center space-x-3 ml-3'>
                        <button
                            className='rounded-full px-4 py-2 border border-gray-300 text-sm'
                            onClick={() => handleVegFilter(true)}>
                            Pure Veg
                        </button>
                        <button
                            className='rounded-full px-4 py-2 border border-gray-300 text-sm'
                            onClick={() => handleVegFilter(false)}>
                            Non Veg
                        </button>
                        <button
                            className='rounded-full px-4 py-2 border border-gray-300 text-sm'
                            onClick={() => {
                                const filteredResList = restaurantList.filter(
                                    res => res.info.avgRating >= 4.5
                                );
                                setFilteredRestaurantList(filteredResList);
                            }}>
                            Ratings 4.5+
                        </button>
                    </div>
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
