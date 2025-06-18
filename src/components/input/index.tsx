import React from "react";
import { Input } from "@/components/ui/input";
interface Props {
  type: string;
  placeHolder: string;
  width: string;
  height: string;
  register: any;
}
export const InuptComponent = ({
  type,
  placeHolder,
  width,
  height,
  register,
}: Props) => {
  return (
    <>
      <Input
        {...register}
        type={type}
        placeholder={placeHolder}
        className="rounded-sm border-1 mt-2 mb-6"
        style={{ width: width, height: height }}
      />
    </>
  );
};
