import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Screen1 from "./Screen1";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
        {/* <Screen1 /> */}
    </StrictMode>
);
