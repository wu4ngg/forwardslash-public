"use server";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project";
import SideHeader from "@/components/side_header";
import { getAllProjects } from "@/firebase/firestore/repositories/project_repo";
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
): Promise<Metadata> {
  // read route params
  return {
    title: "Projects - Fowardslash",
    description:
      "Here lies all the projects that I've made from school project to small personal project. Each project reflects my learning journey, creativity and passion for programming.",
  };
}
export default async function ProjectPage() {
  const projects: Project[] = await getAllProjects();
  return (
    <>
      <div className="pr-8 flex mb-8">
        <SideHeader text="Projects." />
        <div className="flex-1 pl-8 space-y-4">
          <p>
            Here lies all the projects that I've made from school project to
            small personal project. Each project reflects my learning journey,
            creativity and passion for programming.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.uid} {...project} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer layout="full" />
    </>
  );
}
