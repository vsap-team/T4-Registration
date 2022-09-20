import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from '../firebase';
import Login from '../Login';
import Signup from '../signup';
import HomeScreen from './HomeScreen';
import LoadScreen from './LoadScreen';


const SearchRoutes = () => {
    const [user, loading] = useAuthState(auth)

    return (
        !loading ?
            <Router>
                <Routes>
                    <Route exact path="/" element={!user ? <Login /> : <HomeScreen />} />
                    {!user &&
                        <Route exact path="/signup" element={<Signup />} />
                    }
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Router>
            :
            <div>
                <LoadScreen />
            </div>

    )
}

export default SearchRoutes