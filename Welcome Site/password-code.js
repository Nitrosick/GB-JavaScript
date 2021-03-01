var pasLength = document.getElementById('pasLength');
var button = document.getElementById('button');
var password = document.getElementById('password');

var symbols = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];

button.onclick = function() {
    if (parseInt(pasLength.value) < 5) {
        password.innerHTML = 'Длина пароля должна быть не менее 5 символов';
    } else if (isNaN(pasLength.value)) {
        password.innerHTML = 'Введите длину пароля, а не белиберду';
    } else {
        password.innerHTML = 'Пароль сгенерирован:<b> ' + generate(pasLength.value) + '</b>';
    }
}

function randomNumber(max) {
    return Math.round(Math.random() * max);
}

function generate(n) {
    var text = '';
    for (let i = 0; i < n; i++) {
        text += symbols[randomNumber(symbols.length - 1)];
    }
    return text;
}