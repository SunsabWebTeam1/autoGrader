import { addDoc, collection, doc, getDoc, setDoc, } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const addAssignment = async (teacherId, assignment) => {
    try {
        const assignmentsCollection = collection(db, 'assignments');
        const assignmentDocRef = await addDoc(assignmentsCollection, { ...assignment, teacherId });
        return assignmentDocRef.id;
    } catch (error) {
        console.error("Error creating/updating assignment:", error);
        throw error;
    }
};

export const getAssignment = async (studentId) => {
    try {
        const assignmentRef = doc(db, 'assignments', studentId);
        const docSnap = await getDoc(assignmentRef);
        if (docSnap.exists()) {
            console.log("Assignment found:", docSnap.data());
            return {
                data: docSnap.data()
            };
        } else {
            console.log("Assignment not found for userId:",)
            return{
                data: null
            }
        }
    }
    catch (error) {
        console.error("Error creating/updating assignment:", error);
        throw error;
    }
}

export const addStudentToAssignment = async (assignmentId, studentId, grade = null) => {
    try {
        const assignmentRef = doc(db, 'assignments', assignmentId);
        const studentsCollectionRef = collection(assignmentRef, 'students');
        await setDoc(doc(studentsCollectionRef, studentId), { grade });
        console.log(`Student ${studentId} added to assignment ${assignmentId} successfully.`);
    } catch (error) {
        console.error("Error adding student to assignment:", error);
        throw error;
    }
};
export const getStudentAssignment = async (studentId) => {
    try {
        const assignmentsCollection = collection(db, 'assignments');
        const assignmentsSnapshot = await getDoc(assignmentsCollection);
        const studentAssignments = [];

        for (const assignmentDoc of assignmentsSnapshot.docs) {
            const studentsCollectionRef = collection(assignmentDoc.ref, 'students');
            const studentDocRef = doc(studentsCollectionRef, studentId);
            const studentDocSnap = await getDoc(studentDocRef);

            if (studentDocSnap.exists()) {
                studentAssignments.push({
                    assignmentId: assignmentDoc.id,
                    ...assignmentDoc.data()
                });
            }
        }

        if (studentAssignments.length > 0) {
            return studentAssignments;
        } else {
            console.log("No assignments found for studentId:", studentId);
            return [];
        }
    } catch (error) {
        console.error("Error retrieving student assignments:", error);
        throw error;
    }
};