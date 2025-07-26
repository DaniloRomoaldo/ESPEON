// main.jsx

import React from "react";
import ReactDom from 'react-dom/client';
import './index.css';
import 'preline';
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// === MUTATION OBSERVER: garante que Preline init após qualquer mudança de DOM ===
const observer = new MutationObserver(() => {
  if (window.HSStaticMethods?.autoInit) {
    window.HSStaticMethods.autoInit();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
