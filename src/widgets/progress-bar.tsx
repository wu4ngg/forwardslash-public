type ProgressBarProps = {
    progress?: number;
}
export default function ProgressBar(props: ProgressBarProps) {
    return <div className="w-full h-4 border-4 border-foreground">
        <div className="h-full bg-foreground transition-all ease-in-out duration-500" style={{ width: `${props.progress}%` }} />
    </div>
}