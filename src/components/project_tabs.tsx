"use client";
import Button from "@/widgets/button";
import Chip from "@/widgets/chip";
import Tab from "@/widgets/tab";
import { SiGithub } from "@icons-pack/react-simple-icons";
import * as Tabs from "@radix-ui/react-tabs";
import {
  ChevronRight,
  TextSearch,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectTabs(props: { projects: Project[] }) {
  const [defaultValue, setDefaultValue] = useState<string>(
    props.projects[0].uid
  );
  return (
    <Tabs.Root
      onValueChange={setDefaultValue}
      value={defaultValue}
      className="flex flex-col gap-4"
    >
      <Tabs.List className="flex gap-4">
        {props.projects.map((e) => (
          <Tab
            key={e.uid}
            isnotbutton="true"
            value={e.uid}
            selected={e.uid == defaultValue}
            alignment="start"
          >
            {e.name}
          </Tab>
        ))}
        <Link className="no-underline hover:bg-transparent hover:text-foreground" href="/projects">
          <Tab alignment="start" selected={false}>
            All projects
          </Tab>
        </Link>
      </Tabs.List>
      {props.projects.map((e) => {
        return (
          <Tabs.Content
            key={e.uid}
            value={e.uid}
            className="space-y-4 data-[state='active']:opacity-100 data-[state='inactive']:opacity-0 transition-opacity"
          >
            <div className="p-4 bg-foreground rounded-lg w-fit">
              <img
                src={e.image}
                alt={e.name}
                className="h-16 object-cover drop-shadow-lg"
              />
            </div>
            <h3 className="text-4xl font-bold">{e.name}</h3>
            <p className="pl-4 border-l-8 border-l-foreground">
              {e.detailed_desc}
            </p>
            <div className="flex gap-4 items-center flex-wrap">
              {e.lang_frontend.map((l) => (
                <Chip key={l.name}>
                  <img
                    src={l.img}
                    alt={l.name}
                    className="h-4 w-4 object-contain"
                  />
                  <p>{l.name}</p>
                </Chip>
              ))}
              <div className="border-l-4 border-l-foreground self-stretch" />
              {e.lang_backend.map((l) => (
                <Chip key={l.name}>
                  <>
                    <img
                      src={l.img}
                      alt={l.name}
                      className="h-4 w-4 object-contain"
                    />
                    <p>{l.name}</p>
                  </>
                </Chip>
              ))}
            </div>
            <div className="flex gap-4">
              <a className="self-start" href={e.github}>
                <Button
                  variant="outlined"
                  className="border-4"
                  disabled={
                    e.github == "private" || e.github == "" || !e.github
                  }
                >
                  <SiGithub size={16} />
                  Source code
                  <ChevronRight size={16} />
                </Button>
              </a>
              <Link href={`/project/${e.uid}`}>
                <Button variant="outlined" className="border-4">
                  <TextSearch size={16} />
                  More details
                  <ChevronRight size={16} />
                </Button>
              </Link>
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
