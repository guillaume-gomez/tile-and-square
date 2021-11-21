import { useRef, useEffect } from "react";

export default function useAnimationFrame(callback: Function) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);
  /**
   * The callback function is automatically passed a timestamp indicating
   * the precise time requestAnimationFrame() was called.
   */
  function animate(time: number) {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function stop() {
    if(requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = 0;
    }
  }

  function play() {
    if(requestRef.current === 0) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }

  useEffect(() => {
    play();
    return () => stop();
  }, []); // Make sure the effect runs only once

  return { stop, play };
};