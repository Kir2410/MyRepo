'use strict';

const calculate = document.getElementsByTagName('h1')[0];
const buttons = document.getElementsByClassName('handler_btn');
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input');
const span = document.querySelector('.rollback').querySelector('.range-value');

const input1 = document.getElementsByClassName('total-input')[0];
const input2 = document.getElementsByClassName('total-input')[1];
const input3 = document.getElementsByClassName('total-input')[2];
const input4 = document.getElementsByClassName('total-input')[3];
const input5 = document.getElementsByClassName('total-input')[4];

let screenQuery = document.querySelectorAll('div.screen');

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.getTitle();
        appData.logger();
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        while (isNumber(appData.title)) {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        }
        for (let i = 0; i < 2; i++) {
            let name = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
            while (isNumber(name)) {
                name = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
            }
            let price = +prompt("Сколько будет стоить данная работа?");
            while (!isNumber(price)) {
                price = +prompt("Сколько будет стоить данная работа?");
            }

            appData.screens.push({
                id: i,
                name: name,
                price: price
            });
        }

        for (let i = 0; i < 2; i++) {
            let name = i + 1 + ". ";
            name += prompt("Какой дополнительный тип услуги нужен?");
            while (isNumber(name)) {
                name += prompt("Какой дополнительный тип услуги нужен?");
            }
            let price = 0;
            price = prompt("Сколько это будет стоить?");
            while (!isNumber(price)) {
                price = prompt("Сколько это будет стоить?");
            }
            appData.services[name] = +price;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (total, elem) {
            return total + elem.price;
        }, 0);

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },

    getServicePercentPrice: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },

    getTitle: function (str) {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },

    getRollbackMessage: function (price) {
        if (price >= 30000) {
            console.log("Даем скидку в 10%");
        } else {
            if (price >= 15000 && price < 30000) {
                console.log("Даем скидку в 5%");
            } else {
                if (price < 15000 && price >= 0) {
                    console.log("Скидка не предусмотрена");
                } else {
                    console.log("Что-то пошло не так");
                }
            }
        }
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log("screenPrice методом reduce: " + appData.screenPrice);
        console.log(appData.services);

        for (let prop in appData) {
            console.log(prop + " = " + appData[prop]);
        }
    }
};

let isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

appData.start();