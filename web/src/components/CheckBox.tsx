import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface CheckBoxProps extends Checkbox.CheckboxProps {
  label: string
  checked?: boolean
  size?: 'normal' | 'large'
}

export function CheckBox({ label, checked = false, size = 'normal', ...rest }: CheckBoxProps) {
  return (
    <Checkbox.Root checked={checked} className="flex items-center gap-3 group focus:outline-none" {...rest}>
      <div className="w-8 h-8 bg-zinc-900 border 2 border-zinc-800 rounded-lg flex items-center justify-center transition-colors group-data-[state=checked]:bg-green-500">
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </div>
      <span className={`font-semibold ${size === 'normal' ? 'text-base' : 'text-xl'} text-white leading-tight`}>
        {label}
      </span>
    </Checkbox.Root >
  )
}