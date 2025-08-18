import "./App.css";
import { CssInspector } from "./components/css-inspector/inspector";
import { Element } from "./components/preview/element";
import { TreeNode } from "./components/tree-view/tree-node";
import { NodeProvider } from "./contexts/NodeContext";
import { exampleNodes2 } from "./data/mock-nodes";
import { useNodeContext } from "./hooks/useNodeContext";
import { wrapInRootNode } from "./utils/render";

const AppContent = () => {
  const { rootNode, selectedNode } = useNodeContext();

  return (
    <div className="app-container">
      <div className="app-column">
        <h2>Tree View</h2>
        <TreeNode node={rootNode} />
      </div>
      <div className="app-column" style={{ flex: 2 }}>
        <h2>Preview</h2>
        <div className="root-node">
          <Element node={rootNode} />
        </div>
      </div>
      <div className="app-column css-inspector-column">
        <h2>CSS Inspector</h2>
        {selectedNode ? (
          <CssInspector node={selectedNode} />
        ) : (
          <div
            style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}
          >
            Select a node from the tree view or preview to inspect its CSS
            properties
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const nodeData = wrapInRootNode(exampleNodes2);
  return (
    <NodeProvider initialNode={nodeData}>
      <AppContent />
    </NodeProvider>
  );
}

export default App;
