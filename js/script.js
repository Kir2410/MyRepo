'use strict';

const title = document.getElementsByTagName('h1')[0];
const plus = document.querySelector('.screen-btn');
const percent = document.querySelectorAll('.other-items.percent');
const number = document.querySelectorAll('.other-items.number');
// const cmsOpen = document.querySelector('#cms-open');s
// const cmsSelect = document.querySelector('#cms-select');

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
        startBtn.addEventListener('click', this.start.bind(appData));
        resetBtn.addEventListener('click', this.reset.bind(appData));
        plus.addEventListener('click', this.addScreenBlock.bind(appData));
        inputRange.addEventListener('input', this.addRollback.bind(appData));
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        // appData.logger();
        this.showResults();
        inputRange.addEventListener('input', this.createRollback.bind(appData));
    },
    showResults: function () {
        total.value = this.screenPrice;
        totalCount.value = this.screenCount;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = +this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    addScreens: function () {
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';

        screens = document.querySelectorAll('div.screen');
        screens.forEach((screen, index) => {
            let select = screen.querySelector('select');
            let input = screen.querySelector('input');
            let selectName = select.options[select.selectedIndex].textContent;

            if (select.value !== "" && input.value !== "") {
                this.screens.push({
                    id: index,
                    name: selectName,
                    price: +select.value * +input.value,
                    count: +input.value
                });
                select.disabled = true;
                input.disabled = true;
            } else {
                console.log('Заполните пустые поля!');
                this.resetResults();
                this.screens = [];
                startBtn.style.display = 'block';
                resetBtn.style.display = 'none';
            };

        }, this);
        console.log(this.screens);
    },
    addServices: function () {
        percent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        }, this);

        number.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            // if (cmsOpen.checked) {
            //     document.querySelector('.hidden-cms-variants').style.display = 'flex';
            //     console.log(cmsSelect.value);

            //     // this.servicesNumber[label.textContent] = +input.value;
            // }
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        }, this);
    },
    addScreenBlock: function () {
        const cloneScreens = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreens);
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((total, elem) => {
            return total + elem.price;
        }, 0);
        this.screenCount = this.screens.reduce((total, elem) => {
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
        this.rollback = event.target.value;
    },
    createRollback: function (event) {
        this.rollback = event.target.value;
        totalCountRollback.value = this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },
    reset: function () {
        resetBtn.style.display = 'none';
        startBtn.style.display = 'block';

        percent.forEach(item => {
            item.querySelector('input[type=checkbox]').checked = false;
        });
        number.forEach(item => {
            item.querySelector('input[type=checkbox]').checked = false;
        });


        screens.forEach(screen => {
            screen.querySelector('select').disabled = false;
            screen.querySelector('input').disabled = false;
        });

        this.resetResults();
        this.resetScreenBlock();
        this.resetRollback();
    },
    resetResults: function () {
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
        this.screens.splice(1);

        screens.forEach(screen => {
            let select = screen.querySelector('select');
            let input = screen.querySelector('input');

            select.value = "";
            input.value = "";
        })
    },
    resetRollback: function () {
        inputRange.value = 0;
        inputRangeValue.textContent = 0 + " %";
        this.rollback = 0;
    },

    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
        console.log("screenPrice методом reduce: " + this.screenPrice);
        console.log(this.services);

        for (let prop in this) {
            console.log(prop + " = " + this[prop]);
        }
    }
};

appData.init();