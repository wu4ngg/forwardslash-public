export default function Chip(props: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
    return <div style={props.style} className={`flex gap-4 p-2 border-4 border-foreground items-center [&_img]:bg-foreground [&_img]:p-1 ${props.className}`}>{props.children}</div>
}