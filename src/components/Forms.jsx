import React, { useState } from 'react';
import { FcAlarmClock } from "react-icons/fc";
import TimeInput from 'react-advanced-time-input';
import '../assets/styles/components/Forms.scss';
import moment from 'moment';
import axios from 'axios';
import { getURI } from '../../config';
import { toast } from 'react-toastify';

export const Forms = ({updateSome, getAllWorks}) => {
    const [form, setValues] = useState({
        name:'',
        description: '',
        timeDuration:''
    });

    const clearInputs = () => {
        setValues({
            name:'',
            description:'',
            timeDuration:''
        })
    };

    const _handlerInput = event => {
        const { name, value } = event.target;
        setValues({
            ...form,
            [name]: value
        })
    };

    const _handleSubmit = event => {
        event.preventDefault();
        //creación de fecha conclusión:
        let hoy = moment();
        hoy.add(moment.duration(form.timeDuration));
        let durationArray = form.timeDuration.split(":");
        console.log("timefinish", )
        //Creación de nueva tarea:
        if(form.name!=="" && form.description && form.timeDuration){
            if((parseInt(durationArray[0])<=2)){
                axios
                .post(`${getURI()}api/v1/works/`, {
                    name: form.name,
                    description: form.description,
                    timeDefinition: form.timeDuration,
                    timeClosure: hoy,
                    durationType: (parseInt(durationArray[0])>=1)&&(parseInt(durationArray[1])>=0) ? "Larga" :
                                    (parseInt(durationArray[0])<1)&&(parseInt(durationArray[1])>=30) ? "Media" :
                                        (parseInt(durationArray[0])<1)&&(parseInt(durationArray[1])<30) ? "Corta" : "Indefinida",
                    workStatus: "En curso"
                })
                .then(result => {
                    console.log("result",result);
                    toast.success("¡Tienes una nueva tarea agregada!");
                    getAllWorks();
                    clearInputs();
                })
                .catch(e=>console.log(e))
                
            }else{
                toast.error("La duración de la tarea debe ser menor a 2 horas.");
            }            
        }else{
            toast.error("Todos los campos son obligatorios.");
        }        
    }

    return(
        <section className="form">
            <span className="form_title titles">Algo nuevo que hacer.</span>
            <form className="formulario" onSubmit={()=>_handleSubmit(event)}>
                <input 
                    type="text" 
                    name="name"
                    value={form.name}
                    className="form_input" 
                    placeholder="Nombre de la nueva tarea." 
                    onChange={_handlerInput}
                />
                <input 
                    type="text" 
                    name="description" 
                    value={form.description}
                    className="form_input" 
                    placeholder="Descripción de la tarea." 
                    onChange={_handlerInput}
                />
                <div className="form_footer">
                    <div className="timing">
                        <span className="work_duration work_icon">< FcAlarmClock className="work_icon"/>Duración:</span>  
                        <TimeInput
                            className="input_time"
                            name="timeDuration"
                            value={form.timeDuration}          // {String}   required, format '00:00' or '00:00:00'
                            onChange={_handlerInput}  
                            //input={<MyCustomInputElement />}   // {Element}  default: <input type="text" />
                            //inputRef={(ref) => {...}}           {Function} input's ref
                            colon=":"                          // {String}   default: ":"
                            showSeconds                        // {Boolean}  default: false
                            maxHours                           // {Integer}  default: 23
                            maxMinutes                         // {Integer}  default: 59
                            maxSeconds                         // {Integer}  default: 59
                        />
                    </div>
                    
                    <button className="form_button">Agregar</button>
                </div>
                
            </form>
        </section>
    );
}