import "./dropdown.scss";

interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  visible: boolean;
}

export const Dropdown = ({ items, onSelect, visible }: DropdownProps) => {
  if (!visible || items.length === 0) return null;

  return (
    <div className="dropdown-menu">
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className="dropdown-item"
        >
          {item}
        </div>
      ))}
    </div>
  );
};
