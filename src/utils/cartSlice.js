import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            // mutating the state here
            // Redux Toolkit uses immer behind the scene
            state.items.push(action.payload)
        },
        removeItem: (state) => {
            state.items.pop()
        },
        // orginalState = ["pizza"]
        clearCart: (state) => {
            // different array, we are changing the reference only
            // state is local so only state changes
            // originalState remains same
            // state = []
            state.items.length = 0 // state = []
            // or 
            // return { items: [] }
            console.log(current(state))
        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
