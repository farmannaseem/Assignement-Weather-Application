import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WeatherProvider } from "./context/WeatherContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </QueryClientProvider>
);
