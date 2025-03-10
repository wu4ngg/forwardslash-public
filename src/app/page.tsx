"use server";
import Footer from "@/components/footer";
import SidebarRight, { SidebarLeft } from "@/components/home-page";
import ProjectTabs from "@/components/project_tabs";
import { getFeaturedProjects } from "@/firebase/firestore/repositories/project_repo";
import { Metadata } from "next";
type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(): Promise<Metadata> {
  // read route params 
  return {
    title: "Home Page - Fowardslash",
    description: "I am a senior undergraduate of HUFLIT that is set to graduate in Feb 2024 with a GPT of 3.67 (9.1). I used to be an intern in ATS Vietnam, working with various ERP platforms like ODOO and SAP, as well as researching and developing automation solutions for business based on AI. Despite working with ERP in my internship, I am more interested in web technologies and mobile frameworks such as React and Flutter as I have more experience working with such technologies. I have built several project in my college years, most of them received critical acclaim and high scores, projects such as WellMate and Jobsift are my best ones yet."
  }
}
export default async function Home() {
  const projects: Project[] = await getFeaturedProjects();
  console.log(projects);
  return (
    <div className="flex gap-8 flex-1">
      <SidebarLeft />
      <SidebarRight projects={projects} />
    </div>
  );
}
