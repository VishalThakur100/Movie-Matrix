import Body from "./components/Body";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
   
    <Provider cla store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
