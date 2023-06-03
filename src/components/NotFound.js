import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goback = () => {
    navigate(-1);
  };
  return (
    <div>
      Page Not Found
      <button onClick={goback}>Go back</button>
    </div>
  );
};

export default NotFound;
