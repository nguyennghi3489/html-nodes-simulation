import { useContext } from "react";
import { NodeContext } from "../contexts/NodeContext";

export const useNodeContext = () => {
  const context = useContext(NodeContext);
  if (context === undefined) {
    throw new Error("useNodeContext must be used within a NodeProvider");
  }
  return context;
};
