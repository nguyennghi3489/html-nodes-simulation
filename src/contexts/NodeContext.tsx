import { createContext, useState, type ReactNode } from "react";
import type { TNode } from "../models/node";

interface NodeContextType {
  selectedNode: TNode | null;
  rootNode: TNode;
  setSelectedNode: (node: TNode | null) => void;
  updateNode: (nodeId: string, updates: Partial<TNode>) => void;
  setRootNode: (node: TNode) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NodeContext = createContext<NodeContextType | undefined>(
  undefined
);

interface NodeProviderProps {
  children: ReactNode;
  initialNode: TNode;
}

export const NodeProvider = ({ children, initialNode }: NodeProviderProps) => {
  const [rootNode, setRootNode] = useState<TNode>(initialNode);
  const [selectedNode, setSelectedNode] = useState<TNode | null>(null);

  const updateNodeRecursively = (
    node: TNode,
    nodeId: string,
    updates: Partial<TNode>
  ): TNode => {
    console.log("Updating node", node.id, "with updates", updates);
    if (node.id === nodeId) {
      const updatedNode = { ...node, ...updates };
      // Update selected node if it's the one being updated
      if (selectedNode?.id === nodeId) {
        setSelectedNode(updatedNode);
      }
      return updatedNode;
    }

    return {
      ...node,
      children: node.children.map((child) =>
        updateNodeRecursively(child, nodeId, updates)
      ),
    };
  };

  const updateNode = (nodeId: string, updates: Partial<TNode>) => {
    setRootNode((prevRoot) => updateNodeRecursively(prevRoot, nodeId, updates));
  };

  const value: NodeContextType = {
    selectedNode,
    rootNode,
    setSelectedNode,
    updateNode,
    setRootNode,
  };

  return <NodeContext.Provider value={value}>{children}</NodeContext.Provider>;
};
