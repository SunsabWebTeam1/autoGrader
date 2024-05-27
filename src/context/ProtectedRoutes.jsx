import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserAuth } from "./AuthContext";

export function Protected({children}){
    const {user} = useContext(UserAuth);

    if(!user){
        return <Navigate to="/signuppage" replace />
    }
}