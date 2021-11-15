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
        this.addTitle();
        startBtn.addEventListener('click', this.start);
        resetBtn.addEventListener('click', this.reset);
        plus.addEventListener('click', this.addScreenBlock);
        inputRange.addEventListener('input', this.addRollback);
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
        inputRange.addEventListener('input', appData.createRollback);

        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    },
    showResults: function () {
        total.value = this.screenPrice;
        totalCount.value = this.screenCount;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = +this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    addScreens: function () {
        screens = document.querySelectorAll('div.screen');
        screens.forEach(function (screen, index) {
            let select = screen.querySelector('select');
            let input = screen.querySelector('input');
            let selectName = select.options[select.selectedIndex].textContent;

            if (select.value !== "" && input.value !== "") {
                appData.screens.push({
                    id: index,
                    name: selectName,
                    price: +select.value * +input.value,
                    count: +input.value
                });
            } else {
                alert('Заполните пустые поля!');
                this.addScreens();
            }
            select.disabled = true;
            input.disabled = true;
        });
    },
    addServices: function () {
        percent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        number.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

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
        this.screenPrice = this.screens.reduce(function (total, elem) {
            return total + elem.price;
        }, 0);
        this.screenCount = this.screens.reduce(function (total, elem) {
            return total + elem.count;
        }, 0);

        for (let key in appData.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));


    },
    addRollback: function (event) {
        inputRangeValue.textContent = event.target.value + " %";
        appData.rollback = event.target.value;
    },
    createRollback: function (event) {
        appData.rollback = event.target.value;
        totalCountRollback.value = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    reset: function () {
        // сбросить результаты
        appData.resetResults();

        // сбросить все введенные значения
        percent.forEach(function (item) {
            item.querySelector('input[type=checkbox]').checked = false;
        });
        number.forEach(function (item) {
            item.querySelector('input[type=checkbox]').checked = false;
        });

        // удалить лишние блоки
        appData.resetScreenBlock();

        // заблокировать поля ввода
        screens.forEach(function (screen) {
            screen.querySelector('select').disabled = false;
            screen.querySelector('input').disabled = false;
        });

        // сбросить range
        appData.resetRollback();

        // скрыть сброс и раскрыть расчитать
        resetBtn.style.display = 'none';
        startBtn.style.display = 'block';

        console.log(appData.screens);
        console.log(screens);

    },
    resetResults: function (){
        total.value = 0;
        totalCount.value = 0;
        totalCountOther.value = 0;
        fullTotalCount.value = 0;
        totalCountRollback.value = 0;
        this.screenPrice = 0;
        this.screenCount = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
    },
    resetScreenBlock: function () {
        let count = screens.length - 1;
        while (count != 0) {
            screens[count].remove();
            count--;
        };
        screens = document.querySelectorAll('div.screen');
        appData.screens.splice(1);

        screens.forEach(function (screen) {
            let select = screen.querySelector('select');
            let input = screen.querySelector('input');

            select.value = "";
            input.value = ""; 
        })
    },    
    resetRollback: function () {
        inputRange.value = 0;
        inputRangeValue.textContent = 0 + " %";
        appData.rollback = 0;
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