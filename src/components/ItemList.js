import React, { useState } from 'react';
import { CDN_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, decreaseItem } from '../utils/cartSlice';

const ItemList = ({ items, restaurantId }) => {

  const dispatch = useDispatch()
  const cartItems = useSelector((store) => store.cart.items)
  const cartRestaurantId = useSelector((store) => store.cart.restaurantId)
  const [showCartModal, setShowCartModal] = useState(false)
  const [pendingItem, setPendingItem] = useState(null)

  const getItemQuantity = (itemId) => {
    return cartItems.filter((i) => i?.card?.info?.id === itemId).length
  }

  const handleAddWithCheck = (item) => {
    const itemRestaurantId = restaurantId

    // If cart empty or restaurant not set or same restaurant, just add
    if (!cartItems.length || !cartRestaurantId || cartRestaurantId === itemRestaurantId) {
      dispatch(addItem({ item, restaurantId: itemRestaurantId }))
      return
    }

    // Different restaurant -> ask for confirmation
    setPendingItem(item)
    setShowCartModal(true)
  }

  const handleConfirmReplace = () => {
    if (pendingItem) {
      dispatch(clearCart())
      dispatch(addItem({ item: pendingItem, restaurantId }))
    }
    setPendingItem(null)
    setShowCartModal(false)
  }

  const handleCancelReplace = () => {
    setPendingItem(null)
    setShowCartModal(false)
  }

  return (
    <div>
      <ul>
        {items.map(item => {
          const itemId = item.card.info.id
          const quantity = getItemQuantity(itemId)

          return (
            <div
              key={itemId}
              className='p-2 m-2 border border-gray-200 border-b-2 text-left flex justify-between items-center'>
              <div className='w-9/12'>
                <div className='p-2'>
                  <span>{item.card.info.name}</span>
                  <span> - ₹ {item.card.info.price / 100
                    || item.card.info.defaultPrice / 100}
                  </span>
                </div>
                <p className='text-xs p-2'>{item.card.info.description}</p>
              </div>
              <div className='w-3/12 p-4 flex justify-center'>
                <div className='relative inline-block'>
                  <img
                    src={CDN_URL + item.card.info.imageId}
                    className='w-24 h-24 object-cover rounded'
                  />
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                    {quantity === 0 ? (
                      <button
                        className='bg-white shadow-lg text-center px-4 py-1 text-green-600 rounded-lg border border-gray-200 text-sm'
                        onClick={() => handleAddWithCheck(item)}
                      >
                        Add+
                      </button>
                    ) : (
                      <div className='flex items-center gap-1 bg-white shadow-lg rounded-lg px-1 py-1 border border-gray-200 text-sm'>
                        <button
                          className='text-green-600 font-bold px-2 hover:bg-gray-50 rounded'
                          onClick={() => dispatch(decreaseItem(itemId))}
                        >
                          -
                        </button>
                        <span className='px-2 text-green-600 font-medium min-w-[1.5rem] text-center'>
                          {quantity}
                        </span>
                        <button
                          className='text-green-600 font-bold px-2 hover:bg-gray-50 rounded'
                          onClick={() => handleAddWithCheck(item)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </ul>

      {showCartModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-80 text-center'>
            <h2 className='text-lg font-semibold mb-2'>Items already in cart</h2>
            <p className='text-sm mb-4'>
              Your cart contains items from other restaurant. Would you like to reset your cart for
              adding items from this restaurant?
            </p>
            <div className='flex gap-3 mt-2'>
              <button
                className='flex-1 border border-gray-300 rounded-md py-2 text-sm'
                onClick={handleCancelReplace}
              >
                No
              </button>
              <button
                className='flex-1 bg-green-600 text-white rounded-md py-2 text-sm'
                onClick={handleConfirmReplace}
              >
                Yes, start afresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemList
