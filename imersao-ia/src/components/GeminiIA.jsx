
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import * as marked from 'marked';

function GeminiIA({ form }) {
  const [response, setResponse] = useState('');
  const MODEL_NAME = "gemini-1.5-pro-latest";
  const API_KEY = "AIzaSyCf_wgPkOTxOlWHEERxe_qbBjohvGJZfSM"; 

  const TextForm = `Partindo de ${form.localPartida} com um orçãmento de ${form.valorViagem} planeje uma viagem para ${form.quantidadePessoas} pessoas com estilo ${form.estiloViagem} na ${form.epocaViagem} para ${form.duracaoViagem} dias.  Siga este modelo: Aventura nas Montanhas: 4 Dias em Campos do Jordão com R$3000 (2 Pessoas)
  Saindo de Taubaté, Campos do Jordão é o destino perfeito para uma viagem de estilo montanhoso sem gastar muito, principalmente na baixa temporada. Aqui está um roteiro detalhado com orçamento para curtir 4 dias inesquecíveis:
  
  Transporte (R$300):
  Avião 
  Carro: A proximidade de Taubaté (60km) torna o carro uma ótima opção. Com pedágios (aprox. R$20) e gasolina (média de R$60 por dia), o custo total fica em torno de R$300.
  Alternativa: Ônibus de linha (aproximadamente R$20 por pessoa, ida e volta) é uma opção mais econômica, porém menos flexível para explorar a região.
  Hospedagem (R$ 600):
  
  Pousadas charmosas: Campos do Jordão oferece diversas opções charmosas com preços convidativos na baixa temporada. Reserve uma pousada com lareira e café da manhã incluso por cerca de R$150 a diária para o casal.
  Airbnb: Explore opções de casas ou apartamentos completos por preços similares, com a vantagem de ter cozinha para preparar algumas refeições.
  Alimentação (R$ 800):
  
  Aproveite a culinária local: Experimente fondues, trutas, cafés coloniais e chocolates quentes em restaurantes aconchegantes. Reserve R$100 por dia para refeições em restaurantes charmosos.
  Economize com picnics: Prepare sanduíches, petiscos e sucos para levar em passeios e aproveitar a natureza.
  Mercados locais: Compre frutas, queijos e vinhos para um jantar romântico na pousada ou Airbnb.
  Roteiro:
  
  Dia 1: Imersão na Natureza e Cultura:
  
  Manhã: Chegada em Campos do Jordão, check-in na pousada e passeio pelo centro da Vila Capivari.
  Tarde: Explore o Parque Estadual Campos do Jordão (entrada gratuita) com trilhas, paisagens montanhosas e cachoeiras.
  Noite: Jantar em um restaurante aconchegante com culinária local.
  Dia 2: Aventura e Relaxamento:
  
  Manhã: Visite o Museu Felícia Leirner (entrada aprox. R$20 por pessoa) e admire esculturas ao ar livre em meio à natureza.
  Tarde: Desfrute de um delicioso café colonial (aprox. R$50 por pessoa) com vista para as montanhas.
  Noite: Relaxe na pousada ou Airbnb e prepare um jantar romântico.
  Dia 3: Descobertas e Compras:
  
  Manhã: Passeio de teleférico (aprox. R$30 por pessoa) até o Morro do Elefante para apreciar vistas panorâmicas da cidade.
  Tarde: Explore as lojas de artesanato, roupas de inverno e chocolates na Vila Capivari.
  Noite: Jantar em um restaurante com música ao vivo e culinária internacional.
  Dia 4: Despedida Inesquecível:
  
  Manhã: Caminito pela Vila Capivari, curtindo o clima tranquilo e tomando um café da manhã especial.
  Retorno para Taubaté, levando lembranças e memórias da sua aventura nas montanhas.
  Gastos extras (R$ 300):
  
  Lembrancinhas, ingressos para museus ou atividades opcionais.
  Reserva (R$600):
  
  Imprevistos, despesas extras e flexibilidade para aproveitar oportunidades.
  Dicas para economizar:
  
  Viaje na baixa temporada (exceto julho e feriados) para aproveitar preços mais baixos em hospedagem e passagens.
  Pesquise promoções e pacotes em sites de viagens.
  Utilize o transporte público para se locomover pela cidade.
  Cozinhe algumas refeições na pousada ou Airbnb.
  Aproveite as atrações gratuitas, como parques e trilhas.
  Com planejamento e criatividade, vocês podem desfrutar de uma viagem inesquecível para Campos do Jordão, desfrutando do charme das montanhas sem ultrapassar o orçamento de R$3000. `
 ///console.log(TextForm)

 useEffect(() => {
    const runChat = async () => {
    
      if (form.localPartida.length > 0 && form.valorViagem.length > 0) {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
        const generationConfig = {
          temperature: 1,
          topK: 0,
          topP: 0.95,
          maxOutputTokens: 8192,
        };
  
        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];
  
        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [
            {
              role: "user",
              parts: [{ text: TextForm  }],
            },
            
          ],
        });
  
        const result = await chat.sendMessage("YOUR_USER_INPUT"); 
        setResponse(result.response);
      }
    };
  
    
    runChat();
  }, [form, form.localPartida, form.valorViagem]);

 //console.log(response.candidates[0].content.parts[0].text)
  return (
    <div>
      {response && <div dangerouslySetInnerHTML={{ __html: marked.parse(response.candidates[0].content.parts[0].text) }}></div>}
    </div>
  );
}

export default GeminiIA;