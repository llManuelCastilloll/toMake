import React, { useEffect, useState, useRef } from 'react';
import { FcAlarmClock } from "react-icons/fc";
import moment from 'moment';

export const Timer = props => {
    const { id, name, description, timeDuration, timeClosure, typeWork } = props
    console.log(typeWork)
    let tiniTimes = timeDuration.split(":");
    const [timeHours, setTimeHours] = useState(tiniTimes[0]);
    const [timeMinutes, setTimeMinutes] = useState(tiniTimes[1]);
    const [timeSeconds, setTimeSeconds] = useState(tiniTimes[2]);
    const [workType, setWorkType] = useState(typeWork)
    
    let interval = useRef();

    const changeType = (hours, minutes, seconds, typeWork) => {
        console.log("activity:", workType);
        let workStatus = "En curso"
        if((parseInt(hours)>=1)&&(parseInt(minutes)>=0)&&(workType!=="Larga")){
            let valueLarga = "Larga"
            props.updateWork(id, name, description, workStatus, valueLarga);
            return
        }
        if((parseInt(hours)<1)&&(parseInt(minutes)>=30)&&(workType!=="Media")){
            let valueMedia = "Media"
            setWorkType(valueMedia)
            props.updateWork(id, name, description, workStatus, valueMedia);
            return
        }
        if((parseInt(hours)<1)&&(parseInt(minutes)<30)&&(workType!=="Corta")){
            let valueCorta = "Corta";
            setWorkType(valueCorta)
            props.updateWork(id, name, description, workStatus, valueCorta);
            return
        }
        if((parseInt(hours)<1)&&(parseInt(minutes)<30)&&(workType=="Corta")){
            console.log("returning..")
            return
        }
        return
    }

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
                clearInterval(interval.current);
            }else{

                changeType(hours, minutes, seconds, typeWork)

                setTimeHours(hours);
                setTimeMinutes(minutes);
                setTimeSeconds(seconds);
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