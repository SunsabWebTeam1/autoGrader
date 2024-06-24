import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { findTeacher } from "../services/AccountService";
import { UserAuth } from "./AuthContext";

export function TeaProtected({ children }) {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    if (user) {
      findTeacher(user.uid)
        .then((result) => {
          setIsTeacher(result.found);
        })
        .catch((error) => {
          console.error("Error checking if user is a teacher:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    // Render loading spinner while checking if user is a teacher
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="secondary" sx={{ color: "#6C6CB5" }} />
      </div>
    );
  }

  if (!user || !isTeacher) {
    // If user is not signed in or is not a teacher, redirect to signup page
    return <Navigate to="/signuppage" replace />;
  }

  // If user is signed in and is a teacher, render the protected content
  return children;
}
