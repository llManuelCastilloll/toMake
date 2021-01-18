import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import { BiEditAlt } from "react-icons/bi";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const ModalEdit = props => {
  const {
    id,
    className
  } = props;

  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description)
  const [modal, setModal] = useState(false);

  const _handleInput = (event) => {
    const { name, value } = event.target;
    if(name == name){
      setName(value)
    }
    if(name == description){
      setDescription(value)
    }    
  }

  const toggle = () => setModal(!modal);

  const updateWork = () => {
      console.log("here...");
        var works = JSON.parse(sessionStorage.getItem("Works"));
        let updateWork = {
          id: id,
          name: name,
          description: description,
          timeDefinition: "00:00:00",
        }
        let prevWorks = works.works.filter(item => item.id !== id);
        console.log("prev", prevWorks);
            prevWorks.push(updateWork);
          console.log("prevll",prevWorks)


        works.works = prevWorks
        sessionStorage.setItem("Works", JSON.stringify(works));
        props.updateSome({name:"uno", value:"dos"});
        toggle()
  }

  return (
    <div>
      <div className="actualizar work_icon" onClick={toggle}><BiEditAlt /> </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edita tu tarea.</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Nombre de la tarea" 
                  value={name} 
                  onChange={_handleInput}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                  type="text" 
                  name="description" 
                  placeholder="Descripción de la tarea" 
                  value={description} 
                  onChange={_handleInput} 
                />
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>updateWork()}>Actualizar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalEdit;