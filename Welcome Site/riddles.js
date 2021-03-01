var answer1 = document.getElementById('userAnswer1');
var answer2 = document.getElementById('userAnswer2');
var answer3 = document.getElementById('userAnswer3');
var check = document.getElementById('check');
var info = document.getElementById('info');

var winCount = 0;

check.onclick = function() {
    if (answer1.value != '' && answer2.value != '' && answer3.value != '') {
        riddle(answer1.value, ['яйцо', 'яичко']);
        riddle(answer2.value, ['лампочка', 'лампа']);
        riddle(answer3.value, ['душ']);
        if (winCount == 0) {
            info.innerHTML = '<b>Вы не смогли правильно ответить ни на одну загадку</b>';
        } else {
            info.innerHTML = '<b>Количество правильных ответов: ' + winCount + '</b>';
        }
    } else {
        info.innerHTML = '<b>Вы ответили не на все загадки</b>';
    }
}

function riddle(answer, array) {
    for (let a of array) {
        if (a == answer.toLowerCase()) {
            winCount++;
        }
    }
}