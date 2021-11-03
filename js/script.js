'use strict';

const title = document.getElementsByTagName('h1')[0];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback').querySelector('.range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('div.screen');

const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    screenCount: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        plus.addEventListener('click', appData.addScreenBlock);
        inputRange.addEventListener('input', appData.addRollback);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();
        appData.showResults();
    },
    showResults: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.screenCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = +appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('div.screen');
        screens.forEach(function (screen, index) {
            let select = screen.querySelector('select');
            let input = screen.querySelector('input');
            let selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });

        });
    },
    addServices: function () {
        percent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            // console.log(check);
            // console.log(label);
            // console.log(input);

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        number.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            // console.log(check);
            // console.log(label);
            // console.log(input);

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });

    },
    addScreenBlock: function () {
        const cloneScreens = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreens);
    },

    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (total, elem) {
            return total + elem.price;
        }, 0);
        appData.screenCount = appData.screens.reduce(function (total, elem) {
            return total + elem.count;
        }, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));


    },

    addRollback: function (event) {
        console.log(event.target.value);
        inputRangeValue.textContent = event.target.value + " %";
        appData.rollback = event.target.value;
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

appData.init();