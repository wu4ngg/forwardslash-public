"use client";
import { projectTypeDictionary } from "@/utils/dictionary";
import Button from "@/widgets/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Chip from "@/widgets/chip";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import { HTMLMotionProps, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import * as Avatar  from "@radix-ui/react-avatar";
import { SiFacebook } from "@icons-pack/react-simple-icons";
type ProjectCardProps = Project & {
  index: number;
};
export function ProjectPageBody({ project }: { project: Project }) {
  return (
    <motion.div
      animate={{ y: [-100, 0], opacity: [0, 1] }}
      transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.15 }}
      className="space-y-4 pl-8"
    >
      <div className="flex w-full gap-4">
        <div className="space-y-4 flex-1">
          <h4>Technologies</h4>
          <div className="flex gap-4 flex-wrap">
            {project &&
              project.lang_frontend.map((l) => (
                <Chip key={l.name}>
                  <img src={l.img} className="w-6 h-6 object-contain" />
                  <p>{l.name}</p>
                </Chip>
              ))}
            <div className="border-l-4 border-l-foreground self-stretch" />
            {project &&
              project.lang_backend.map((l) => (
                <Chip key={l.name}>
                  <img src={l.img} className="w-6 h-6 object-contain" />
                  <p>{l.name}</p>
                </Chip>
              ))}
          </div>
          <div className="w-full flex gap-4">
            <div className="flex-1">
              <h4>Goals</h4>
              <p>{project.goal || "Not found"}</p>
            </div>
            <div className="flex-1">
              <h4>Duration</h4>
              <p>{project.time || "Not found"} months</p>
            </div>
          </div>
        </div>
        <div className="border-l-8 border-l-foreground self-stretch" />
        <div className="space-y-4 flex-1">
          <h4>Team ({project.credits.length} members)</h4>
          <table className="w-full border-4 border-foreground">
            <tbody>
              {project.credits.map((credit) => (
                <tr
                  key={credit.id}
                  className="w-20 hover:bg-foreground_hex/25 transition-colors"
                >
                  <td className="p-4">
                    <Avatar.Root className="block w-16 h-16">
                      <Avatar.Image
                        src={credit.image}
                        className="rounded-full w-16 h-16 flex items-center justify-center border-2 border-foreground object-cover"
                      />
                      <Avatar.Fallback className="rounded-full w-16 h-16 flex items-center justify-center border-2 border-foreground">
                        {credit.fullname
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .replace(/[^a-zA-Z ]/g, "")}
                      </Avatar.Fallback>
                    </Avatar.Root>
                  </td>
                  <td className="px-2">{credit.fullname}</td>
                  <td className="px-2">{credit.role}</td>
                  <td className="p-4">
                    <div className="flex gap-2 items-center h-full">
                      {credit.github && (
                        <a href={credit.github} target="_blank">
                          <SiGithub size={24} />
                        </a>
                      )}
                      {credit.facebook && (
                        <a href={credit.facebook} target="_blank">
                          <SiFacebook size={24} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h4>Project images</h4>
      {project && project.images ? (
        <div className="flex gap-4 items-center overflow-auto w-full">
          {project.images.map((img, index) => (
            <img src={img} key={index} className="h-[480px]" />
          ))}
        </div>
      ) : (
        <p>No images found</p>
      )}
      <h4>Description</h4>
      <p>{project && project.detailed_desc}</p>
      <div className="w-full flex gap-2"></div>
    </motion.div>
  );
}
export function ProjectPageHeader({ project }: { project: Project }) {
  return (
    <motion.div
      animate={{ y: [-100, 0], opacity: [0, 1] }}
      transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.1 }}
      className="w-full border-b-8 border-b-foreground px-8 py-4 flex gap-4 items-center"
    >
      <div className="flex-1 flex gap-4 items-center pr-2">
        <img
          src={project ? project.image : ""}
          alt={project ? project.name : ""}
          className="aspect-video-vertical w-32 bg-foreground object-contain p-4"
        />
        <div className="space-y-4 flex-1">
          <div className="w-full">
            <h2 className="leading-none break-words w-full">
              {project && project.name}
            </h2>
            <p>{project && project.desc}</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            {project && project.youtube && (
              <a
                target="_blank"
                className="self-start"
                href={project ? project.youtube : ""}
              >
                <Button variant="outlined" className="border-4">
                  <SiYoutube size={16} />
                  Video Demo
                  <ExternalLink size={16} />
                </Button>
              </a>
            )}
            {(project &&
              (project.github == "private" ||
                project.github == "" ||
                !project.github)) || (
              <a
                target="_blank"
                className="self-start"
                href={project ? project.github : ""}
              >
                <Button
                  variant="outlined"
                  className="border-4"
                  disabled={
                    project
                      ? project.github == "private" ||
                        project.github == "" ||
                        !project.github
                      : true
                  }
                >
                  <SiGithub size={16} />
                  Source code
                  <ExternalLink size={16} />
                </Button>
              </a>
            )}
            <Chip className="justify-self-start">
              <>
                {project ? projectTypeDictionary[project.type].icon : "?"}
                <p>{project ? project.type : "?"}</p>
              </>
            </Chip>
            <Chip>
              <>
                <p>{project ? project.status : "?"}</p>
              </>
            </Chip>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
export default function ProjectCard(props: ProjectCardProps) {
  return (
    <motion.div
      animate={{ y: [-10 - props.index * 10, 0], opacity: [0, 1] }}
      transition={{
        duration: 0.4,
        ease: ["backOut"],
        delay: props.index * 0.01,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.015, y: -5 }}
        whileTap={{ scale: 0.985, y: 0 }}
        transition={{ duration: 0.4, ease: ["circOut"] }}
      >
        <Link
          href={`/project/${props.uid}`}
          key={props.uid}
          className="border-4 border-foreground flex cursor-pointer hover:shadow-lg transition-shadow no-underline hover:bg-transparent hover:text-foreground duration-300"
        >
          <img
            src={props.image}
            alt={props.name}
            className="drop-shadow-lg w-32 object-contain p-4 bg-foreground"
          />
          <div className="space-y-4 p-4">
            <h3 className="text-xl">{props.name}</h3>
            <p className="line-clamp-2">{props.detailed_desc}</p>
            <div className="flex gap-4 items-center">
              {projectTypeDictionary[props.type].icon}
              <p>{props.type}</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              {props.lang_frontend.map((l) => (
                <Chip key={l.name}>
                  <img src={l.img} className="w-6 h-6 object-contain" />
                </Chip>
              ))}
              <div className="border-l-4 border-l-foreground self-stretch" />
              {props.lang_backend.map((l) => (
                <Chip key={l.name}>
                  <img src={l.img} className="w-6 h-6 object-contain" />
                </Chip>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
