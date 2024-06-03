import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


  export const findTeacher = async (userId) => {
    try {
        // Use the userId to reference the correct document in the teachers collection
        const docRef = doc(db, "teachers", userId);
        // Get the document data
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Teacher found:", docSnap.data());
            // Return true and the document data if teacher found
            return {
                found: true,
                data: docSnap.data(),
            };
        } else {
            console.log("Teacher not found for userId:", userId);
            // Return false if the document does not exist
            return {
                found: false,
                data: null,
            };
        }
    } catch (error) {
        console.error("Error finding teacher:", error);
        throw error; // Throw the error to let the caller handle it
    }
  };
  
  
  export const findStudent = async (userId) => {
    try {
        // Use the userId to reference the correct document in the students collection
        const docRef = doc(db, "students", userId);
        // Get the document data
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Student found:", docSnap.data());
            // Return true and the document data if student found
            return {
                found: true,
                data: docSnap.data(),
            };
        } else {
            console.log("Student not found for userId:", userId);
            // Return false if the document does not exist
            return {
                found: false,
                data: null,
            };
        }
    } catch (error) {
        console.error("Error finding student:", error);
        throw error; // Throw the error to let the caller handle it
    }
  };

  export const findUser = async () => {
    try {
      // Get authentication instance
      const auth = getAuth();
  
      // Get current user
      const currentUser = auth.currentUser;
  
      // Check if user is authenticated
      if (currentUser) {
        return currentUser.uid;
      } else {
        return null; // Return null if user is not authenticated
      }
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  };
  
export const addAccount = async (userId, account, accountType) => {
  try {
      // Define the collection name based on the accountType
      let collectionName;
      if (accountType === "student") {
          collectionName = "students";
      } else if (accountType === "teacher") {
          collectionName = "teachers";
      } else {
          throw new Error("Invalid accountType provided.");
      }
      
      // Reference the collection
      const collectionRef = collection(db, collectionName);
      
      // Check if the document already exists
      const userDoc = await getDoc(doc(collectionRef, userId));
      if (userDoc.exists()) {
          throw new Error(`User with ID ${userId} already has an account.`);
      }
  
      // Set the account document with the userId as the document ID
      await setDoc(doc(collectionRef, userId), {
          userId,
          ...account
      });
  
      console.log(`New account created for user ID: ${userId} in ${collectionName} collection.`);
  
      return userId;
  } catch (error) {
      console.error("Error creating/updating account:", error);
      throw error;
  }
};

  

