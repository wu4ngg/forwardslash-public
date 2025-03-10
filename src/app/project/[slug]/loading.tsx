import Loader from "@/widgets/loader"
import { Loader2 } from "lucide-react"

export default function Loading() {
    return <div className="flex-1 flex justify-center items-center gap-4">
        <Loader/>
        <p>Loading....</p>
    </div>
}