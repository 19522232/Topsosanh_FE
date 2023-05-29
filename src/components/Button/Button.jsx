import React from "react";
import "./button.scss";

function Button(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      <a href={props.url}>{props.children}</a>
    </button>
  );
}

export default Button;
