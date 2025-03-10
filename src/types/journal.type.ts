import { Timestamp } from "firebase/firestore";

export interface IJournal{
    id?: string;
    title: string;
    content: string;
    createdAt?: string | Date | Timestamp;
    updatedAt?: string | Date | Timestamp;
    tags?: string[];
    image?: string;
    isFeatured?: boolean;
    isPublished?: boolean;
    isDraft?: boolean;
}