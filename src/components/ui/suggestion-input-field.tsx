import { useState } from "react";
import { Dropdown } from "./dropdown";
import "./suggestion-input-field.scss";

interface SuggestionInputFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  className?: string;
}

export const SuggestionInputField = ({
  placeholder,
  value,
  onChange,
  suggestions = [],
  className = "form-input",
}: SuggestionInputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  );

  const shouldShowDropdown =
    isFocused && filteredSuggestions.length > 0 && value.length > 0;

  return (
    <div className="suggestion-input-field">
      <input
        type={"text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
      />
      <Dropdown
        items={filteredSuggestions}
        onSelect={(value) => onChange(value)}
        visible={shouldShowDropdown}
      />
    </div>
  );
};
