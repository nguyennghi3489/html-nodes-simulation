import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { ROOT_NODE } from "../../constant/common";
import type { TNode } from "../../models/node";
import { useNodeContext } from "../../hooks/useNodeContext";
import { Element } from "./element";

interface Props {
  node: TNode;
}
export const Preview = ({ node }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<TNode | null>(null);
  const { updateNode } = useNodeContext();

  const findNodeById = (nodes: TNode[], id: string): TNode | null => {
    for (const currentNode of nodes) {
      if (currentNode.id === id) return currentNode;
      if (currentNode.children) {
        const found = findNodeById(currentNode.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
    const foundNode = findNodeById(node.children, String(event.active.id));
    setDraggedNode(foundNode);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (activeId && draggedNode && event.delta) {
      const newX = draggedNode.x + event.delta.x;
      const newY = draggedNode.y + event.delta.y;

      updateNode(activeId, { x: newX, y: newY });
    }

    setActiveId(null);
    setDraggedNode(null);
  };

  return (
    <>
      <h2>Preview</h2>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="root-node">
          <Element node={ROOT_NODE} isRoot>
            <>
              {node.children.map((childNode) => (
                <Element key={childNode.id} node={childNode} />
              ))}
            </>
          </Element>
        </div>
        <DragOverlay dropAnimation={null}>
          {activeId && draggedNode ? (
            <div style={{ opacity: 0.8 }}>
              <Element node={draggedNode} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};
