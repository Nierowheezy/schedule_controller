import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import eventReducer from "./eventReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  events: eventReducer,
});

export default persistReducer(persistConfig, rootReducers);
