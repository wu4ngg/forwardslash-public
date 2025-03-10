import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import db from "../database";

const database = db;
const projectCollection = "projects";
const userCollection = "users";
export async function getFeaturedProjects() {
  const q = await query(
    collection(database, projectCollection),
    where("isFeatured", "==", true)
  );
  const res = await getDocs(q);
  if (res.empty) return [];
  return res.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data(),
    } as Project;
  });
}
export async function getAllProjects() {
  const q = await query(
    collection(database, projectCollection),
    orderBy("isFeatured", "desc")
  );
  const res = await getDocs(q);
  if (res.empty) return [];
  return res.docs.map((doc) => {
    return {
      uid: doc.id,
      ...doc.data(),
    } as Project;
  });
}
export async function getAProject(id: string) {
  const ref = doc(database, projectCollection, id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = {
      uid: snap.id,
      ...snap.data(),
    } as Project;
    for (const credit of data.credits) {
      const userRef = doc(database, userCollection, credit.id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        credit.fullname = userSnap.data().fullname;
        credit.facebook = userSnap.data().facebook;
        credit.image = userSnap.data().image;
        credit.github = userSnap.data().github;
      } else {
        credit.image = "";
        credit.fullname = `Unknown Contributor (${credit.id})`;
      }
    }
    return data;
  } else {
    return null;
  }
}
