let descLabel = document.getElementById('descricao');
let tempLabel = document.getElementById('temp');
let windLabel = document.getElementById('vento');
let cityLabel = document.getElementById('nome');
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

let animatedTexts = document.querySelectorAll('.animated');

const clear = () => {
    cityLabel.innerHTML = '';
    tempLabel.innerHTML = '';
    descLabel.innerHTML = '';
    windLabel.innerHTML = '';
    animatedTexts.forEach(e => {
        if (e.classList.contains('appear')) {
            e.classList.remove("appear");
        }
    })
}

const icons = {
    'nuvens': 'cloud',
    'limpo': 'sun',
    'neve': 'snowflake',
}

const findIcon = (text) => {
    let findedIcon;
    let texto = String(text).trim().toLowerCase();

    for (const key in icons) {
        if (texto.includes(key)) {
            findedIcon = icons[key];
            break
        }
    }
    if (findedIcon !== undefined) {
        return findedIcon;
    }
    else{
        return 'cloud';
    }
}

const getInfo = async (city) => {
    clear()
    // Seleciona o loader
    const loader = document.getElementById('loader');
    // Exibe o loader
    loader.style.display = 'block';

    let query = city.trim().toLowerCase();

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`);

        const data = await response.json();

        if (data && data.name && data.weather && data.weather.length > 0 && data.main && data.wind) {
            let name = data['name'];
            let desc = data['weather']['0']['description'];
            let temperature = data['main']['temp'];
            let windSpeed = data['wind']['speed'];
            loader.style.display = 'none';

            // Traduzindo o texto
            let descPT = await translate(desc);
            let namePT = await translate(name);

            cityLabel.innerHTML = `${namePT}`;
            tempLabel.innerHTML = `${convertion(temperature)}°`;
            descLabel.innerHTML = `${descPT}
                <span class="fa fa-${findIcon(descPT)}"></span>
            `;

            windLabel.innerHTML = `${windSpeed} KM/H
                <span class="fa fa-wind"></span>
            `;

            animatedTexts.forEach(e => {
                e.classList.add('appear');
            });

        } else {
            loader.style.display = 'none';
            getInfoByIP(); // Chama getInfoByIP em caso de erro na requisição
        }
    } catch (err) {
        console.error('Erro ao obter informações meteorológicas:', err);
    }
};

const getInfoByIP = () => {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            let userCity = data.city;
            getInfo(userCity);
        })
        .catch(error => {
            console.error('Erro ao obter localização do IP:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    getInfoByIP();
});