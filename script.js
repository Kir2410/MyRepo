let title = 'MyRepo';
let screens = 'Простые, Сложные, Интерактивные';
let screenPrice = 2500;
const rollback = 68;
let fullPrice = 10000;
let adaptive = true;

// alert("Hello world!");

console.log('First console message');

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");

console.log(screens.toLowerCase());

console.log(fullPrice * (rollback/100));

title = prompt("Как называется ваш проект?");
console.log(title);

screens = prompt("Какие типы экранов нужно разработать?");
console.log(screens);

screenPrice = prompt("Сколько будет стоить данная работа?");
console.log(screenPrice);

adaptive = !!prompt("Нужен ли адаптив на сайте?");
console.log(adaptive);

let service1 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service1);

let servicePrice1 = prompt("Сколько это будет стоить?");
console.log(servicePrice1);

let service2 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service2);

let servicePrice2 = prompt("Сколько это будет стоить?");
console.log(servicePrice2);

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));
console.log(servicePercentPrice);

if (fullPrice >= 30000) {
    console.log("Даем скидку в 10%"); 
} else {
    if (fullPrice >= 15000 && fullPrice < 30000) {
        console.log("Даем скидку в 5%"); 
    } else {
        if (fullPrice < 15000 && fullPrice >= 0) {
            console.log("Скидка не предусмотрена"); 
        } else {
            console.log("Что-то пошло не так");
        }
    }
}