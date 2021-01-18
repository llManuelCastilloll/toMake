import React from 'react';
import { Header } from '../components/Header';
import { Works } from '../components/Works';
import { Forms } from '../components/Forms';
import { Graphics } from '../components/Graphics';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import '../assets/styles/App.scss'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            workAdded: false,
            allWorks: ''
        }
        this._handleState = this._handleState.bind(this);
    }

    _handleState(toUpdate){
        const { name, value } = toUpdate
        this.setState({[name]: value})
        let works = JSON.parse(sessionStorage.getItem("Works"))
        console.log("added=>", works);
        this.setState({allWorks: works.works})
        toast.success("¡Acción realizada correctamente!");
    }

    componentWillMount(){
        //Creación de storage...
        let works = {
            works:[
                {
                    id: 1,
                    name: "Realizar tareas de front-end proyecto Netflix",
                    description: "Se van a llevar a cabo las tareas de definición de actividades",
                    timeDefinition: "3:00:30",
                    timeClosure: moment(),
                    timeReleased: "00:00:00"
                }
            ]
        }
        sessionStorage.setItem("Works", JSON.stringify(works))
        this.setState({
            works: works.works
        })
    }


    render(){
        const { allWorks } = this.state;
        return (
            <div className="containerr">
                <Header />    
                <Works 
                    works = { allWorks }
                    updateSome = {this._handleState}
                /> 
                <Forms 
                    updateSome = {this._handleState}
                />
                <Graphics />
                <ToastContainer />
            </div>
        )
    }
};


export default Home;