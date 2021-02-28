import { useCallback, useState } from 'react';

function useQueryParams(
  key: string,
  initialVal: string
): [string, (newValue: string, saveToStateOnly?: boolean) => void] {
  const queryParams = new URLSearchParams(window.location.search);

  const [value, setValue] = useState<string>(queryParams.get(key) || initialVal);
  const onSetValue = useCallback(
    (newValue: string, saveToStateOnly = false) => {
      setValue(newValue);
      if (!saveToStateOnly) {
        queryParams.set(key, newValue.toString());

        //silently push update
        const nextUrl = `${window.location.protocol}//${window.location.host}${
          window.location.pathname
        }?${queryParams.toString()}`;
        window.history.pushState({ path: nextUrl }, '', nextUrl);
      }
    },
    [key]
  );

  return [value, onSetValue];
}

export default useQueryParams;
