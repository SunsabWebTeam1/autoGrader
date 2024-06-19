import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { findTeacher } from "../../../services/AccountService";
import "../../../styling/teacher-pages.css";

function TeacherHeader() {
    const { user } = UserAuth();
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            findTeacher(user.uid)
                .then((result) => {
                    if (result.found) {
                        setFirstName(result.data.firstName);
                    }
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
        return <p>Loading...</p>;
    }

    return (
        <div id="teacher-header" className="teacher-header">
            <h1>Welcome to the AutoGrader, {firstName}</h1>
        </div>
    );
}

export default TeacherHeader;
