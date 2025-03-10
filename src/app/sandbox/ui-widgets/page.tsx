'use client'
import { useToast } from "@/components/toast";
import Button from "@/widgets/button";
import CheckBox from "@/widgets/checkbox";
import { Dialog } from "@/widgets/dialog";
import { DropdownMenu, DropdownMenuItem } from "@/widgets/dropdown_menu";
import Loader from "@/widgets/loader";
import ProgressBar from "@/widgets/progress-bar";
import Tab from "@/widgets/tab";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
function ProgressBarDemo() {
    const [progress, setProgress] = useState(0);
    const randomProgress = () => {
        setProgress(Math.floor(Math.random() * 100));
    }
    useEffect(() => {
        setInterval(randomProgress, 1000);
    }, [])
    return <ProgressBar progress={progress}></ProgressBar>
}
export default function UIWidget() {
  const { toast } = useToast();
  return (
    <div className="space-y-4 px-8 pb-8">
      <h1>UI Widgets and Components</h1>
      <p>
        UI Widgets are reusable components that can be used in different parts
        of the application
      </p>
      <h2>Typography</h2>
      <div className="space-y-4 p-4 border-4 border-foreground">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Paragraph</p>
      </div>
      <h2>Buttons</h2>
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outlined">Outlined</Button>
      </div>
      <div className="flex gap-4">
        <Button disabled variant="primary">
          Disabled Primary
        </Button>
        <Button disabled variant="secondary">
          Disabled Secondary
        </Button>
        <Button disabled variant="outlined">
          Disabled Outlined
        </Button>
      </div>
      <h2>Tabs</h2>
      <div className="flex gap-4">
        <Tab selected alignment="start">
          Tab Enabled Start
        </Tab>
        <Tab selected alignment="center">
          Tab Enabled Center
        </Tab>
        <Tab selected alignment="end">
          Tab Enabled End
        </Tab>
      </div>
      <div className="flex gap-4">
        <Tab selected={false} alignment="start">
          Tab Start
        </Tab>
        <Tab selected={false} alignment="center">
          Tab Center
        </Tab>
        <Tab selected={false} alignment="end">
          Tab End
        </Tab>
      </div>
      <h2>Inputs</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Text Input"
          className="border border-foreground p-2"
        />
        <input
          type="password"
          placeholder="Password Input"
          className="border border-foreground p-2"
        />
        <input
          type="number"
          placeholder="Number Input"
          className="border border-foreground p-2"
        />
      </div>
      <div className="flex gap-4">
        <textarea className="w-full" placeholder="Textarea" />
      </div>
      <h2>Checkboxes</h2>
      <div className="flex gap-4">
        <CheckBox type="checkbox" label="Checkbox" />
        <CheckBox type="checkbox" checked />
        <CheckBox type="checkbox" disabled />
        <CheckBox type="checkbox" checked disabled />
      </div>
      <h2>Progress Indicators</h2>
      <Loader />
      <ProgressBarDemo></ProgressBarDemo>
      <h2>Toasts</h2>
      <Button variant="primary" onClick={() => toast(Math.random().toString(), "This is a long long long long long long long long long long long long long long long long long long long long message", "success")}>Toast</Button>
      <h2>Dialogs</h2>
      <Dialog title="Dialog Title" description="Dialog Description" trigger={<Button variant="primary">Open Dialog</Button>}>
      <p>Hi</p></Dialog>
      <h2>Dropdown Menu</h2>
      <DropdownMenu trigger={<Button variant="primary">Dropdown Menu</Button>}>
        <DropdownMenuItem>
          <Trash size={16}/>
          Item 1</DropdownMenuItem>
        <DropdownMenuItem>
          <Plus size={16}/>
          Item 2</DropdownMenuItem>
        <DropdownMenuItem>
          <Edit size={16}/>
          Item 3</DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}
