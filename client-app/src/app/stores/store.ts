import { createContext, useContext } from "react";
import VijestStore from "./vijestStore";

interface Store {
    vijestStore: VijestStore
}

export const store: Store = {
    vijestStore: new VijestStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}