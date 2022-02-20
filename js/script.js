// login ↓↓ 
const loginForm = document.querySelector("#jsLoginForm");
const loginInput = document.querySelector("#jsLoginForm input")
const hello = document.querySelector("#jsHello");

function onLogin(e){
    e.preventDefault();
    loginForm.classList.add("hidden");
    const userNameWrite = loginInput.value;
    localStorage.setItem("userName", userNameWrite);
    showName(userNameWrite);
}

function showName(userName){
    hello.innerText = `Hello ${userName} :)`;
    hello.classList.remove("hidden");
}

const userNameSave = localStorage.getItem("userName");

if(userNameSave === null){
    loginForm.classList.remove("hidden");
    loginForm.addEventListener("submit", onLogin);
}else{
    showName(userNameSave);
}

// clock ↓↓
const today = document.querySelector("#jsToday");
const clock = document.querySelector("#jsClock");

function onClock(){
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekend = week[date.getDay()];
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const secondes = String(date.getSeconds()).padStart(2,"0");

    today.innerText = `${year}-${month}-${day} ${weekend}`;
    clock.innerText = `${hours}:${minutes}:${secondes}`;
}

onClock();
setInterval(onClock, 1000);

// dialogues ↓↓
const quotes = [
    {
        quote: "To die would be an awfully big adventure",
        movie: "Peter Pan, 2003"
    },
    {
        quote: "There's no place like home",
        movie: "The Wizard of Oz"
    },
    {
        quote: "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.",
        movie: "Harry Potter, 2001"
    },
    {
        quote: "My life, my life has got to be like this. It's got to keep going up.",
        movie: "The Great Gatsby, 2013"
    },
    {
        quote: "People should not be afraid of their goverments. Goverments should be afraid of their people.",
        movie: "V For Vendetta, 2005"
    },
    {
        quote: "Today is the first day of the rest of your life.",
        movie: "American Beauty, 1999"
    },
    {
        quote: "The past can hurt. But from the way I see it, you can either run from it, or learn from it",
        movie: "Lion King, 1994"
    },
    {
        quote: "Manners Maketh Man",
        movie: "Kingsman: The Secret Service, 2015"
    },
    {
        quote: "I've always found it best not to look into the past.",
        movie: "Black Widow, 2021"
    },
    {
        quote: "「八大地獄之最, 稱為無間地獄, 為無間斷遭受大苦之意,故有此名。」",
        movie: "Infernal Affairs, 2002"
    }
    
]
const quote = document.querySelector("#jsQuote p:first-child");
const movie = document.querySelector("#jsQuote p:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
movie.innerText = todaysQuote.movie;

// weather ↓↓
const API_KEY = "ddb0b49fda0e01fd15f63dff92b9e299";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = document.querySelector("#jsWeather span");
        
        weather.classList.remove("hidden");
        weather.innerText = `${data.name} | ${Math.floor(data.main.temp)}℃ | ${data.weather[0].main}`;
        
    }); 
}
function onGeoError(){
    const noWeather = document.querySelector("#jsWeather p");
    noWeather.classList.remove("hidden");    
    alert("I cannot find you. No weather for you :(");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// background-img ↓↓
const bgImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg", "09.jpg", "10.jpg"];
const chooseImg = bgImgs[Math.floor(Math.random() * bgImgs.length)];
const showBgImg = document.querySelector(".container");

showBgImg.style.backgroundImage = `url(./imgs/${chooseImg})`;

// toDoList ↓↓
const toDoForm = document.querySelector("#jsToDoForm");
const toDoInput = document.querySelector("#jsToDoForm input");
const toDoList = document.querySelector("#jsToDoList");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function showToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const aBtn = document.createElement("button");
    aBtn.innerText = "❌";
    aBtn.addEventListener("click", deleteToDo);
    aBtn.style.backgroundColor = 'none';
    li.appendChild(span);
    li.appendChild(aBtn);
    toDoList.appendChild(li);
}

function handleTodoSubmit(e){
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        text: newTodo,
        id: Date.now()
    }
    toDos.push(newToDoObj);
    showToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleTodoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(showToDo);
}