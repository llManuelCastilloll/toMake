import React from 'react';
import '../assets/styles/components/Works.scss';
import { Work } from './Work';

export class Works extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            works:''
        }
        this._handleWorks = this._handleWorks.bind(this);
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

    _handleWorks(attribute, action, values){
        var works = JSON.parse(sessionStorage.getItem("Works"));
        let updateWorks = works.works.filter(item => item.name !== attribute);
        works.works = updateWorks
        sessionStorage.setItem("Works", JSON.stringify(works));
        this.props.updateSome({name:"workAdded", value:true});
    }

    render(){
        const { works } = this.state;
        return(
            <section className="works_section">
                <div className="works_header">
                    <span className="work_title titles">Mis tareas</span>
                    <div className="filters">
                        <span className="filter_a filter">Larga</span>
                        <span className="filter_b filter">Media</span>
                        <span className="filter_c filter">Corta</span>
                    </div>
                </div>
                
                <div className="container_works">
                    <Work 
                        works = {this.props.works}
                        handleWorks = {this._handleWorks} 
                        updateSome = {this.props.updateSome}
                    />
                </div>
            </section>
        );
    }
    
}