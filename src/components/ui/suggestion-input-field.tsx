import { useState, forwardRef, type ChangeEvent } from "react";
import { Dropdown } from "./dropdown";
import "./suggestion-input-field.scss";

interface SuggestionInputFieldProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  suggestions?: string[];
  className?: string;
}

export const SuggestionInputField = forwardRef<
  HTMLInputElement,
  SuggestionInputFieldProps
>(
  (
    {
      placeholder,
      value,
      onChange,
      onBlur,
      suggestions = [],
      className = "form-input",
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
      setTimeout(() => {
        setIsFocused(false);
        onBlur?.(e.target.value);
      }, 200);
    };

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    const shouldShowDropdown =
      isFocused && filteredSuggestions.length > 0 && value.length > 0;

    return (
      <div className="suggestion-input-field">
        <input
          ref={ref}
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
  }
);

SuggestionInputField.displayName = "SuggestionInputField";
