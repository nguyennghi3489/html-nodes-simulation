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
