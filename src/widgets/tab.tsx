'use client'
import * as Tb from '@radix-ui/react-tabs';

interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
    selected: boolean;
    alignment: 'center' | 'start' | 'end';
    isnotbutton?: boolean | string;
    value?: string;
}
export default function Tab(props: TabProps) {
    return !props.isnotbutton ? <button {...props} className={`flex flex-col group items-${props.alignment} ${props.className}`}>
        {props.children}
        <div className={`tab-underline border-b-4 border-foreground ${props.selected ? 'w-full' : 'w-0'} group-hover:w-full group-active:w-[90%] transition-all`}></div>
    </button> : <Tb.Trigger value={props.value || ''} {...props} className={`flex flex-col group items-${props.alignment} ${props.className}`}>
        {props.children}
        <div className={`tab-underline border-b-4 border-foreground ${props.selected ? 'w-full' : 'w-0'} group-hover:w-full group-active:w-[90%] transition-all`}></div>
    </Tb.Trigger>
}