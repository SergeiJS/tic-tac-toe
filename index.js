var area = document.getElementById('area'); //присваиваю переменной элемент div с id area
var cell = document.getElementsByClassName('cell'); //объявляю переменную для ячейки 
var currentPlayer = document.getElementById('currentPl'); //переменная для текущего игрока
var whoWins = document.getElementById('whoWins'); //переменная для выведения победителя на экране
var roundHistory = []; //массив для сохранения истории предыдущих раундов
var player = "X"; //объявляю переменную для хода игрока со строкой Х
var ai = "O";
var stat = { //объект для выведения статистики
    'X': 0,
    'O': 0,
    'D': 0,
}
var winCombination = [ //создаю массив для определения выигрышных комбинаций
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

for (var i = 1; i <= 9; i++) { //добавляю 9 ячеек div в DOM
    area.innerHTML += "<div class='cell ' pos=" + i +"></div>"
};

for (var i = 0; i < cell.length; i++) { //прохожусь циклом по всем ячейкам
    cell[i].addEventListener('click', cellOnclick, false); //обработчик событий по клику на ячейку. 
    //имя события клик, вызываться будет функция cellOnclick при всплытии
}

function cellOnclick() { //функция клика по ячейке

    var data = [];

    if (!this.innerHTML) { //определяю условие, при котором если ячейка не занята, то ставится Х
        this.innerHTML = player;
    } else {
        alert('ячейку уже заняли'); //если занята, то выводится предупреждение
        return;
    }

    for (var i in cell) {
        if(cell[i].innerHTML == player) {
            data.push(parseInt(cell[i].getAttribute('pos'))); //если в ячейке есть позиция текущего игрока, то добавляем данные в массив
        } 
    }

    if (checkWinner(data)) {//задаю поведение при победе и ничьей
        stat[player] += 1; //увеличиваем значение при победе в таблице статистики
        whoWins.innerHTML = ' Победа ' + [player]; //выводим победителя в "Результат игры"
        roundHistory.push(whoWins.innerHTML); //записываем победу х или о в "Историю игр"
        refresh(); //очищаю поле после победы игрока и вывожу сообщение кто победил
    } else { //логика ничьей
        var draw = true; 
        for (var i in cell) {
            if (cell[i].innerHTML == '') draw = false;
            
        }

        if(draw) {
            stat.D += 1;
            refresh();
            whoWins.innerHTML = ' Ничья '; //выводим ничью в "Результат игры"
            roundHistory.push(whoWins.innerHTML); //выводим ничью в "Историю игр"
        }
    }



    player = player == "X" ? "O" : "X"; //после каждого хода меняю игрока
    currentPlayer.innerHTML = player.toLocaleUpperCase(); //вывожу текущего игрока
}


function checkWinner(data) { //функция проверки выигрышных позиций через массив winCombination
    for (var i in winCombination) {
        var win = true;
        for (var j in winCombination[i]) {
            var id = winCombination[i][j];
            var ind = data.indexOf(id);

            if(ind == -1) {
                win = false;
            }
        }
        if (win) return true;
    }
    return false;
}

function refresh() { //функция очистки игрового поля после окончания раунда
    for (var i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    updateStat(); //добавляем значение в "Статистику"
    updateRoundHistory(); //добавляем значение в "Историю игр"
}

function updateStat () {//функция добавления значения в "Статистику"в зависимости от окончания раунда
    document.getElementById('sX').innerHTML = stat.X;
    document.getElementById('sO').innerHTML = stat.O;
    document.getElementById('sD').innerHTML = stat.D;
}

function updateRoundHistory() { //функция добавления результатов раунда в "Историю игр"
    document.getElementById('roundHistory').innerHTML = roundHistory;
}

/*function zero() {
    data = [];
    var idx = randomInteger();

    if (!this.innerHTML) { //определяю условие, при котором если ячейка не занята, то ставится Х
        this.innerHTML = ai;
    } else {
        alert('ячейку уже заняли'); //если занята, то выводится предупреждение
        return;
    }

    for (idx in cell) {
        if(cell[idx].innerHTML == ai) {
            data.push(parseInt(cell[idx].getAttribute('pos'))); //если в ячейке есть позиция текущего игрока, то добавляем данные в массив
        } 
    }
        
}

function randomInteger() {
    var min = 1;
    var max = 9;
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
alert(randomInteger());*/