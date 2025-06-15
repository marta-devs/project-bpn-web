import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  size?: number;
  placeHolder: string;
  width: string;
  height: string;
}
export const InuptComponent = ({
  name,
  size,
  placeHolder,
  width,
  height,
}: Props) => {
  return (
    <div>
      <Input
        placeholder={placeHolder}
        size={size}
        className="rounded-sm border-1 mt-2 mb-6"
        style={{ width: width, height: height }}
        name={name}
      />
    </div>
  );
};
