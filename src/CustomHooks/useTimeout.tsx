import React, { useEffect, useRef} from "react";

export default function useTimeout(callback : Function, delay: number) {
  const savedCallback = useRef<Function>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      let id = setTimeout(savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};
