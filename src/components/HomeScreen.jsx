import React from 'react'
import { logout } from '../firebase'

const HomeScreen = () => {

    const handleLogout = async () => {
        await logout()
    }

    return (
        <>
            <div>HI frans</div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default HomeScreen;