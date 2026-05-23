"use client";
import { useMemo, useEffect, useRef } from "react";
import debounce from "debounce";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay = 500
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<T>) => {
        callbackRef.current(...args);
      }, delay),
    [delay]
  );

  useEffect(() => {
    return () => debouncedFn.clear();
  }, [debouncedFn]);

  return debouncedFn;
}
