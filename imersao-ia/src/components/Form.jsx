

const Form = ({ onFormSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = key === 'valorViagem' ? `R$ ${value}` : value;
    });

    
    onFormSubmit(formDataObject);
    console.log(formDataObject)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Minha Cidade/Estado</p>
        <input type="text" name="localPartida" placeholder="Local de Partida" required/>
        <div className="row">
          <p>Valor disponivel para Viagem</p>
          <p>R$</p> 
          <input type="number" name="valorViagem" placeholder="R$" required/>
        </div>
        <div className="row">
          <p>Quantas pessoas irão viajar?</p>
          <input type="number" name="quantidadePessoas" placeholder="Nº" required/>
        </div>

        <label>
          <p>Qual o estilo de viagem que você prefere?</p>
          <select name="estiloViagem">
            <option value="Praia, Montanhas, Parques, Natureza, Gastronomia">Todos</option>
            <option value="Praia">Praia</option>
            <option value="Montanhas">Montanhas</option>
            <option value="Parques">Parques</option>
            <option value="Natureza">Natureza</option>
            <option value="Gastronomia">Gastronomia</option>
          </select>
        </label>
        <label>
          <p>Qual a época do ano desejada para a viagem?</p>
          <select name="epocaViagem">
            <option value="Alta temporada">Alta temporada: preços mais altos, principalmente em destinos turísticos famosos.</option>
            <option value="Baixa temporada">Baixa temporada: preços mais baixos, menos movimento.</option>
          </select>
        </label>
        <div className="row">
          <p> Qual a duração da viagem?</p>
          <input type="number" name="duracaoViagem" placeholder="Dias" />
        </div>

        <button className="btn" type="submit">Planejar Viagem</button>
      </form>
    </div>
  );
};

export default Form;
