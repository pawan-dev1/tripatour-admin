import { useEffect, useRef } from "react";
import { useIsVisible } from "./UseVisible";

const Imagejhuj = ({ src, setCurrent, id }) => {
  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible) {
      setCurrent(isVisible);
    }
  }, [isVisible]);

  return <img src={src} alt="" id={id} ref={ref} />;
};

export default Imagejhuj;
