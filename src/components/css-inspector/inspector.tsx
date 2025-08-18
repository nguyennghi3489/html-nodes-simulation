import { useState, useEffect } from "react";
import type { TNode } from "../../models/node";
import {
  getAllCSSProperties,
  getCSSPropertyValues,
  getBuiltInProperties,
} from "../../utils/css-properties";
import { useNodeContext } from "../../hooks/useNodeContext";
import { EditableField } from "../ui/editable-field";
import "./css-inspector.scss";

interface Props {
  node: TNode;
}

export const CssInspector = ({ node }: Props) => {
  const { selectedNode, updateNode } = useNodeContext();
  const currentNode = selectedNode || node;
  const customProperties = currentNode.extraCssProperties || {};
  const [focusedProperty, setFocusedProperty] = useState<string | null>(null);

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
    const updatedProperties = { ...customProperties, [""]: "" };
    updateNode(currentNode.id, { extraCssProperties: updatedProperties });
    setFocusedProperty("");
  };

  const handlePropertyNameBlur = (propName: string) => {
    // Remove property if name is empty or not a valid CSS property
    if (!propName.trim() || !getAllCSSProperties().includes(propName)) {
      removeCustomProperty(propName);
    }
  };

  useEffect(() => {
    if (focusedProperty) {
      const timer = setTimeout(() => setFocusedProperty(null), 100);
      return () => clearTimeout(timer);
    }
  }, [focusedProperty]);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only add new property if clicking on empty space (container itself)
    if (e.target === e.currentTarget) {
      addNewCustomProperty();
    }
  };

  const builtInProperties = getBuiltInProperties(currentNode);

  return (
    <div className="container" onClick={handleContainerClick}>
      <h3>CSS Properties - {currentNode.name}</h3>
      <div>
        {/* Built-in Properties */}
        {builtInProperties.map((prop) => (
          <div key={prop.key} className="property-row">
            <span className="property-name property-name--default">
              {prop.label}:
            </span>
            <EditableField
              value={String(prop.value)}
              onChange={(value) => {
                handlePropertyChange(prop.key as keyof TNode, value);
              }}
              suggestions={getCSSPropertyValues(prop.key)}
            />
          </div>
        ))}

        {/* Custom Properties */}
        {Object.entries(customProperties).map(
          ([propName, propValue], index) => (
            <div key={index} className="property-row">
              <EditableField
                value={propName}
                onChange={(newName) =>
                  handleCustomPropertyNameChange(propName, newName)
                }
                onBlur={(newName) => handlePropertyNameBlur(newName)}
                suggestions={getAllCSSProperties()}
                placeholder="Property name"
                className="property-name property-name--default"
                autoFocus={focusedProperty === propName}
              />
              <span className="property-separator">:</span>
              <EditableField
                value={propValue}
                onChange={(newValue) =>
                  handleCustomPropertyValueChange(propName, newValue)
                }
                suggestions={getCSSPropertyValues(propName)}
                placeholder="Property value"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
