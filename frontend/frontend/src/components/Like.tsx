import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  color: string;
  onClick: () => boolean;
}

const Like = ({ color, onClick }: Props) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    onClick();
  };

  if (status) return <AiFillHeart color={color} onClick={toggle} size={40} />;
  return <AiOutlineHeart color={color} onClick={toggle} size={40} />;
};

export default Like;
