import { Button } from "@/components/ui/button";
interface Props {
  type: "reset" | "button" | "submit";
  size: {
    width: string;
    height: string;
  };
  label: string;
  buttonColor: string;
  textColor: string;
}
export const ButtonComponent = ({
  type,
  size,
  label,
  buttonColor,
  textColor,
}: Props) => {
  return (
    <>
      <Button
        className=" font-bold mt-6"
        type={type}
        style={{
          backgroundColor: buttonColor,
          width: size.width,
          height: size.height,
        }}
      >
        <text style={{ color: textColor }}>{label}</text>
      </Button>
    </>
  );
};
