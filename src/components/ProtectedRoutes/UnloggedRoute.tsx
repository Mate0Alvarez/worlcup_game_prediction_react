import { FC, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppCtx } from "../../context/ProdeContext";
import { IProtectedRouteProps } from "../../interfaces/interfaces";
import { ProdeContextType } from "../../types/types";

const UnloggedRoute: FC<IProtectedRouteProps> = ({ component: Component }) => {
    const { userData } = useContext(AppCtx) as ProdeContextType;

    useEffect(() => { }, [userData]);

    if (userData) {
        return <Navigate to="/" replace={true} />;
    }

    return <Component />;
};

export default UnloggedRoute;
