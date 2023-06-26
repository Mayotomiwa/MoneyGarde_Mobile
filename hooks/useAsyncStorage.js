import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(jsonValue => {
      if (jsonValue != null) {
        setValue(JSON.parse(jsonValue));
      } else if (typeof defaultValue === "function") {
        setValue(defaultValue());
      }
    });
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
