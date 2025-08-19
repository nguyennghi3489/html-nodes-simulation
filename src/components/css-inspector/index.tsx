import type { TNode } from "../../models/node";
import { CssInspector } from "./inspector";

interface Props {
  node: TNode | null;
}
export const InspectorView = ({ node }: Props) => {
  return (
    <>
      <h2>CSS Inspector</h2>
      {node ? (
        <CssInspector node={node} />
      ) : (
        <div className="inspector-placeholder">
          Select a node from the tree view or preview to inspect its CSS
          properties
        </div>
      )}
    </>
  );
};
