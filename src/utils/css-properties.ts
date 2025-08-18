import { CSS_PROPERTIES } from "../constant/css-properties";
import type { TNode } from "../models/node";

export const getCSSPropertyValues = (property: string): string[] => {
  const found = CSS_PROPERTIES.find((prop) => prop.key === property);
  return found ? found.values : [];
};

export const getAllCSSProperties = (): string[] => {
  return CSS_PROPERTIES.map((prop) => prop.key);
};

export const getBuiltInProperties = (node: TNode) => [
  { key: "x", label: "Left", value: node.x, type: "number" },
  { key: "y", label: "Top", value: node.y, type: "number" },
  { key: "width", label: "Width", value: node.width, type: "text" },
  { key: "height", label: "Height", value: node.height, type: "text" },
  {
    key: "display",
    label: "Display",
    value: node.display || "block",
    type: "text",
  },
  {
    key: "background",
    label: "Background",
    value: node.background || "",
    type: "text",
  },
  {
    key: "color",
    label: "Color",
    value: node.color || "",
    type: "text",
  },
  {
    key: "border",
    label: "Border",
    value: node.border || "",
    type: "text",
  },
];

export const nodeToCSS = (node: TNode): React.CSSProperties => {
  const baseStyles = {
    position: "absolute",
    left: `${node.x}px`,
    top: `${node.y}px`,
    width: isNaN(Number(node.width)) ? node.width : `${node.width}px`,
    height: isNaN(Number(node.height)) ? node.height : `${node.height}px`,
    display: node.display || "block",
    backgroundColor: node.background,
    color: node.color,
    border: node.border,
  };

  // Merge extraCssProperties if they exist
  const extraStyles = node.extraCssProperties || {};

  return {
    ...baseStyles,
    ...extraStyles,
  } as React.CSSProperties;
};
