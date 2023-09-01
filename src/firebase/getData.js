import firebase_app from "./config";
import { collection, getDocs,getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getAllDouments(collect) {

    let result = null;
    let error = null;

    try {
        result = await getDocs(collection(db,collect));
    } catch (e) {
        error = e;
    }

    return { result, error };
}
