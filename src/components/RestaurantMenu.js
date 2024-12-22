import React, { useEffect, useState } from 'react'
import Shimmer from './Shimmer';
import { useParams } from 'react-router';
import { MENU_API } from '../utils/constants';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {

    // const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showItem, setShowItem] = useState(false)

    const [showIndex, setShowIndex] = useState()

    // useEffect(() => {
    //     fetchMenu();
    // }, []);

    // const fetchMenu = async () => {
    //     const data = await fetch(
    //         MENU_API+resId+"&catalog_qa=undefined&submitAction=ENTER"
    //     );

    //     // const data = await fetch(
    //     //     MENU_API + resId  + "&catalog_qa=undefined&submitAction=ENTER"
    //     // );

    //     const json = await data.json();

    //     setResInfo(json.data)
    // };

    if(resInfo === null) return <Shimmer /> 

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        c=>c?.card?.card?.["@type"]===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )

    // console.log(categories)
    return (
        <div className='text-center'>
            <h1 className='font-bold my-10 text-2xl'>{name}</h1>
            <p className='font-bold text-lg'>{cuisines.join(",")}</p>
            {categories.map((category,index) => {
                return <RestaurantCategory
                    key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItem={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(index)}
                />
            })
            }
            {/* <ul>
                {itemCards.map((item) =>
                    <li key={item.card.info.id}>
                        {item.card.info.name} - {"Rs : "}
                        {item.card.info.defaultPrice/100
                            || item.card.info.price/100}
                    </li>
                )}
            </ul> */}
        </div>
    )
}

export default RestaurantMenu
