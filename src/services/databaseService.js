import { db } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query,
  where 
} from 'firebase/firestore';

// Survey operations
export const createSurvey = async (surveyData) => {
  try {
    // Add a new document with a generated id
    const docRef = await addDoc(collection(db, "surveys"), {
      name: surveyData.name,
      topics: surveyData.topics,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding survey: ", error);
    throw error;
  }
};

export const getAllSurveys = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "surveys"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting surveys: ", error);
    throw error;
  }
};

export const getSurveyById = async (surveyId) => {
  try {
    const docRef = doc(db, "surveys", surveyId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Survey not found");
    }
  } catch (error) {
    console.error("Error getting survey: ", error);
    throw error;
  }
};

export const deleteSurvey = async (surveyId) => {
  try {
    // First get all questions for this survey
    const questionsSnapshot = await getDocs(
      query(collection(db, "questions"), where("surveyId", "==", surveyId))
    );
    
    // Delete all questions
    const deleteQuestions = questionsSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deleteQuestions);
    
    // Then delete the survey
    await deleteDoc(doc(db, "surveys", surveyId));
    return true;
  } catch (error) {
    console.error("Error deleting survey: ", error);
    throw error;
  }
};

// Question operations
export const addQuestion = async (surveyId, questionData) => {
  try {
    const docRef = await addDoc(collection(db, "questions"), {
      surveyId,
      question: questionData.question,
      buttons: questionData.buttons,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding question: ", error);
    throw error;
  }
};

export const getQuestionsForSurvey = async (surveyId) => {
  try {
    const q = query(
      collection(db, "questions"), 
      where("surveyId", "==", surveyId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting questions: ", error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    await deleteDoc(doc(db, "questions", questionId));
    return true;
  } catch (error) {
    console.error("Error deleting question: ", error);
    throw error;
  }
};