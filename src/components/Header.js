import React, { useEffect, useState, useContext } from 'react'
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    // console.log("Header render");

    const onlineStatus = useOnlineStatus()
    
    const { loggedInUser } = useContext(UserContext)
    
    // subscribing to the store using a selector
    const cartItems = useSelector((store) => store.cart.items)

    useEffect(() => {
        // console.log("useEffect called");
    },[btnName]);

    return (
        <div className="flex justify-between m-2 bg-pink-100 shadow-lg sm:bg-yellow-100">
            <div className="logo-container">
                <img className="w-20" src={LOGO_URL} />
        
            </div>
            <div className="items-center">
                <ul className='flex p-4 m-4'>
                    <li className='px-4'>Online Status: {onlineStatus?"🟢":"🔴"}</li>
                    <li className='px-4'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/about'>About us</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/contact'>Contact us</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/grocery'>Grocery</Link>
                    </li>
                    <li className='px-4 font-bold'>
                        <Link to='/cart'>Cart ({cartItems.length} items)</Link>
                    </li>
                    <button
                        className='login'
                        onClick={() => {
                            btnName === "Login"
                                ? setBtnName("Logout")
                                : setBtnName("Login");
                        }}
                    >
                        {btnName}
                    </button>
                    <li className='px-4 font-bold'>{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
}

export default Header