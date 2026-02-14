import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        // restaurant from which current cart items belong
        restaurantId: null,
    },
    reducers: {
        addItem: (state, action) => {
            const { item, restaurantId } = action.payload
            // mutating the state here
            // Redux Toolkit uses immer behind the scene
            state.items.push(item)
            // if cart was empty or restaurantId not set, set it
            if (!state.restaurantId && restaurantId) {
                state.restaurantId = restaurantId
            }
        },
        removeItem: (state) => {
            state.items.pop()
        },
        decreaseItem: (state, action) => {
            const itemId = action.payload
            const idx = state.items.findLastIndex((i) => i?.card?.info?.resId === itemId)
            if (idx !== -1) state.items.splice(idx, 1)
        },
        // orginalState = ["pizza"]
        clearCart: (state) => {
            // different array, we are changing the reference only
            // state is local so only state changes
            // originalState remains same
            // state = []
            state.items.length = 0 // state = []
            state.restaurantId = null
            // or 
            // return { items: [], restaurantId: null }
            console.log(current(state))
        }
    }
})

export const { addItem, removeItem, decreaseItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
