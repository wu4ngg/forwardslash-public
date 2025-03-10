"use server";
import * as Avatar from "@radix-ui/react-avatar";
import Footer from "@/components/footer";
import SideHeader from "@/components/side_header";
import { getAProject } from "@/firebase/firestore/repositories/project_repo";
import { projectTypeDictionary } from "@/utils/dictionary";
import Button from "@/widgets/button";
import Chip from "@/widgets/chip";
import ErrorView from "@/widgets/error-view";
import {
  SiFacebook,
  SiGithub,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { motion } from "framer-motion";
import { ProjectPageBody, ProjectPageHeader } from "@/components/project";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug
  const project = await getAProject(slug);
  return {
    title: project ? project?.name : "Invalid project",
    description: project ? project?.desc : "The project that you're trying to find is either deleted or invalid.",
    openGraph: {
      images: [
        project ? project.image : "https://via.placeholder.com/1200x630",
      ]
    }
  }
  return {};
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;
  const project = await getAProject(id);
  return (
    <>
      <div className="flex mb-8">
        <SideHeader text={project ? "Overview." : "got lost?  "} />
        {project ? (
          <div className="space-y-4 pr-8 flex-1">
            <ProjectPageHeader project={project} />
            <ProjectPageBody project={project} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <ErrorView
              emoticon="¯\_(ツ)_/¯"
              title="Project not found."
              message="The project that you're trying to find is either deleted or invalid."
            />
          </div>
        )}
      </div>
      <Footer layout="full" />
    </>
  );
}
