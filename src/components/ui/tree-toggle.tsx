import "./tree-toggle.scss";

interface TreeToggleProps {
  isExpanded: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export const TreeToggle = ({
  isExpanded,
  onClick,
  className = "",
}: TreeToggleProps) => {
  return (
    <span className={`tree-toggle ${className}`} onClick={onClick}>
      {isExpanded ? "▼" : "▶"}
    </span>
  );
};
