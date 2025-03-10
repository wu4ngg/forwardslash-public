import Button from "@/widgets/button";
import ErrorView from "@/widgets/error-view";
import Link from "next/link";

export default function Custom404() {
    return <div className="flex items-center flex-col gap-4 justify-center h-full flex-1">
        <ErrorView emoticon=":/" title="Looks like you're lost..." message="This is awkward... uhh click the button below to go home. I guess..."/>
        <Link href="/" className="no-underline hover:bg-transparent">
            <Button variant="secondary">Go home</Button>
        </Link>
    </div>
}