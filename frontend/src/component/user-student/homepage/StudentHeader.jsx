import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { findStudent } from "../../../services/AccountService";
import "../../../styling/student-pages.css";

function StudentHeader() {
    const { user } = UserAuth();
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            findStudent(user.uid)
                .then((result) => {
                    if (result.found) {
                        setFirstName(result.data.firstName);
                    }
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
        return <p>Loading...</p>;
    }

    return (
        <div id="student-header" className="student-header">
            <h1>Welcome to the AutoGrader, {firstName}</h1>
        </div>
    );
}

export default StudentHeader;
