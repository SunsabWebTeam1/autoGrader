import { db } from "../firebase/firebase";
import { collection, setDoc, getDoc, getDocs, query,doc, where, addDoc } from "firebase/firestore";

export const getAccount = async (userId) => {
    try {
      // Use the userId to reference the correct document in the accounts collection
      const docRef = getDoc(db, "accounts", userId);
      // Get the document data
      const docSnap = await getDoc(docRef);
      // Return the document data
      return docSnap.data();
    } catch (error) {
      console.error(error);
      throw error; // It's usually better to throw the error to let the caller handle it
    }
  }


  export const addAccount = async (userId, account, accountType) => {
    try {
      // Define the collection name based on the accountType
      const collectionName = accountType === "student" ? "students" : "teachers";
      
      // Reference the collection
      const collectionRef = collection(db, collectionName);
  
      // Add the account document to the collection
      await addDoc(collectionRef, {
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
  


  export const editAccount = async(userId, account) => {
    try{
        const itemCol = collection(db, `users/${userId}/accounts`);
        const docRef = await setDoc(itemCol, account);
        return docRef.id;
    }
    catch(error){
        console.log(error);
    }
}