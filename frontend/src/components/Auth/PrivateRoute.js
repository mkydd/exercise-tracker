import { Outlet, Navigate} from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
    const { user, loginWithRedirect } = useAuth0();
    console.log(99999999)
    if (user) {
        console.log('user login in sucessful')
        return <Outlet />;
    } else {
        console.log('user login failed')
        return <Navigate to={loginWithRedirect()} />;
    }
};

export default PrivateRoute;