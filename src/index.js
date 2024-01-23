import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";

import Weatherapp from "./Weatherapp";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SnackbarProvider
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Weatherapp />
    </SnackbarProvider>
  </StrictMode>
);
