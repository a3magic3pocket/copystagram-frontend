import { SizeProp } from "@fortawesome/fontawesome-svg-core";

declare global {
  interface IIconProps {
    className?: string;
    size?: SizeProp;
  }
}
