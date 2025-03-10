"use-client";

import { Link as IconLink, Mail } from "lucide-react";
import Link from "next/link";
type footerType = {
  layout: "sidebar" | "full";
}
export default function Footer(props: footerType) {
  return (
    <div className={`w-full  p-8 flex ${props.layout == "sidebar" ? "flex-col gap-2 border-4 border-foreground" : "flex-row gap-8 border-t-8 border-t-foreground"}`}>
      <div className={`space-y-2 ${props.layout == "sidebar" ? "" : "pr-4 border-r-8 border-r-foreground w-full"}`}>
        <img src="/fw_logo.svg" className="w-[75%] max-w-[465px]" />
        <h3 className="text-lg">© 2024 Tieu Tri Quang</h3>
        <p>Just a lame porfolio.. Anyways, check out my links.</p>
      </div>
      <div className="flex gap-4 w-full">
        <div className="space-y-4 flex-1">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 border-4 border-foreground flex items-center justify-center">
              <IconLink />
            </div>
            <h2 className="text-3xl">Links</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <a
              className="font-display"
              href="https://drive.google.com/file/d/1xspXGoh53e_9wta6MkDCH3uddfMNP7g5/view?usp=sharing"
              target="_blank"
            > 
              résumé
            </a>
            <a
              className="font-display"
              href="https://www.linkedin.com/in/wuanggg/"
              target="_blank"
            >
              linkedin
            </a>
            <a
              className="font-display"
              href="https://bento.me/wuangg"
              target="_blank"
            >
              bento
            </a>
            <a
              className="font-display"
              href="https://github.com/wu4ngg"
              target="_blank"
            >
              github
            </a>
            <Link href="/team" className="font-display">team</Link>
            <Link href="/admin" className="font-display">🔒</Link>
          </div>
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 border-4 border-foreground flex items-center justify-center">
              <Mail />
            </div>
            <h2 className="text-3xl">Email</h2>
          </div>
          <div className="w-full">
            <a
              className="font-display"
              href="mailto:tri.quang2783@gmail.com"
              target="_blank"
            >
              tri.quang2783@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
