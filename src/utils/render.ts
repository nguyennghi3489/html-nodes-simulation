import type { TNode } from "../models/node";

export const getNodeElement = (type: TNode["type"]) => {
  switch (type) {
    case "Div":
      return "div";
    case "Input":
      return "input";
    case "Image":
      return "img";
    case "Button":
      return "button";
    default:
      return "div";
  }
};

export const nodeToCSS = (node: TNode): React.CSSProperties => {
  const baseStyles = {
    position: "absolute",
    left: `${node.x}px`,
    top: `${node.y}px`,
    width: `${node.width}px`,
    height: `${node.height}px`,
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
