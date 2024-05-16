import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { setupStore } from "@/store/store.ts";
import { Provider } from "react-redux";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
