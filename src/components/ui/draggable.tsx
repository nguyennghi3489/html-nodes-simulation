import { useDraggable } from "@dnd-kit/core";

interface Props {
  id: string;
  element?: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
export const Draggable = (props: Props) => {
  const Element = props.element || "div";
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <Element
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseDown={props.onClick}
    >
      {props.children}
    </Element>
  );
};
