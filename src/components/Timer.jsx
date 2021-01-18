import React, { useEffect, useState, useRef } from 'react';
import { FcAlarmClock } from "react-icons/fc";

export const Timer = props => {
    const { timeDuration } = props
    let tiniTimes = timeDuration.split(":");
    const [timeHours, setTimeHours] = useState(tiniTimes[0]);
    const [timeMinutes, setTimeMinutes] = useState(tiniTimes[1]);
    const [timeSeconds, setTimeSeconds] = useState(tiniTimes[2]);

    let interval = useRef();

    const playTime = () => {
        let timenow = new Date()
        console.log(timenow);
        const timeDefinition = new Date('Sun Jan 17 2021 12:30:07').getTime();
        console.log("time:", timeDefinition);

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = timeDefinition - now;

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