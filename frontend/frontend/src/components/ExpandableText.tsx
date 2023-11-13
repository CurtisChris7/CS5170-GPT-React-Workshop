import { useState } from "react";

interface Props {
  cap?: number;
  children: String;
}

const ExpandableText = ({ cap = 100, children }: Props) => {
  if (children.length <= cap) return <p>{children}</p>;

  const [showLess, setShowLess] = useState(true);
  const toggle = () => {
    setShowLess(!showLess);
  };

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
