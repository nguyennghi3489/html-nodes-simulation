import type { TNode } from "../../models/node";
import { TreeNode } from "./tree-node";

interface Props {
  node: TNode;
}
export const TreeView = ({ node }: Props) => {
  return (
    <>
      <h2>Tree View</h2>
      <TreeNode node={node} />
    </>
  );
};
