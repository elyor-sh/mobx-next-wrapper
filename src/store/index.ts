import {RootStore} from './store'
import {createStore} from "@/store/create-store";

export const {initStore, StoreProvider, useStore, withGSSP} = createStore(new RootStore())