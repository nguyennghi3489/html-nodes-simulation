import type { TNode } from "../../models/node";
import { getAllCSSProperties, getCSSPropertyValues } from "./css-properties";
import { Button } from "../ui/button";
import "./css-inspector.scss";
import { useNodeContext } from "../../hooks/useNodeContext";
import { SuggestionInputField } from "../ui/suggestion-input-field";

interface Props {
  node: TNode;
}

export const CssInspector = ({ node }: Props) => {
  const { selectedNode, updateNode } = useNodeContext();
  const currentNode = selectedNode || node;

  // Remove local customProperties state - work directly with node
  const customProperties = currentNode.extraCssProperties || {};

  const handlePropertyChange = (
    property: keyof TNode,
    value: string | number
  ) => {
    updateNode(currentNode.id, { [property]: value });
  };

  const handleCustomPropertyNameChange = (oldName: string, newName: string) => {
    if (oldName === newName) return;

    const updatedProperties = { ...customProperties };
    const value = updatedProperties[oldName];
    delete updatedProperties[oldName];
    updatedProperties[newName] = value;

    updateNode(currentNode.id, { extraCssProperties: updatedProperties });
  };

  const handleCustomPropertyValueChange = (name: string, newValue: string) => {
    const updatedProperties = { ...customProperties, [name]: newValue };
    updateNode(currentNode.id, { extraCssProperties: updatedProperties });
  };

  const removeCustomProperty = (name: string) => {
    const updatedProperties = { ...customProperties };
    delete updatedProperties[name];
    updateNode(currentNode.id, { extraCssProperties: updatedProperties });
  };

  const addNewCustomProperty = () => {
    const newPropertyName = `custom-property-${Date.now()}`;
    const updatedProperties = { ...customProperties, [newPropertyName]: "" };
    updateNode(currentNode.id, { extraCssProperties: updatedProperties });
  };

  const builtInProperties = [
    { key: "x", label: "Left", value: currentNode.x, type: "number" },
    { key: "y", label: "Top", value: currentNode.y, type: "number" },
    { key: "width", label: "Width", value: currentNode.width, type: "text" },
    { key: "height", label: "Height", value: currentNode.height, type: "text" },
    {
      key: "display",
      label: "Display",
      value: currentNode.display,
      type: "text",
    },
    {
      key: "background",
      label: "Background",
      value: currentNode.background || "",
      type: "text",
    },
    {
      key: "color",
      label: "Color",
      value: currentNode.color || "",
      type: "text",
    },
    {
      key: "border",
      label: "Border",
      value: currentNode.border || "",
      type: "text",
    },
  ];

  return (
    <div className="container">
      <h3>CSS Properties - {currentNode.name}</h3>
      <div>
        {/* Built-in Properties */}
        {builtInProperties.map((prop) => (
          <div key={prop.key} className="property-row">
            <span className="property-name property-name--default">
              {prop.label}:
            </span>
            <SuggestionInputField
              value={String(prop.value)}
              onChange={(value) => {
                handlePropertyChange(prop.key as keyof TNode, value);
              }}
              suggestions={getCSSPropertyValues(prop.key)}
              className="property-input"
            />
          </div>
        ))}

        {/* Custom Properties */}
        {Object.entries(customProperties).map(
          ([propName, propValue], index) => (
            <div key={index} className="property-row">
              <SuggestionInputField
                value={propName}
                onChange={(newName) =>
                  handleCustomPropertyNameChange(propName, newName)
                }
                suggestions={getAllCSSProperties()}
                placeholder="Property name"
                className="property-name-input"
              />
              <span className="property-separator">:</span>
              <SuggestionInputField
                value={propValue}
                onChange={(newValue) =>
                  handleCustomPropertyValueChange(propName, newValue)
                }
                suggestions={getCSSPropertyValues(propName)}
                placeholder="Property value"
                className="custom-property-input"
              />
              <Button
                onClick={() => removeCustomProperty(propName)}
                variant="danger"
                size="small"
              >
                ×
              </Button>
            </div>
          )
        )}

        {/* Add New Property Button */}
        <div className="section-divider">
          <Button onClick={addNewCustomProperty} variant="primary">
            Add Custom Property
          </Button>
        </div>
      </div>
    </div>
  );
};
