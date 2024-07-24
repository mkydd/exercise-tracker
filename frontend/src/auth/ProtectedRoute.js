import { Outlet, Navigate} from "react-router-dom";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../util/Loading";

const PrivateRoute = () => {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    if (isLoading) {
      return <Loading />
    }

    if (isAuthenticated) {
      return <Outlet />
    } else {
      return <Navigate to={loginWithRedirect()} />;
    }
};

export default PrivateRoute;