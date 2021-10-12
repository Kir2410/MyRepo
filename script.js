'use strict';

let title;
let screens;
let screenPrice;
let adaptive;

const rollback = 15;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const asking = function() {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки" );
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
    screenPrice = +prompt("Сколько будет стоить данная работа?");

    while(!isNumber(screenPrice)) {
        screenPrice = +prompt("Сколько будет стоить данная работа?");
    }
    
    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function() {
    let sum = 0;
    let price;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }
    
        price = +prompt("Сколько это будет стоить?");

        while(!isNumber(price)) {
            price = +prompt("Сколько это будет стоить?");
        }

        sum += price;
    }

    return sum;
};


function getFullPrice() {
    return screenPrice + allServicePrices;
}

function getTitle(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = fullPrice - (fullPrice * (rollback/100));

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

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("Типы экранов: " + screens);
console.log("Стоимость услуги за вычетом отката: " + servicePercentPrice);
console.log("Полная стоимость: " + fullPrice);
console.log(screens.split(', '));

