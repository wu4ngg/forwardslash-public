import { Check } from "lucide-react";
import { InputHTMLAttributes } from "react";
interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export default function CheckBox(props: CheckBoxProps) {
  return (
    <div>
      <label
        className={`flex items-center gap-2 relative group ${
          props.disabled ? "opacity-50 hover:outline-1" : ""
        }`}
      >
        <Check
          className="text-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 group-has-[input:checked]:opacity-100 group-has-[input:checked]:scale-100 transition-all"
          width={16}
          height={16}
        />
        <input
          type="checkbox"
          className="appearance-none"
          {...props}
        />
      </label>
    </div>
  );
}
