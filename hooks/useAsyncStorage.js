import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorage(key, initValue) {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(jsonValue => {
      if (jsonValue != null) {
        setValue(JSON.parse(jsonValue));
      } else if (typeof initValue === "function") {
        setValue(initValue());
      }
    });
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

