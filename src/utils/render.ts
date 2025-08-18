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

export const wrapInRootNode = (nodes: TNode[]): TNode => {
  return {
    id: "root",
    type: "Div",
    name: "ROOT_NODE",
    children: nodes,
    isReadOnly: true,
    x: 0,
    y: 0,
    width: "100%",
    height: "100%",
  };
};
