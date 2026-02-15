import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemList from "./ItemList"
import { clearCart } from '../utils/cartSlice'

const Cart = () => {

    const cartItem = useSelector((store) => store.cart.items)
    const cartRestaurantId = useSelector((store) => store.cart.restaurantId)
    
    const dispatch = useDispatch()
    
    const handleClearCart = () => {
        dispatch(clearCart())
    }

    // group cart items by id so each item appears once in the cart UI
    const uniqueCartItems = React.useMemo(() => {
        const map = new Map()
        for (const item of cartItem) {
            const id = item?.card?.info?.id
            if (!id) continue
            if (!map.has(id)) {
                map.set(id, item)
            }
        }
        return Array.from(map.values())
    }, [cartItem])

    // calculate bill details from raw cart items (includes quantities)
    const billDetails = React.useMemo(() => {
        if (!cartItem || cartItem.length === 0) {
            return { itemCount: 0, subTotal: 0, tax: 0, total: 0 }
        }

        let subTotal = 0
        for (const item of cartItem) {
            const info = item?.card?.info
            if (!info) continue
            const priceInPaise = info.price ?? info.defaultPrice ?? 0
            subTotal += priceInPaise / 100
        }

        const itemCount = cartItem.length
        const tax = subTotal * 0.1 // 10% tax (can be adjusted)
        const total = subTotal + tax

        return { itemCount, subTotal, tax, total }
    }, [cartItem])
  return (
    <div className='text-center m-4 p-4'>
        {/* <h1 className='text-2xl font-bold'>Cart</h1> */}
        <div className='w-10/12 m-auto flex gap-6 items-start'>
            {/* Cart items - 75% width */}
            <div className='w-3/4'>
                <button 
                    className='p-2 m-2 text-white bg-black rounded-lg'
                    onClick={handleClearCart}>
                    Clear Cart</button>
                {cartItem.length===0 && (
                    <h1 className='mt-4'>Cart is empty. Add items in the cart</h1>
                )}
                <ItemList items={uniqueCartItems} restaurantId={cartRestaurantId} />
            </div>

            {/* Bill details - 25% width */}
            <div className='w-1/4 text-left border border-gray-200 rounded-lg shadow-sm p-4 bg-gray-50'>
                <h2 className='text-lg font-semibold mb-4'>Bill Details</h2>
                <div className='flex justify-between text-sm mb-2'>
                    <span>Items ({billDetails.itemCount})</span>
                    <span>₹{billDetails.subTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm mb-2'>
                    <span>Tax (10%)</span>
                    <span>₹{billDetails.tax.toFixed(2)}</span>
                </div>
                <div className='border-t border-gray-300 my-3'></div>
                <div className='flex justify-between font-semibold text-base'>
                    <span>Total to pay</span>
                    <span>₹{billDetails.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart
