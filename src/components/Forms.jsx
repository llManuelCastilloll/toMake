import React, { useState } from 'react';
import { FcAlarmClock } from "react-icons/fc";
import TimeInput from 'react-advanced-time-input';
import '../assets/styles/components/Forms.scss';

export const Forms = ({updateSome}) => {
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
        var works = JSON.parse(sessionStorage.getItem("Works"));
        
        let newWork = {
            id: 2,
            name: form.name,
            description: form.description,
            timeDefinition: form.timeDuration,
            timeReleased: '00:00:00'
        };
        works.works.push(newWork)
        sessionStorage.setItem("Works", JSON.stringify(works));
        updateSome({name:"workAdded", value:true});
        clearInputs();
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
                        <span className="work_duration">< FcAlarmClock/>Duración:</span>  
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