import {db} from "../firebase/firebase"
import { collection, setDoc, getDoc, getDocs, query,doc, where, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const addAssignment = async (title, description, assignmentId, teacherId, apiRequest) => {
    try {
      // Add a new document to the "assignments" collection
      await db.collection("assignments").add({
        title: title,
        description: description,
        assignmentId: assignmentId,
        teacherId: teacherId,
        apiRequest: apiRequest,
      });
      console.log("Assignment added successfully");
    } catch (error) {
      console.error("Error adding assignment: ", error);
      throw error;
    }
  };