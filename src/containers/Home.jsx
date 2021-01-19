import React from 'react';
import { Header } from '../components/Header';
import { Works } from '../components/Works';
import { Forms } from '../components/Forms';
import { Graphics } from '../components/Graphics';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import axios from 'axios';
import { getURI } from '../../config'

import '../assets/styles/App.scss'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            workAdded: false,
            allWorks: '',
            graphicData:''
        }
        this._handleState = this._handleState.bind(this);
        this.getAllWorks = this.getAllWorks.bind(this);
        this.getGraphicData = this.getGraphicData.bind(this);
    }

    _handleState(toUpdate){
        const { name, value } = toUpdate
        this.setState({[name]: value})
        toast.success("¡Acción realizada correctamente!");
    }

    getAllWorks(filter){
        axios
        .get(`${getURI()}api/v1/works/`, {params:{filter: filter ? filter : ""}})
        .then(result => {
            //console.log("data", result.data)
            this.setState({
                allWorks: result.data
            })
        })
        .catch(e=>console.log(e))
    }

    getGraphicData(){
        axios
        .get(`${getURI()}api/v1/works/graphic`)
        .then(result => {
            this.setState({
                graphicData: result.data
            })
        })
        .catch(e=>console.log(e))
    }

    componentWillMount(){
        //Creación de storage...
        this.getAllWorks();
        this.getGraphicData();
    }


    render(){
        const { allWorks, graphicData } = this.state;
        return (
            <div className="containerr">
                <Header />    
                <Works 
                    works = { allWorks }
                    updateSome = {this._handleState}
                    getAllWorks = {this.getAllWorks}
                /> 
                <Forms 
                    getAllWorks = {this.getAllWorks}
                />
                <Graphics 
                    graphicData = {graphicData}
                />
                <ToastContainer />
            </div>
        )
    }
};


export default Home;