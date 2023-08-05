let inputval = document.querySelector('#cidade-in')
let btn = document.querySelector('#add')
let descricao = document.querySelector('#descricao')
let temp = document.querySelector('#temp')
let vento = document.querySelector('#vento')
let display = document.getElementById('display')
let nome = document.getElementById('nome')

let input_mobile = document.getElementById('mobile-in')
let btn_mobile = document.getElementById('add-mobile')

const apik = 'f17758115b7520522e0f1a7f9a7e3159'
let container = document.querySelector('.container')
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
são poucas palavras a serem traduzidas, não houve problema em ser feito
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

const getInfo = () => {
    let query = inputval.value.trim().toLowerCase() || input_mobile.value.trim().toLowerCase();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apik}`)

    .then(res => res.json())
    .then(data => {
        if (data && data.name && data.weather && data.weather.length > 0 && data.main && data.wind) {
            let name = data['name']
            let descrip = data['weather']['0']['description']
            let temperatura = data['main']['temp']
            let v_vento = data['wind']['speed']
            let descrip_pt = translate(descrip)
            nome.innerHTML=`${name}`
            temp.innerHTML=`${conversao(temperatura)}°`
            descricao.innerHTML=`${descrip_pt} <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16">
          <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z"/>
          <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
        </svg>`
            vento.innerHTML=`${v_vento} KM/H <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
          </svg>`
            let animatedTexts = document.querySelectorAll('.animated')
            animatedTexts.forEach(e => {
                e.classList.toggle('appear')

                })
        }else{
            inputval.classList.add('shake')
            input_mobile.classList.add('shake')
        }
    })
    .catch(err => console.error(err))
    inputval.classList.remove('shake')
    input_mobile.classList.remove('shake')
}

//Aqui adicionamos a função para que tambem o app tambem funcione
//Clicando com o ENTER

btn.addEventListener('click', getInfo);
btn_mobile.addEventListener('click', getInfo)

document.body.addEventListener('keypress', function(e){
    if(e.code === "Enter"){
        getInfo()
    }
})

if(window.screen.width <= 400){
    document.body.addEventListener('keypress', function(e){
        if(e.code === "Enter"){
            getInfo()
        }
    })
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleMobile = document.querySelector('#check-mobile')

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');

    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
toggleMobile.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        toggleMobile.checked = true;
    }
}

