import "./App.css";
import { CssInspector } from "./components/css-inspector/inspector";
import { Element } from "./components/preview/element";
import { TreeNode } from "./components/tree-view/tree-node";
import { NodeProvider } from "./contexts/NodeContext";
import { useNodeContext } from "./hooks/useNodeContext";
import type { TNode } from "./models/node";

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
  const mockTNode: TNode = {
    id: "root-div",
    x: 0,
    y: 0,
    name: "Main Container",
    type: "Div",
    width: "100%",
    height: "100%",
    display: "block",
    background: "#f0f0f0",
    color: "#333",
    border: "2px solid #ccc",
    children: [
      {
        id: "header-div",
        x: 110,
        y: 70,
        name: "Header Section",
        type: "Div",
        width: 380,
        height: 60,
        background: "red",
        color: "#fff",
        text: "Welcome Header",
        children: [],
      } as TNode,
      {
        id: "content-div",
        x: 110,
        y: 140,
        name: "Content Area",
        type: "Div",
        width: 380,
        height: 120,
        background: "blue",
        border: "1px solid #ddd",
        children: [
          {
            id: "text-input",
            x: 120,
            y: 160,
            name: "Text Input",
            type: "Input",
            width: 200,
            height: 30,
            background: "green",
            border: "1px solid #ccc",
            children: [],
          } as TNode,
          {
            id: "submit-button",
            x: 330,
            y: 160,
            name: "Submit",
            type: "Button",
            width: 80,
            height: 30,
            background: "#28a745",
            color: "#fff",
            text: "Submit",
            children: [],
          } as TNode,
        ],
      } as TNode,
      {
        id: "footer-image",
        x: 200,
        y: 280,
        name: "Footer Logo",
        type: "Image",
        background: "yellow",
        width: 100,
        height: 50,
        border: "1px solid #eee",
        children: [],
      } as TNode,
    ],
  };

  return (
    <NodeProvider initialNode={mockTNode}>
      <AppContent />
    </NodeProvider>
  );
}

export default App;
