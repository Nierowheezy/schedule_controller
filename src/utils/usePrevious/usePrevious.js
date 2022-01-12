import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.prevLateVal = value;
  });
  return ref.prevLateVal;
};

export default usePrevious;
