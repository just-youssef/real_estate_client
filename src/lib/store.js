import { combineReducers, configureStore } from "@reduxjs/toolkit";
import siderReducer from "./features/siderReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    sider: siderReducer
    //add all your reducers here
},);

const presistConfig = {
    key: "root",
    storage,
    version: 1,
}
const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store)

