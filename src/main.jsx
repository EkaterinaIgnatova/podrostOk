import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import "./index.css";

const root = document.getElementById("root");
const reactRoot = createRoot(root);
reactRoot.render(<App />);
