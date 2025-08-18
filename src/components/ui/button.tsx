import "./button.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "danger";
  size?: "small" | "medium";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
}: ButtonProps) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size === "small" ? "btn-small" : "";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
};
