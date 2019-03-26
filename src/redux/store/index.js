import { createStore } from "redux";
import Reducer from "../reducer/index";
import { devToolsEnhancer } from "redux-devtools-extension";
const Store = createStore(
  Reducer,
  devToolsEnhancer()
);
export default Store;
