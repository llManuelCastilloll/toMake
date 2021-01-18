import React from 'react';

import { FcApproval } from "react-icons/fc";
import { BiStopCircle, BiPauseCircle } from "react-icons/bi";
import {  BiTrash } from "react-icons/bi";
import { Timer } from './Timer';
import ModalEdit from './Modal';

export const Work = props => {
    const { works } = props;

    const makeWorks = () => {
        if(works.length > 0)
        {
            let workItems = works.map(item => {
                return(
                    <div className="work" key={item.name}>
                        <div className="work_header">
                            <span className="work_title titles">{item.name}</span> 
                            <div className="work_opc">
                                <div 
                                    className="eliminar work_icon" 
                                    onClick={()=>props.handleWorks(item.name, "delete", "")}
                                    >
                                        <BiTrash />
                                </div>
                                <ModalEdit 
                                    id = { item.id }
                                    name = {item.name}
                                    description = {item.description}
                                    updateSome = {props.updateSome}
                                />
                            </div>
                        </div>
                        
                        <p className="work_description">{item.description}</p>
                        <div className="work_footer">
                            <Timer   
                                id = { item.id }
                                timeDuration = {item.timeDefinition}
                                timeClosure = {item.timeClosure}
                            />
                            <div className="work_options detener"><BiStopCircle className="work_icon"/>Detener</div>
                            {/* <div className="work_options pausar"><BiPauseCircle className="work_icon" /> Pausar</div> */}
                            <div className="work_options terminar"><FcApproval className="work_icon"/>Finalizar</div>
                        </div>                    
                    </div>
                )
            })
            return workItems
        }
    };

    return(
        <>
        {works.length === 0 ? 
            (<div className="no_works">Nada que mostrar</div>)
            :
            (makeWorks())
        }
        </>
    );
};