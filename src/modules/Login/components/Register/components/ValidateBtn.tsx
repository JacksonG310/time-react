import React, { useEffect, useState } from "react";

let timer: NodeJS.Timer | undefined;

const ValidateBtn = () => {
    const [seconds, setSeconds] = useState<number | undefined>(undefined);

    useEffect(() => {
        timer && clearInterval(timer);
        return () => timer && clearInterval(timer);
    }, []);

    useEffect(() => {
        if (seconds != undefined && seconds > 0 && !timer) {
            timer = setInterval(() => setSeconds((prevState) => prevState! - 1), 1000);
        }
        else if (seconds == 0) {
            clearInterval(timer);
            setSeconds(undefined);

        }
    }, [seconds])

    const onSendCode = () => {
        if (seconds && seconds >= 0) return;
        // startTimer();
        setSeconds(5);
    }

    // const handler = useCallback(() => {
    //     if (seconds! == 0) {
    //         clearInterval(timer);
    //         timer = undefined;
    //         setSeconds(0);
    //         return;
    //     }
    //     setSeconds((prevState) => prevState - 1);
    //     console.log(seconds);

    // }, [seconds])
    // const startTimer = () => {
    //     if (!timer) {
    //         setSeconds(5);
    //         timer = setInterval(handler, 1000)
    //     }
    // }
    useEffect(() => {
        return () => clearInterval(timer!);
    }, [])
    return (
        <button onClick={onSendCode} disabled={seconds !== undefined && seconds > 0} className="validateBtn">{seconds ? `重新发送（${seconds}）` : '获取验证码'}</button>
    )
}
export default ValidateBtn;