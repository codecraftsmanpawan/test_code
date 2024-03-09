import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {


    const token = JSON.parse(localStorage.getItem("token"));
    const location = useLocation()
    return (
        <>
            {
                token.idToken ? children : <Navigate to='/adminlogin' state={{ from: location }} replace />
            }
        </>
    )
}

export default RequireAuth