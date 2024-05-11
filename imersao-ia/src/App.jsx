import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import GeminiIA from './components/GeminiIA';

function App() {
  const initialFormData = {
    localPartida: '',
    valorViagem: '',
    quantidadePessoas: '',
    estiloViagem: '',
    epocaViagem: '',
    duracaoViagem: '',
  };

  const [form, setForm] = useState(initialFormData);

  const handleFormChange = (formData) => {
    setForm(formData);
    //console.log(formData);
  };

  return (
    <div className='app'>
      <h1>Minha Viagem</h1>
      
      <Form onFormSubmit={handleFormChange} />
      
      
      <GeminiIA form= {form}/>

    </div>
  );
}

export default App;
