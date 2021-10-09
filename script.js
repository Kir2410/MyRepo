'use strict';

const rollback = 15;
const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");

const getAllServicePrices = function() {
    return servicePrice1 + servicePrice2;
};

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const allServicePrices = getAllServicePrices();
const fullPrice = getFullPrice();
const servicePercentPrice = fullPrice - (fullPrice * (rollback/100));

function getTitle(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

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

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log("Типы экранов: " + screens);
console.log("Стоимость услуги за вычетом отката: " + servicePercentPrice);
console.log("Полная стоимость: " + fullPrice);
console.log(screens.split(', '));

