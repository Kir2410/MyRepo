'use strict';

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
            while (isNumber(appData.title)) {
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
            let name = prompt("Какой дополнительный тип услуги нужен?");
            while (isNumber(appData.title)) {
                name = prompt("Какой дополнительный тип услуги нужен?");
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
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

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

        for (let prop in appData) {
            console.log(prop + " = " + appData[prop]);
        }
    }
};

let isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

appData.start();