let inputval = document.querySelector('#cidade-in')
let btn = document.querySelector('#add')
let descricao = document.querySelector('#descricao')
let temp = document.querySelector('#temp')
let vento = document.querySelector('#vento')
let display = document.getElementById('display')
let apik = 'f17758115b7520522e0f1a7f9a7e3159'
//acessando todos os inputs e a API key da API que será utilizada


//conversão da temperatura que é coletada pela API

const conversao = (num) => {
    return (num - 272).toFixed(0)
}

/*
-- nesta função, optei pelo caminho mais simples pra esse projeto.

-- a descrição que é coletada da API é passada como parâmetro
para essa função, que identifica qual clima esta sendo informado
e troca para PT-BR

-- eu poderia fazer um sistema mais funcional, mas como nesse projeto
são poucas palavras a serem traduzidas, não ho0uve problema em ser feito
dessa forma.
*/

const translate = (txt) => {
    if(txt == 'broken clouds' || txt == 'mist'){
        return 'Nublado'
    }
    if(txt == 'overcast clouds'){
        return 'Nuvens Carregadas'
    }
    if(txt == 'light rain'){
        return 'Chuva Fraca'
    }
    if(txt == 'few clouds' || txt == 'scattered clouds'){
        return 'Parcialmente Nublado'
    }
    if(txt == 'clear sky'){
        return 'Tempo Limpo'
    }
    if(txt == 'light snow' || txt == 'snow'){
        return 'Neve'
    }
}
/*
    -- essa é a função principal do app, que realiza a função fetch do JS
    para executar o Request da API, utilizando a API key anteriormente
    salva.

*/
const info = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
    .then(res => res.json())

/*
    Logo após capturar os dados necessários, jogamos os dados dentro
    dos inputs que acessamos.
    Caso tenha algum erro, a função catch executa´ra um alert()    
*/
    .then(data => {
        let name = data['name']
        let descrip = data['weather']['0']['description']
        let temperatura = data['main']['temp']
        let v_vento = data['wind']['speed']
        let descrip_pt = translate(descrip)
        temp.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-thermometer" viewBox="0 0 16 16">
        <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0zM6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15V2.5z"/>
      </svg>
      ${conversao(temperatura)}°C`
        descricao.innerHTML=`&nbsp;&nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16">
        <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
        <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
      </svg>
      ${descrip_pt}`
        vento.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
      </svg>
      ${v_vento} KM/H`
    })
    .catch(err => alert('Cidade não encontrada!'))
}

//Aqui adicionamos a função para que tambem o app tambem funcione
//Clicando com o ENTER

btn.addEventListener('click', info)
document.body.addEventListener('keypress', function(e){
    if(e.code === "Enter"){
        info()
    }
})

//A função daytime adiciona o relógio ao carrregar a página, e
//Altera o Plano de fundo de acordo com o Horário
const daytime = () => {
    clock()
    let element = document.querySelector('.container');
    let title = document.querySelector('.title')
    let data = new Date
    let horas = data.getHours()
    if(horas >= 5 && horas < 17){
        title.style.color='#e6e607'
        element.style.backgroundImage='url(./day.jpg)'
    }else if(horas >= 17 && horas < 20){
        inputval.style.borderColor="#7e0e3b"
        btn.style.borderColor="#7e0e3b"
        btn.style.color="#7e0e3b"
        display.style.borderColor="#7e0e3b"
        title.style.color='#fff'
        element.style.backgroundImage='url(./evening.jpg)'
    }
    else{
        inputval.style.borderColor="#8b1f99"
        btn.style.borderColor="#8b1f99"
        btn.style.color="#8b1f99"
        display.style.borderColor="#8b1f99"
        title.style.color='#fff'
        element.style.backgroundImage='url(./night.png)'
    }
}
/*
    Aqui criamos nosso relógio, coletando o horário com o constructor
    Date.
    E adicionando 0 em números menores do que 10 para manter o padrão
    de 6 digitos.
    Logo após a criação da função, executamos a cada 1s com o setInterval()
*/
const clock = () => {
    let title = document.querySelector('.title')
    let data = new Date
    let h = data.getHours()
    let m = data.getMinutes()
    let s = data.getSeconds()
    title.innerHTML=`${h}:${m}:${s}`
    if(h < 10){
        title.innerHTML=`0${h}:${m}:${s}`
    }
    if(m < 10){
        title.innerHTML=`${h}:0${m}:${s}`    
    }
    if(s < 10){
        title.innerHTML=`${h}:${m}:0${s}`
    }
}

setInterval(clock, 1000)
