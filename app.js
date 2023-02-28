let inputval = document.querySelector('#cidade-in')
let btn = document.querySelector('#add')
let city = document.querySelector('#cidade-out')
let descricao = document.querySelector('#descricao')
let temp = document.querySelector('#temp')
let vento = document.querySelector('#vento')
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
        city.innerHTML=`Cidade: ${name}`
        temp.innerHTML=`Temperatura: ${conversao(temperatura)}°C`
        descricao.innerHTML=`Condições: ${descrip_pt}`
        vento.innerHTML=`Velocidade do Vento: ${v_vento} KM/H`
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
        title.style.color='#fff'
        element.style.backgroundImage='url(./evening.jpg)'
    }
    else{
        title.style.color='#ffffff'
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
