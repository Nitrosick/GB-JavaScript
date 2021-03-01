"use strict";

const chessBoard = document.querySelector('.chess-board');

function boardGenerate() {
    for (let row=1; row<=8; row++) {
        let tr = document.createElement('tr');

        for (let col=1; col<=8; col++) {
            let td = document.createElement('td');
            td.classList.add('board-cell');

            if (row % 2 != 0) {
                if (col % 2 != 0) {
                    td.classList.add('white-field');
                } else {
                    td.classList.add('black-field');
                }
            } else {
                if (col % 2 != 0) {
                    td.classList.add('black-field');
                } else {
                    td.classList.add('white-field');
                }
            }
            tr.appendChild(td);
        }
        chessBoard.appendChild(tr);
    }
}

function letterSings() {
    const firstRow = document.querySelectorAll('tr:nth-of-type(1) .board-cell');
    const letterArr = ['A','B','C','D','E','F','G','H'];

    for (let i=0; i<firstRow.length; i++) {
        let letter = document.createElement('span');
        letter.classList.add('letter-sing');
        letter.textContent = letterArr[i];
        firstRow[i].appendChild(letter);
    }
}

function numberSings() {
    const rows = document.querySelectorAll('tr');
    const firstCol = [];
    for (let r of rows) {
        firstCol.push(r.querySelector('.board-cell'));
    }

    for (let i=0; i<firstCol.length; i++) {
        let number = document.createElement('span');
        number.classList.add('number-sing');
        number.textContent = i+1;
        firstCol[i].appendChild(number);
    }
}

function disposalChessmans() {
    const blackBackRow = document.querySelectorAll('tr:nth-of-type(1) .board-cell');
    const blackFrontRow = document.querySelectorAll('tr:nth-of-type(2) .board-cell');
    const whiteFrontRow = document.querySelectorAll('tr:nth-of-type(7) .board-cell');
    const whiteBackRow = document.querySelectorAll('tr:nth-of-type(8) .board-cell');

    for (let i=0; i<blackFrontRow.length; i++) {
        blackFrontRow[i].classList.add('pawn');
        whiteFrontRow[i].classList.add('pawn');
    }
    for (let i=0; i<blackBackRow.length; i++) {
        if (i === 0 || i === 7) {
            blackBackRow[i].classList.add('rook');
            whiteBackRow[i].classList.add('rook');
        } else if (i === 1 || i === 6) {
            blackBackRow[i].classList.add('knight');
            whiteBackRow[i].classList.add('knight');
        } else if (i === 2 || i === 5) {
            blackBackRow[i].classList.add('bishop');
            whiteBackRow[i].classList.add('bishop');
        } else if (i === 3) {
            blackBackRow[i].classList.add('queen');
            whiteBackRow[i].classList.add('queen');
        } else if (i === 4) {
            blackBackRow[i].classList.add('king');
            whiteBackRow[i].classList.add('king');
        }
    }
}

function init() {
    boardGenerate();
    letterSings();
    numberSings();
    disposalChessmans();
}

init();
