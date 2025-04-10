import React, { useEffect } from "react";
import { AsyncData } from "@ekz/async-data";

interface AsyncDataRendererProps<T> {
  asyncData: AsyncData<T>;
  renderData: (data: T) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: unknown) => React.ReactNode;
  renderInitial?: () => React.ReactNode;
}

export function AsyncDataRenderer<T>({
  asyncData,
  renderData,
  renderLoading = () => <p>Lade Daten...</p>,
  renderError = (error) => <p>Fehler: {String(error)}</p>,
  renderInitial = () => null,
}: AsyncDataRendererProps<T>) {
    switch (asyncData.state) {
      case "Pending":
        return renderLoading();
      case "Failed":
        return renderError(asyncData.error);
      case "Ready":
        return renderData(asyncData.value);
      case "Empty":
      default:
        return renderInitial();
    }
}
