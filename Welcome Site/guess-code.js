var answer = document.getElementById('userAnswer');
var info = document.getElementById('info');
var button = document.getElementById('button');
var numbers = document.getElementById('numbers');

var number = Math.round(Math.random() * 100);
var player = 1;

info.innerHTML = 'Введите число от 0 до 100, угадывает игрок ' + player;

button.onclick = function() {
    if (parseInt(answer.value) == number) {
        info.innerHTML = 'Поздравляем! Игрок ' + player + ' победил!';
        button.style.display = 'none';
    } else if (parseInt(answer.value) < number) {
        player = player == 1 ? 2 : 1;
        info.innerHTML = 'Число слишком маленькое, угадывает игрок ' + player;
        numbers.innerHTML = numbers.innerHTML + answer.value + ' ';
        answer.value = '';
    } else {
        player = player == 1 ? 2 : 1;
        info.innerHTML = 'Число слишком большое, угадывает игрок ' + player;
        numbers.innerHTML = numbers.innerHTML + answer.value + ' ';
        answer.value = '';
    }
}