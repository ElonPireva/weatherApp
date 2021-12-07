// 2a20497e1087e9cb7de9433c046c3691 api key from OpenWeatherMap
const getMsg = document.querySelector('.msg');
const h3 = document.createElement('h3');
h3.id = 'txtMsg';
const getInput = document.getElementById('input');
const btn = document.getElementById('btn');
const cityName = document.getElementById('cityName');
const getTime = document.getElementById('time');
const temperature = document.getElementById('temp');
const desc = document.getElementById('desc');
const windSpeed = document.getElementById('windSpeed');
const windDegree = document.getElementById('windDegree');
const getIcon = document.getElementById('weatherIcon');

btn.addEventListener('click', () => {
    if(getInput.value === '' || getInput.value === undefined){
        h3.innerHTML = 'Please Enter City Name to check weather information';
        getMsg.appendChild(h3);
        setTimeout(() => {
            getMsg.removeChild(h3);
        },1600);
    }
    else {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${getInput.value}&appid=2a20497e1087e9cb7de9433c046c3691`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data);
        const {temp} = data.main;
        const toCelcius = temp - 273.15;
        const getDataIconAndDesc = data.weather[0];
        const {speed,deg} = data.wind;
        cityName.innerHTML = data.name;
        temperature.innerHTML = toCelcius.toFixed(0);
        desc.innerHTML = getDataIconAndDesc.description;
        const iconurl = "http://openweathermap.org/img/w/" + getDataIconAndDesc.icon + ".png";
        getIcon.src = iconurl;
        windSpeed.innerHTML = 'Speed ' +  speed;
        windDegree.innerHTML = 'Degree ' + deg;
        setInterval(() => {
            time();
        },1000);
    }).catch(err => {
        h3.innerHTML = 'City not found. Please enter correct information';
        getMsg.appendChild(h3);
        setTimeout(() => {
            getMsg.removeChild(h3);
        },1600);
    })
    }
});

function time(){
    let date = new Date();
    let hrs,mins,secs;
    hrs = date.getHours();
    mins = date.getMinutes();
    secs = date.getSeconds();

    mins < 10 ? mins = '0' + mins : mins;
    secs < 10 ? secs = '0' + secs : secs;

    getTime.innerHTML = hrs + ':' + mins + ':' + secs;
};
