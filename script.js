'use strict';

const appData = {
    title: "",
    screens: "",
    screenPrice: 0,
    adaptive: true,
    rollback: 15,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: "",
    service2: "",
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
        appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
        while (!appData.isNumber(appData.screenPrice)) {
            appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
        }
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },

    getTitle: function (str) {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
    },

    getAllServicePrices: function () {
        let sum = 0;
        let price;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
            }
            price = +prompt("Сколько это будет стоить?");
            while (!appData.isNumber(price)) {
                price = +prompt("Сколько это будет стоить?");
            }
            sum += price;
        }
        return sum;
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

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
        appData.title = appData.getTitle();
        appData.logger();
    },

    logger: function () {
        for (var prop in appData) {
            console.log(prop + " = " + appData[prop]);
        }
    }
};

appData.start();