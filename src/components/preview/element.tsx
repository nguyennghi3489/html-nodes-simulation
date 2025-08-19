import type { TNode } from "../../models/node";
import { getNodeElement } from "../../utils/render";
import { nodeToCSS } from "../../utils/css-properties";
import { useNodeContext } from "../../hooks/useNodeContext";
import { Draggable } from "../ui/draggable";
import "./element.scss";

interface Props {
  node: TNode;
  children?: React.ReactNode;
  isRoot?: boolean;
}

const CONTAINER_ELEMENTS = ["Div"];

export const Element = ({ node, children, isRoot }: Props) => {
  const BaseComponent = getNodeElement(node.type);
  const style = nodeToCSS(node, isRoot);

  const { selectedNode, setSelectedNode } = useNodeContext();
  const isSelected = selectedNode?.id === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(node);
  };

  const className = `preview-element ${
    isSelected ? "preview-element--selected" : ""
  }`;

  const renderElement = () => {
    if (CONTAINER_ELEMENTS.includes(node.type) && !isRoot) {
      return (
        <BaseComponent
          style={style}
          onClick={handleClick}
          className={className}
          data-type={node.type}
        >
          <span className="preview-element__label">{node.name}</span>
          {node.children &&
            node.children.map((child) => (
              <Element key={child.id} node={child} />
            ))}
        </BaseComponent>
      );
    }

    return (
      <BaseComponent
        style={style}
        value={node.name}
        onClick={handleClick}
        className={className}
        placeholder={node.name}
        data-type={node.type}
      >
        {children}
      </BaseComponent>
    );
  };

  if (isRoot) {
    return renderElement();
  }

  return (
    <Draggable onClick={handleClick} id={node.id}>
      {renderElement()}
    </Draggable>
  );
};
