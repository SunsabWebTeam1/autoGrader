import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addAssignment = async (teacherId, assignment) => {
    try {
        const assignmentsCollection = collection(db, 'assignments');
        await addDoc(assignmentsCollection, { ...assignment, teacherId });
    } catch (error) {
        console.error("Error creating/updating assignment:", error);
        throw error;
    }
};