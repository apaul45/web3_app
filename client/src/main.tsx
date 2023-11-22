import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BlockChainProvider from "./context/BlockchainContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BlockChainProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BlockChainProvider>
);
