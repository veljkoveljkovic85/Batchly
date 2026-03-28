import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "#components/App";
import { createTheme, ThemeProvider } from "@mui/material";

const customTheme = createTheme({
  palette: {
    text: {
      primary: "#555555",
      secondary: "#666666",
      disabled: "#a8a4a4ff",
    },
  },

  typography: {
    allVariants: {
      color: "#555555",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
