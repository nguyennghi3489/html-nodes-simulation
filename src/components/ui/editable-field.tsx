import { useState, useRef, useEffect } from "react";
import { SuggestionInputField } from "./suggestion-input-field";
import "./editable-field.scss";

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const EditableField = ({
  value,
  onChange,
  onBlur,
  suggestions = [],
  placeholder,
  className = "",
  autoFocus = false,
  disabled = false,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(autoFocus);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus when autoFocus prop is true
  useEffect(() => {
    if (autoFocus) {
      setIsEditing(true);
    }
  }, [autoFocus]);

  // Auto focus when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (disabled) return;
    setIsEditing(true);
  };

  const handleBlur = (value: string) => {
    setIsEditing(false);
    onBlur?.(value);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  if (isEditing) {
    return (
      <SuggestionInputField
        ref={inputRef}
        value={value}
        onChange={handleChange}
        suggestions={suggestions}
        placeholder={placeholder}
        className={`editable-field__input ${className}`}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <span
      className={`editable-field__label ${className}`}
      onClick={handleClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {value || placeholder}
    </span>
  );
};
