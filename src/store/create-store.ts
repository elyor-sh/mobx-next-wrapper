import {createContext, useContext} from "react";
import {enableStaticRendering} from "mobx-react-lite";
import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";

type CreateStoreParamsType<T> = {
    [key in keyof T]: {
        hydrate?: (values: any) => void
    } & T[key]
}

export type WithGetServerSidePropsType<T, R> = {
    initialState: {
        key: keyof T,
        value: unknown
    } & R
}

export const createStore = <RootStore extends CreateStoreParamsType<RootStore>>(rootStore: RootStore) => {
    enableStaticRendering(typeof window === "undefined")

    let clientStore: RootStore

    type KeyOf = keyof typeof rootStore

    const initStore = (initData: KeyOf, value: any) => {

        const store = clientStore ?? rootStore;

        if (initData) store[initData]?.hydrate?.(value)

        if (typeof window === "undefined") return store

        if (!clientStore) clientStore = store;
        return store
    }

    const MobxStoreContext = createContext<RootStore | undefined>(undefined)

    function useStore () {

        const context = useContext(MobxStoreContext)

        if(!context){
            throw new Error(`Store context is not found`)
        }

        return context
    }

    function withGSSP <U>(fn: (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<WithGetServerSidePropsType<RootStore, U>>>) {
        return async (ctx: GetServerSidePropsContext) => {
            return fn(ctx);
        }
    }

    return {
        initStore,
        StoreProvider: MobxStoreContext.Provider,
        useStore,
        withGSSP
    }
}