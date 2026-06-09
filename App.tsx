import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { EpisodesScreen } from "./src/screens/EpisodesScreen";

export default function App() {
  return (
    <Provider store={store}>
      <EpisodesScreen />
    </Provider>
  );
}
