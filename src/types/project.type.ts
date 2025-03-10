type Project = {
    uid: string;
    credits: Credit[];
    desc: string;
    detailed_desc: string;
    github?: string;
    goal: string;
    image: string;
    isFeatured: boolean;
    lang_frontend: Language[];
    lang_backend: Language[]; 
    name: string;
    status: "Success" | "WIP" | "Failed";
    time: number;
    type: "Desktop App" | "Web App" | "Android App";
    images?: string[];
    youtube?: string;
}
type Credit = {
    uid: string;
    id: string;
    role: string;
    fullname: string;
    github: string;
    image?: string;
    facebook?: string;

}
type Language = {
    uid: string;
    img: string;
    name: string;
    type: "db" | "lang"
}