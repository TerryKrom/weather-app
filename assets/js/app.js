let descricao = document.getElementById('descricao');
let tempLabel = document.getElementById('temp');
let windLabel = document.getElementById('vento');
let cityLabel = document.getElementById('nome');
let display = document.getElementById('display');
let container = document.querySelector('.container');
const apiKey = 'f17758115b7520522e0f1a7f9a7e3159';


//converting the API
const convertion = (temp) => {
    return (temp - 272).toFixed(0)
}

//translating all text to pt-br
const translate = async (txt) => {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '9b2173be03msh2c3c609ea6a9908p135302jsndc427fe44fce',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: 'pt',
            text: txt
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // Retorna o texto traduzido
        return result.data.translatedText;
    } catch (error) {
        console.error(error);
        return null;
    }
};

//Get weather information

const clear = () => {
    cityLabel.innerHTML='';
    tempLabel.innerHTML='';
    descricao.innerHTML='';
    windLabel.innerHTML='';
}

const getInfo = async (city) => {
    clear()
    // Seleciona o loader
    const loader = document.getElementById('loader');
    // Exibe o loader
    loader.style.display = 'block';

    let query = city ? city.trim().toLowerCase() : inputval.value.trim().toLowerCase();

    try {       
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`);
        const data = await response.json();
        
        console.log(data)
        if (data && data.name && data.weather && data.weather.length > 0 && data.main && data.wind) {
            let name = data['name'];
            let desc = data['weather']['0']['description'];
            let temperature = data['main']['temp'];
            let windSpeed = data['wind']['speed'];
            loader.style.display = 'none';
            
            // Traduzindo o texto
            let desc_pt = await translate(desc);

            cityLabel.innerHTML = `${name}`;
            tempLabel.innerHTML = `${convertion(temperature)}°`;
            descricao.innerHTML = `${desc_pt} <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16"> ...`;

            windLabel.innerHTML = `${windSpeed} KM/H <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16"> ...`;

            let animatedTexts = document.querySelectorAll('.animated');
            animatedTexts.forEach(e => {
                e.classList.toggle('appear');
            });
        } else {
            loader.style.display = 'none';
            if (inputval.classList.contains('shake')){
                inputval.classList.remove('shake')
                void inputval.offsetWidth;
            }
            inputval.classList.add('shake');
        }
    } catch (err) {
        console.error(err);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            let userCity = data.city;
            getInfo(userCity);
        })
        .catch(error => {
            console.error('Erro ao obter localização do IP:', error);
        });
});