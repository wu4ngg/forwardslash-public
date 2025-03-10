import { Metadata } from "next";
import JournalPage from "./page1";
export async function generateMetadata(): Promise<Metadata> {
  // read route params 
  return {
    title: "Journal - Fowardslash",
    description: "I post random stuff here and you can too!"
  }
}
export default function JournalPageWrapper() {
    return <JournalPage/>
}