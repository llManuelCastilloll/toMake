import React, { useEffect, useState, useRef } from 'react';
import { FcAlarmClock } from "react-icons/fc";
import moment from 'moment';

export const Timer = props => {
    const { timeDuration, timeClosure } = props
    let tiniTimes = timeDuration.split(":");
    const [timeHours, setTimeHours] = useState(tiniTimes[0]);
    const [timeMinutes, setTimeMinutes] = useState(tiniTimes[1]);
    const [timeSeconds, setTimeSeconds] = useState(tiniTimes[2]);

    let interval = useRef();

    const playTime = () => {
        let toUse = moment(timeClosure).valueOf();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = toUse - now;

            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (1000 * 60 * 60 ) / (1000 * 60 ));
            const seconds = Math.floor(distance % (1000 * 60 ) / (1000));
            if(distance < 0){
                //Stop and complete work...
            }else{
                setTimeHours(hours);
                setTimeMinutes(minutes);
                setTimeSeconds(seconds)
            }
        }, 1000);
    };

    useEffect(()=>{
        playTime()
    });

    return(
        <section className="work_options work_duration">
            <FcAlarmClock className="work_icon"/>
            <span>
                {timeHours}
            </span>
            <span>:</span>
            <span>
                {timeMinutes}
            </span>
            <span>:</span>
            <span>
                {timeSeconds}
            </span>
        </section>
    );
}