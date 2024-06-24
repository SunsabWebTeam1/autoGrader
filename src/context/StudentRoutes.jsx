import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { findStudent } from "../services/AccountService";
import { UserAuth } from "./AuthContext";

export function StuProtected({ children }) {
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
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress color="inherit" sx={{ color: "#244431" }} />
      </div>
    );
  }

  if (!user || !isStudent) {
    return <Navigate to="/signuppage" replace />;
  }

  return children;
}
