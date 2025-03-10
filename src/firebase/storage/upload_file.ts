import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  UploadResult,
} from "firebase/storage";
import { app } from "../config";
const storage = getStorage(app);
export function uploadFile(
  onUploadComplete: (url: string) => void,
  onUploadStageChange: (progress: number) => void,
  onError?: (error: Error) => void,
  file?: File
) {
  if (!file) throw new Error("File is required");
  const storageRef = ref(storage, `images/${file!.name}${Date.now()}`);
  const uploadTask = uploadBytesResumable(storageRef, file!);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onUploadStageChange(progress);
    },
    (error) => {
      onError && onError(error);
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onUploadComplete(downloadURL);
      });
    }
  );
}
