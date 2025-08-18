export type TNode = {
  id: string;
  x: number;
  y: number;
  name: string;
  type: "Div" | "Input" | "Image" | "Button";
  width: number | string;
  height: number | string;
  display?: string;
  text?: string;
  background?: string;
  color?: string;
  border?: string;
  children: TNode[];
  extraCssProperties?: Record<string, string>;
};
