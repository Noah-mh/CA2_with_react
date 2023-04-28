import { useEffect, useState } from "react";

export default function DelaySearch(value, delay) {
  const [delayValue, setDelayValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return delayValue;
}
