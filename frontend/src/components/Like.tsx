/**
 * A like button component.
 * Provides for on click events and basic styling.
 * @author Christopher Curtis
 */
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Defines the fields for the component
interface Props {
  color: string;
  size?: number;
  onClick: () => boolean;
}

/**
 * Creates a like button.
 * @param color the color of the icon
 * @param size the size of the icon, default is 40
 * @param onClick on-click function
 * @returns like button
 */
const Like = ({ color, size = 40, onClick }: Props) => {
  // Tracks the state of the component, we only track wether to show the icon as filled or not
  const [status, setStatus] = useState(false);
  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  // We return the react markup needed for the component
  if (status) return <AiFillHeart color={color} onClick={toggle} size={size} />;
  return <AiOutlineHeart color={color} onClick={toggle} size={size} />;
};

export default Like;
