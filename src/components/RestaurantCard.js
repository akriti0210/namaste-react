import React from 'react'
import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
    // const { imgSrc, resName, cuisine, starRating, deliveryTime } = props;
    
    const { resData } = props;

    console.log(resData)
    
    const {
        name,
        cuisines,
        avgRating,
        costForTwo,
        cloudinaryImageId,
        sla
    } = resData?.info;

    
    return (
        <div className="m-2 p-4 justify-between w-[250px] rounded-lg bg-gray-200 hover:bg-gray-400">
            <img
                className="w-[100%] h-[200px] rounded-lg"
                alt="res-logo"
                src={CDN_URL +
                    cloudinaryImageId
                }
            />
            <h3 className='font-bold py-3 text-lg'>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla.deliveryTime} minutes</h4>
        </div>
    )
}

// Higher Order Component

// input - RestaurantCard => RestaurantCardPromoted

export const withPromotedLabel=(RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label
                    className='absolute bg-black text-white m-4 p-1 rounded-lg'>
                    Promoted</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard
