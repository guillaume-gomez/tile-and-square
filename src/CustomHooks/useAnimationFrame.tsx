import React, { useRef, useEffect } from "react";

export default function useAnimationFrame(callback: Function) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);
  /**
   * The callback function is automatically passed a timestamp indicating
   * the precise time requestAnimationFrame() was called.
   */

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};