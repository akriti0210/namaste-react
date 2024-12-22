import React from 'react';
import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const ItemList = ({ items }) => {

  const dispatch=useDispatch()
  
  const handleAddClick = (item) => {
    // dispatch an action
    dispatch(addItem(item))
  }
  return (
    <div>
      <ul>
        {items.map(item =>
          <div
            key={item.card.info.id}
            className='p-2 m-2 border border-gray-200 border-b-2 text-left flex justify-between'>
            <div className='w-9/12'>
              <div className='p-2'>
                <span>{item.card.info.name}</span>
                <span> - ₹ {item.card.info.price / 100
                  || item.card.info.defaultPrice / 100}
                </span>
              </div>
              <p className='text-xs p-2'>{item.card.info.description}</p>
            </div>
            <div className='w-3/12 p-4'>
              <img
                src={CDN_URL + item.card.info.imageId}
                className='w-30'
              />
              <div className='absolute'>
                <button
                  className='bg-white shadow-lg text-center p-2 mx-14 text-green-600 rounded-lg'
                  onClick={()=>handleAddClick(item)}
                >
                  Add+
                </button>
              </div>
            </div>
          </div>)
        }
      </ul>
    </div>
  )
}

export default ItemList
