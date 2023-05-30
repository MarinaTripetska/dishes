import { useFormikContext } from "formik";
import { useState } from "react";
import styles from "./Dropdown.module.scss";

interface Props {
  field: {
    name: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
  };
  id: string;
  options: { label: string; value: string }[];
}

const Dropdown: React.FC<Props> = ({ field, id, options }) => {
  const { setFieldValue } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    setIsFocused(true);
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          toggle();
        }
        setFocusIndex((prevIndex) =>
          prevIndex !== null && prevIndex > 0
            ? prevIndex - 1
            : options.length - 1
        );
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          toggle();
        }
        setFocusIndex((prevIndex) =>
          prevIndex !== null && prevIndex < options.length - 1
            ? prevIndex + 1
            : 0
        );

        break;

      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen && focusIndex !== null) {
          setFieldValue(field.name, options[focusIndex].value);
          setIsOpen(false);
          setIsFocused(false);
        } else {
          setIsOpen(true);
        }

        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.dropdown} id={id}>
      <div
        className={styles.dropdown__selected}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {field.value.charAt(0).toUpperCase() + field.value.slice(1)}
      </div>
      {isOpen && (
        <div className={styles.dropdown__options}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setFieldValue(field.name, option.value);
                toggle();
              }}
              className={`${styles.dropdown__option}
                ${index === focusIndex && isFocused ? styles.focused : ""}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
