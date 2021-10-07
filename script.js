const rollback = 68;
const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = prompt("Сколько будет стоить данная работа?");
const adaptive = !!prompt("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = prompt("Сколько это будет стоить?");
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));

console.log(title);
console.log(screens);
console.log(screenPrice);
console.log(adaptive);
console.log(service1);
console.log(servicePrice1);
console.log(service2);
console.log(servicePrice2);
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