import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import { findStudent } from "../services/AccountService";
export function StuProtected({children}){
    const { user } = UserAuth();
    const [loading, setLoading] = useState(true);
    const [isStudent, setIsStudent] = useState(false);
  
    useEffect(() => {
      if (user) {
        findStudent(user.uid)
          .then((result) => {
            setIsStudent(result.found);
          })
          .catch((error) => {
            console.error("Error checking if user is a student:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [user]);
  
    if (loading) {
      // Render loading state while checking if user is a teacher
      return <div>Loading...</div>;
    }
  
    if (!user || !isStudent) {
      // If user is not signed in or is not a teacher, redirect to signup page
      return <Navigate to="/signuppage" replace />;
    }
  
    // If user is signed in and is a teacher, render the protected content
    return children;
}