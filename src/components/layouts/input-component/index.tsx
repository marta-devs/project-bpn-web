import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface Props extends React.ComponentProps<"input">{
  id: string
  label: string
  error: any;
  className?: string;
}
export const InputComponent = ( props: Props) => {
  return (
    <div className="mb-1">
    <label htmlFor={props.id} className="font-bold text-sm">
      {props.label}
    </label>
      <Input
        {...props}
        id={props.id}
        className={
          cn("w-full rounded-sm border-1 mt-2",
             props.className
          )
        }
        aria-invalid={!!props.error}
      />

      {props.error && (
        <span className="text-red-500 text-xs">{props.error?.message}</span>
      )}
    </div>
  );
};
