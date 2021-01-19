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
                    <div className="work" key={item.id}>
                        <div className="work_header">
                            <span className="work_title titles">{item.name}</span> 
                            <div className="work_opc">
                                <div 
                                    className="eliminar work_icon" 
                                    onClick={()=>props.handleWorks(item.id)}
                                    >
                                        <BiTrash />
                                </div>
                                <ModalEdit 
                                    id = { item.id }
                                    name = {item.name}
                                    description = {item.description}
                                    getAllWorks = {props.getAllWorks}
                                />
                            </div>
                        </div>
                        
                        <p className="work_description">{item.description}</p>
                        <div className="work_footer">
                            {
                                item.workStatus == "finalizado" ? 
                                ( <div 
                                    className="work_options terminar" 
                                    >
                                    <FcApproval className="work_icon"/>Finalizado
                                </div>)
                                :
                                (
                                    <>
                                    <Timer   
                                        id = { item.id }
                                        name = {item.name}
                                        description = {item.description}
                                        timeDuration = {item.timeDefinition}
                                        timeClosure = {item.timeClosure}
                                        typeWork = {item.durationType}
                                        updateWork = {props.updateWork}
                                    />
                                    {/* <div className="work_options detener"><BiStopCircle className="work_icon"/>Detener</div> */}
                                    {/* <div className="work_options pausar"><BiPauseCircle className="work_icon" /> Pausar</div> */}
                                    <div 
                                        className="work_options terminar" 
                                        onClick={()=>props.finishWork(item.id, item.name, item.description, item.workStatus)}
                                    >
                                        <FcApproval className="work_icon"/>Finalizar
                                    </div>
                                    </>
                                )
                            }
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
            (<div className="no_works">No hay tareas qué mostrar.</div>)
            :
            (makeWorks())
        }
        </>
    );
};