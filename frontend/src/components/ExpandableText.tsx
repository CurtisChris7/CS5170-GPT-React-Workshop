import { useState } from "react";

// Defines the fields for the component
interface Props {
  cap?: number;
  children: String;
}

/**
 * Creates an expandable text component.
 * @param cap the number of characters to reveal, deault value is 100 characters
 * @param children the text to be wraped in component
 * @returns expandable text component.
 */
const ExpandableText = ({ cap = 100, children }: Props) => {
  // We show the full text if we are within the defined capacity
  if (children.length <= cap) return <p>{children}</p>;

  // Tracks the state of the component, we only track wether to hide the text or not
  const [showLess, setShowLess] = useState(true);
  const toggle = () => {
    setShowLess(!showLess);
  };

  // We return the react markup needed for the component
  return (
    <>
      <p>{showLess ? children.slice(0, cap) + "..." : children}</p>
      <button className="btn btn-secondary" onClick={toggle}>
        {showLess ? "More" : "Less"}
      </button>
    </>
  );
};

export default ExpandableText;
