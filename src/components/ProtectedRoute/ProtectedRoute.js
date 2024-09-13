import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = Cookies.get('token'); // Check if token exists in cookies

    // Render the component if token exists, otherwise redirect to login
    return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
