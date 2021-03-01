"use strict";

let buttons = document.querySelectorAll('.task-button');
let a, b, sing, val, pow;

// Функция конвертирования температуры
let convert = (value) => {
    return (9 / 5) * +value + 32;
}

// Проверка знака переменной
let variablesSing = (a, b) => {
    if (a >= 0 && b >= 0) {return a-b;}
    else if (a < 0 && b < 0) {return a*b;}
    else if ((a < 0 && b >= 0) || (a >= 0 && b <0)) {return a+b;}
}

// Вывод чисел до 15
let lookNumbers = () => {
    a = parseInt(prompt('Введите число от 0 до 15'));
    if (a < 0 || a > 15) {
        alert('Число должно быть в промежутке от 0 до 15');
        lookNumbers();
    } else {
        let arr = [];
        for (let i=a; i<=15; i++) {
            arr.push(i);
        }
        alert(arr);
    }
}

// Основные математические операторы
let plusFunction = (a, b) => {
    return a+b;
}
let minusFunction = (a, b) => {
    return a-b;
}
let multiplyFunction = (a, b) => {
    return a*b;
}
let splitFunction = (a, b) => {
    return a/b;
}

let arithmetic = (a, b, sing) => {
    switch (sing) {
        case '+' : return plusFunction(a, b);
        case '-' : return minusFunction(a, b);
        case '*' : return multiplyFunction(a, b);
        case '/' : return splitFunction(a, b);
        default : return 'Введен недопустимый знак';
    }
}

// Функция возведения в степень
let power = (val, pow) => {
    if (pow === 1) {
        return val;
    } else {
        return val * power(val, pow - 1);
    }
}

// Функция преобразования числа в строку
let numToString = (num) => {
    if (num >= 0) {
        num = String(num);
        return num + ' (' + typeof num + ')';
    } else {
        return '(' + Math.abs(num) + ')';
    }
}

// Вывод простых чисел от 0 до 100 через while
let showHundred = () => {
    let arr = [];
    let i = 2;

    loopIteration:
    while (i <= 100) {
        for (let j=2; j<i; j++) {
            if (i % j === 0) {
                i++;
                continue loopIteration;
            }
        }
        arr.push(i);
        i++;
    }

    return arr;
}

// Вывод чисел без тела цикла
let emptyLoop = () => {
    for (let i=0; i<=9; console.log(i), i++) {}
}

// Пирамида из 'X'
let pyramid = () => {
    let x = 'x';
    for (let i=0; i<20; i++) {
        console.log(x);
        x += 'x';
    }
}

// Преобразование числа в объект
let numToObject = (num) => {
    let obj = {единицы: 0, десятки: 0, сотни: 0};
    if (num < 0 || num > 999) {
        console.log('Число должно быть в диапазоне от 0 до 999');
        return {};
    }
    obj.сотни = parseInt(num / 100);
    obj.десятки = parseInt((num - obj.сотни * 100) / 10);
    obj.единицы = parseInt(num - (obj.десятки * 10 + obj.сотни * 100));
    return obj;
}

// Корзина с товарами
let basket = {
    goods: [
        {name: 'Майка', price: 500, count: 2},
        {name: 'Кофта', price: 1750, count: 1},
        {name: 'Штаны', price: 1300, count: 2},
        {name: 'Шапка', price: 950, count: 1}
    ],
    getBasketPrice() {
        let total = 0;
        for (let g of this.goods) {
            total += g.price * g.count;
        }
        return total;
    }
}

for (let bt of buttons) {
    bt.onclick = function() {
        switch (bt.dataset.num) {
            case '1.1' :

            let value = +prompt('Введите значение градусов Цельсия для конветрации');
            alert(value + ' градусов по Цельсию = ' + convert(value) + ' градусов(а) по Фаренгейту');
            break;

            case '1.2' :

            let admin, name;
            name = 'Василий';
            admin = name;
            alert(admin);
            break;

            case '2.3' :

            a = +prompt('Введите первое число');
            b = +prompt('Введите второе число');
            alert(variablesSing(a, b));
            break;

            case '2.4' :

            lookNumbers();
            break;

            case '2.5/6' :

            a = +prompt('Введите первое число');
            b = +prompt('Введите второе число');
            sing = prompt('Введите один из знаков: + - * /');
            alert(arithmetic(a, b, sing));
            break;

            case '2.8' :

            val = +prompt('Введите число для возведения в степень');
            pow = +prompt('Введите степень');
            alert(power(val, pow));
            break;

            case '2.9' :
            a = +prompt('Введите число для преобразования');
            alert(numToString(a));
            break;

            case '3.1' :
            alert(showHundred());
            break;

            // case '3.2/3' :
            // alert(getBasketPrice(basket));
            // break;

            case '3.4' :
            emptyLoop();
            alert('Числа выведены в консоль');
            break;

            case '3.5' :
            pyramid();
            alert('Пирамида выведена в консоль');
            break;

            case '4.1' :
            a = +prompt('Введите число от 0 до 999');
            console.log(numToObject(a));
            break;

            case '4.2' :
            alert('Стоимость товаров в корзине - ' + basket.getBasketPrice() + '₽');
            break;
        }
    }
}
