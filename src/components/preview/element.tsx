import type { TNode } from "../../models/node";
import { getNodeElement, nodeToCSS } from "../../utils/render";
import { useNodeContext } from "../../hooks/useNodeContext";
import "./element.scss";

interface Props {
  node: TNode;
}
export const Element = ({ node }: Props) => {
  const BaseComponent = getNodeElement(node.type);
  const style = nodeToCSS(node);

  const { selectedNode, setSelectedNode } = useNodeContext();
  const isSelected = selectedNode?.id === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(node);
  };

  const className = `preview-element ${
    isSelected ? "preview-element--selected" : ""
  }`;

  if (["Div"].includes(node.type)) {
    return (
      <BaseComponent style={style} onClick={handleClick} className={className}>
        {node.children &&
          node.children.map((child) => <Element key={child.id} node={child} />)}
      </BaseComponent>
    );
  }

  return (
    <BaseComponent
      style={style}
      value={node.name}
      onClick={handleClick}
      className={className}
    />
  );
};
