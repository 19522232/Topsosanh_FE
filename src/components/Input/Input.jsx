import React, { memo, useEffect, useRef, useState } from "react";
import "./input.scss";

function input(props) {
  const [isShow, setShow] = useState(false);

  const isEmail = (value) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  };

  const isPhone_number = (value) => {
    var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(value);
  };
}

export default memo(Input);
