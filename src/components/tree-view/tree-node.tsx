import { useState, type ReactNode } from "react";
import type { TNode } from "../../models/node";
import { useNodeContext } from "../../hooks/useNodeContext";
import { TreeToggle } from "../ui/tree-toggle";
import "./tree-node.scss";

interface TreeNodeItemProps {
  children: ReactNode;
  isSelected?: boolean;
  isClickable?: boolean;
  level?: number;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const TreeNodeItem = ({
  children,
  isSelected = false,
  level = 0,
  onClick,
  className = "",
}: TreeNodeItemProps) => {
  const baseClass = "tree-node__item";
  const levelClass =
    level % 2 === 0 ? `${baseClass}--even` : `${baseClass}--odd`;
  const selectedClass = isSelected ? `${baseClass}--selected` : "";

  const combinedClassName = `${baseClass}  ${levelClass} ${selectedClass} ${className}`;

  return (
    <div className={combinedClassName} onClick={onClick}>
      {children}
    </div>
  );
};

interface Props {
  node: TNode;
  level?: number;
}

export const TreeNode = ({ node, level = 0 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { selectedNode, setSelectedNode } = useNodeContext();
  const hasChildren = node.children && node.children.length > 0;
  const indent = level * 20;
  const isSelected = selectedNode?.id === node.id;

  const toggleExpanded = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(node);
  };

  return (
    <div className="tree-node__container" style={{ marginLeft: `${indent}px` }}>
      <TreeNodeItem
        isSelected={isSelected}
        level={level}
        onClick={handleNodeClick}
      >
        {hasChildren && (
          <TreeToggle
            isExpanded={isExpanded}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
          />
        )}
        <span className="tree-node__type">{node.type}</span>
        <span className="tree-node__name">{node.name}</span>
        {node.text && <span className="tree-node__text">"{node.text}"</span>}
      </TreeNodeItem>

      {hasChildren && isExpanded && (
        <div className="tree-node__children">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
