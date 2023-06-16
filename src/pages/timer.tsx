import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {useStore} from "@/store";
import {GetServerSideProps} from "next";

const TimerPage = () => {

    const {timerStore} = useStore()

    useEffect(() => {
        const interval = setInterval(() => {
            timerStore.setSecond(timerStore.second + 1)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [timerStore])

    return (
        <h1>
            {timerStore.second}
        </h1>
    );
};

export default observer(TimerPage);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {

        }
    }
}