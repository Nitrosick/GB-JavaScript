"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 3,
    winFoodCount: 50,
    obstacles: 5,
};

const config = {
    settings,
    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {return this.settings.rowsCount;},

    getColsCount() {return this.settings.colsCount;},

    getSpeed() {return this.settings.speed;},

    getWinFoodCount() {return this.settings.winFoodCount;},

    getObstacles() {return this.settings.obstacles;},

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        if (this.getObstacles() < 1 || this.getObstacles() > 20) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение obstacles должно быть в диапазоне [1, 20].');
        }
        return result;
    },
};

const map = {
    cells: null,
    usedCells: [],
    snakeImage: null,

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';
        this.snakeImage = 'snakeHead-up';
        obstacle.generateObstacles();

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? this.snakeImage : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        for (let o of obstacle.getObstacles()) {
            const obstacleCell = this.cells[`x${o.x}_y${o.y}`];
            obstacleCell.classList.add('obstacle');
            this.usedCells.push(obstacleCell);
        }
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,
    scoreField: null,
    speed: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
        this.speed = config.getSpeed();
        this.scoreField = document.getElementById('score');
    },

    getBody() {return this.body;},

    getLastStepDirection() {return this.lastStepDirection;},

    isOnPoint(point) {return this.getBody().some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);},

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.body.length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.getBody().push(lastBodyPointClone);
        this.speedUp();
        this.scoreField.textContent = `Счёт: ${this.getScore()}`;
    },

    speedUp() {
        this.speed += 0.5;
        clearInterval(game.tickInterval);
        game.tickInterval = setInterval(() => game.tickHandler(), 1000 / this.speed);
    },

    resetSpeed() {
        this.speed = config.getSpeed();
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch(this.direction) {
            case 'up':
                map.snakeImage = 'snakeHead-up';
                if (firstPoint.y - 1 < 0) {
                    return {x: firstPoint.x, y: config.getRowsCount()-1};
                } else {
                    return {x: firstPoint.x, y: firstPoint.y - 1};
                }
            case 'right':
                map.snakeImage = 'snakeHead-right';
                if (firstPoint.x + 1 > config.getColsCount()-1) {
                    return {x: 0, y: firstPoint.y};
                } else {
                    return {x: firstPoint.x + 1, y: firstPoint.y};
                }
            case 'down':
                map.snakeImage = 'snakeHead-down';
                if (firstPoint.y + 1 > config.getRowsCount()-1) {
                    return {x: firstPoint.x, y: 0};
                } else {
                    return {x: firstPoint.x, y: firstPoint.y + 1};
                }
            case 'left':
                map.snakeImage = 'snakeHead-left';
                if (firstPoint.x - 1 < 0) {
                    return {x: config.getColsCount()-1, y: firstPoint.y};
                } else {
                    return {x: firstPoint.x - 1, y: firstPoint.y};
                }
        }
    },

    setDirection(direction) {this.direction = direction;},

    getScore() {return map.usedCells.length - 1;},

    resetScore() {this.scoreField.textContent = 'Счёт: 0';}
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {return this.x === point.x && this.y === point.y;},
};

const obstacle = {
    obstaclesArray: [],

    generateObstacles() {
        this.obstaclesArray = [];
        for (let i=0; i<config.getObstacles(); i++) {
            let coords = game.getRandomFreeCoordinates();
            this.obstaclesArray.push(coords);
        }
    },

    getObstacles() {return this.obstaclesArray;},

    isOnPoint(point) {
        let check = false;
        for (let o of this.getObstacles()) {
            if (o.x === point.x && o.y === point.y) check = true;
        }
        return check;
    },
};

const status = {
    condition: null,

    setPlaying() {this.condition = 'playing';},

    setStopped() {this.condition = 'stopped';},

    setFinished() {this.condition = 'finished';},

    isPlaying() {return this.condition === 'playing';},

    isStopped() {return this.condition === 'stopped';},
};

const game = {
    config,
    map,
    snake,
    food,
    obstacle,
    status,
    tickInterval: null,

    init(userSettings) {
        this.config.init(userSettings);
        const validationResult = this.config.validate();

        if (!validationResult.isValid) {
            for (const err of validationResult.errors) {
                console.log(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.obstacle.generateObstacles();
        map.snakeImage = 'snakeHead-up';
        this.render();
        this.snake.resetSpeed();
        this.snake.resetScore();
    },

    render() {this.map.render(this.snake.getBody(), this.food.getCoordinates());},

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    tickHandler() {
        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) {
                this.finish();
            }
        }

        if (this.obstacle.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(textContents, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = textContents;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.obstacle.getObstacles()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {this.reset();},

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    isGameWon() {return this.snake.getBody().length > this.config.getWinFoodCount();},
};

game.init({speed: 8, obstacles: 15});
