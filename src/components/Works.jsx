import React from 'react';
import '../assets/styles/components/Works.scss';
import { Work } from './Work';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';
import { getURI } from '../../config';
import { toast } from 'react-toastify';
import { FcApproval } from "react-icons/fc";

export class Works extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            works:''
        }
        this._handleWorks = this._handleWorks.bind(this);
        this.finishWork = this.finishWork.bind(this);
        this.updateWork = this.updateWork.bind(this);
    }

    componentWillMount(){
        this.setState({
            works: this.props.works
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.works !== this.state.works){
            this.setState({works: prevProps.works})
        }
    }

    _handleWorks(toDelete){
        confirmAlert({
            title: '¿Estas seguro de eliminar tarea?',
            message: 'Estas a punto de eliminar una tarea.',
            buttons: [
              {
                label: 'Si',
                onClick: () => {
                    axios
                    .post(`${getURI()}api/v1/works/deleteWork`, {
                        id: toDelete
                    })
                    .then(result => {
                        toast.info("¡Se ha eliminado la tarea!");
                        this.props.getAllWorks()
                    })
                    .catch(e=>console.log(e))
                }
              },
              {
                label: 'No',
                onClick: () => {return}
              }
            ]
          });        
    }

    finishWork(id, name, description, workStatus){
        axios
        .put(`${getURI()}api/v1/works/updateWork`, {
            id: id,
            name: name,
            description: description,
            workStatus: "finalizado",
        })
        .then(result => {
            toast.info("Haz finalizado la tarea.");
            this.props.getAllWorks()
        })
        .catch(e=>console.log(e))
    }

    updateWork(id, name, description, workStatus, value){
        console.log("updating")
        axios
        .put(`${getURI()}api/v1/works/updateWork`, {
            id: id,
            name: name,
            description: description,
            workStatus: "En curso",
            durationType: value,
        })
        .then(result => {
            this.props.getAllWorks()
        })
        .catch(e=>console.log(e))
    }

    render(){
        return(
            <section className="works_section">
                <div className="works_header">
                    <span className="work_title titles">Mis tareas</span>
                    <div className="filters">
                        <span className="filter_b filter" onClick={()=>this.props.getAllWorks("")}>Todos</span>
                        <span className="filter_a filter" onClick={()=>this.props.getAllWorks("larga")}>Larga</span>
                        <span className="filter_b filter" onClick={()=>this.props.getAllWorks("media")}>Media</span>
                        <span className="filter_c filter" onClick={()=>this.props.getAllWorks("corta")}>Corta</span>
                        <span className="filter_c filter" onClick={()=>this.props.getAllWorks("finalizado")}><div><FcApproval/></div></span>
                    </div>
                </div>
                
                <div className="container_works">
                    <Work 
                        works = {this.props.works}
                        handleWorks = {this._handleWorks} 
                        finishWork = {this.finishWork}
                        getAllWorks = {this.props.getAllWorks}
                        updateWork = {this.updateWork}
                    />
                </div>
            </section>
        );
    }
    
}