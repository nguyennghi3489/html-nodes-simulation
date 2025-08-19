import "./App.css";
import { Preview } from "./components/preview";
import { TreeView } from "./components/tree-view";
import { NodeProvider } from "./contexts/NodeContext";
import { exampleNodes2 } from "./data/mock-nodes";
import { useNodeContext } from "./hooks/useNodeContext";
import { wrapInRootNode } from "./utils/render";
import { InspectorView } from "./components/css-inspector";

const AppContent = () => {
  const { rootNode, selectedNode } = useNodeContext();

  return (
    <div className="app-container">
      <div className="app-column">
        <TreeView node={rootNode} />
      </div>
      <div className="app-column" style={{ flex: 2 }}>
        <Preview node={rootNode} />
      </div>
      <div className="app-column css-inspector-column">
        <InspectorView node={selectedNode} />
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
