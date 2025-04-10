import React from "react";

type RefreshToken = number;

export default function useRefresh(): [RefreshToken, () => void] {
  const [token, setToken] = React.useState(0);

  const refresh = React.useCallback(() => setToken((x) => x + 1), []);

  return React.useMemo(() => [token, refresh], [token, refresh]);
}
