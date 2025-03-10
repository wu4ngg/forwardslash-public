import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import db from "../database";
import { IJournal } from "@/types/journal.type";

const database = db;
const projectCollection = "journal";
const userCollection = "users";

export async function uploadJournal(journal?: IJournal) {
    return await addDoc(collection(database, projectCollection), journal);
}

export async function getJournal(): Promise<IJournal[]> {
    const q = await query(
        collection(database, projectCollection),
        orderBy("createdAt", "desc"),
        where("isPublished", "==", true)
    );
    const res = await getDocs(q);
    if (res.empty) return [];
    return res.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data
        } as IJournal;
    });
}