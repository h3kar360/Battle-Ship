document.addEventListener('DOMContentLoaded', () => {
    //board
    const board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    //pdf
    const pdf = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    //enemy board
    const enemyBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    //initialise imports
    const container = document.getElementById('board');
    const dock = document.getElementById('ship-dock');
    const enemyContainer = document.getElementById('enemy-board');
    const launchInput = document.getElementById('input-coordinate');
    const launchButton = document.getElementById('launch-button');
    //coordinates
    let x = [null, null];
    let y = [null, null];
    //ship variables
    let currentShip;
    let currentShipSize = 0;
    //rotate bools
    let rotate = false;
    let keyPressed = false;
    //map for coordinates
    const coordLetters = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9 };
    //computer state whether it found a pattern
    let startThink = false;    

    //ship class
    class Ship{
        constructor(size){
            this.size = size;
            this.selected = false;
        }

        hoverBoard(){
            if(!rotate){
                //check if hover exceeds boundaries
                if((y[1] + this.size - 1) < board[0].length){
                    //check for collision
                    for (let i = 0; i < this.size; i++) {
                        if(board[y[1] + i][x[1]] === 2){
                            return;
                        }
                    }

                    for (let i = 0; i < this.size; i++) {
                        board[y[1] + i][x[1]] = 1;
                        cellDiv[x[1] + (y[1] + i) * board[0].length].style.backgroundColor = 'red';
                    }

                    x[0] = x[1];
                    y[0] = y[1];
                }
            }
            else if(rotate){
                if((x[1] + this.size - 1) < board[0].length){
                    for (let i = 0; i < this.size; i++) {
                        if(board[y[1]][x[1] + i] === 2){
                            return;
                        }
                    }

                    for (let i = 0; i < this.size; i++) {
                        board[y[1]][x[1] + i] = 1;
                        cellDiv[(x[1] + i) + y[1] * board[0].length].style.backgroundColor = 'red';
                    }

                    x[0] = x[1];
                    y[0] = y[1];
                }
            }
        }

        awayCell(){
            if(!rotate){
                for (let i = 0; i < this.size; i++) {
                    board[y[0] + i][x[0]] = 0;
                    cellDiv[x[0] + (y[0] + i) * board[0].length].style.backgroundColor = 'white';                    
                }
            }
            else if(rotate){
                for (let i = 0; i < this.size; i++) {
                    board[y[0]][x[0] + i] = 0;
                    cellDiv[(x[0] + i) + y[0] * board[0].length].style.backgroundColor = 'white';
                }
            }
        }

        selectCell(){
            this.selected = false;

            if (!rotate){
                if ((y[1] + this.size - 1) < board[0].length) {
                    for (let i = 0; i < this.size; i++) {
                        if(board[y[1] + i][x[1]] !== 1){
                            return;
                        }
                    }

                    for (let i = 0; i < this.size; i++) {
                        board[y[1] + i][x[1]] = 2;
                        cellDiv[x[1] + (y[1] + i) * board[0].length].style.backgroundColor = 'grey';
                    }

                    this.selected = true;

                    x[0] = null;
                    y[0] = null;
                }
            }
            else if(rotate){
                if ((x[1] + this.size - 1) < board[0].length) {
                    for (let i = 0; i < this.size; i++) {
                        if(board[y[1]][x[1] + i] !== 1){
                            return;
                        }
                    }

                    for (let i = 0; i < this.size; i++) {
                        board[y[1]][x[1] + i] = 2;                        
                        cellDiv[(x[1] + i) + y[1] * board[0].length].style.backgroundColor = 'grey';
                    }

                    this.selected = true;

                    x[0] = null;
                    y[0] = null;
                }
            }
        }

        rotateShip(){
            if(rotate){
                for (let i = 0; i < this.size; i++) {
                    if(board[y[1]][x[1] + i] === 2){
                        rotate = !rotate;
                        return;
                    }
                }

                for (let i = 0; i < this.size; i++) {
                    board[y[1] + i][x[1]] = 0;
                    cellDiv[x[1] + (y[1] + i) * board[0].length].style.backgroundColor = 'white';
                    board[y[1]][x[1] + i] = 1;
                    cellDiv[(x[1] + i) + y[1] * board[0].length].style.backgroundColor = 'red';                    
                }
            }
            else if(!rotate){
                for (let i = 0; i < this.size; i++) {
                    if(board[y[1] + i][x[1]] === 2){
                        rotate = !rotate;
                        return;
                    }
                }

                for (let i = 0; i < this.size; i++) {
                    board[y[1]][x[1] + i] = 0;                    
                    cellDiv[(x[1] + i) + y[1] * board[0].length].style.backgroundColor = 'white';
                    board[y[1] + i][x[1]] = 1;
                    cellDiv[x[1] + (y[1] + i) * board[0].length].style.backgroundColor = 'red';
                }
            }
        }
    }

    //enemy ship class
    class EnemyShip{
        constructor(size){
            this.size = size;
            this.horizontalClear = true;
            this.verticalClear = true;
            this.sink = false;
        }

        placeShips(){
            const randCoordX = Math.floor(Math.random() * enemyBoard[0].length);
            const randCoordY = Math.floor(Math.random() * enemyBoard[0].length);

            //reset
            this.horizontalClear = true;
            this.verticalClear = true;

            // Check horizontal clearance
            if(randCoordX + this.size - 1 < enemyBoard[0].length){
                for (let i = 0; i < this.size; i++) {
                    if (enemyBoard[randCoordY][randCoordX + i] === 2) {
                        this.horizontalClear = false;
                        break;
                    }
                }
            }
            else{
                this.horizontalClear = false; // Out of bounds
            }

            // Check vertical clearance
            if(randCoordY + this.size - 1 < enemyBoard.length){
                for (let i = 0; i < this.size; i++) {
                    if (enemyBoard[randCoordY + i][randCoordX] === 2) {
                        this.verticalClear = false;
                        break;
                    }
                }
            }
            else{
                this.verticalClear = false; // Out of bounds
            }

            //compare and recurse
            if(this.horizontalClear && this.verticalClear){
                //randomly pick placing ships horizontally or vertically
                const horOrVer = Math.floor(Math.random() * 2);

                if(horOrVer === 0){
                    for (let i = 0; i < this.size; i++) {
                        enemyBoard[randCoordY][randCoordX + i] = 2;
                    }
                } 
                else{
                    for (let i = 0; i < this.size; i++) {
                        enemyBoard[randCoordY + i][randCoordX] = 2;
                    }
                }
            }
            else if(this.horizontalClear && !this.verticalClear){
                for (let i = 0; i < this.size; i++) {
                    enemyBoard[randCoordY][randCoordX + i] = 2;
                }
            }
            else if(!this.horizontalClear && this.verticalClear){
                for (let i = 0; i < this.size; i++) {
                    enemyBoard[randCoordY + i][randCoordX] = 2;
                }
            }
            else{
                return this.placeShips();
            }
        }
    }

    //initialise ship classes
    const Carrier = new Ship(5);
    const Battleship = new Ship(4);
    const Cruiser = new Ship(3);
    const Submarine = new Ship(3);
    const Destroyer = new Ship(2);

    //initialise enemy ship classes
    const EnemyShips = [new EnemyShip(5), new EnemyShip(4), new EnemyShip(3), new EnemyShip(3), new EnemyShip(2)];

    //event listener to identify ship
    dock.addEventListener('click', (e) => {
        switch (e.target.id) {
            case "carrier":
                if(e.target.getAttribute('clicked') === 'false'){
                    currentShip = Carrier;
                    currentShipSize = Carrier.size;
                }
                break;
            case "battleship":
                if(e.target.getAttribute('clicked') === 'false'){
                    currentShip = Battleship;
                    currentShipSize = Battleship.size;
                }
                break;
            case "cruiser":
                if(e.target.getAttribute('clicked') === 'false'){
                    currentShip = Cruiser;
                    currentShipSize = Cruiser.size;
                }
                break;
            case "submarine":
                if(e.target.getAttribute('clicked') === 'false'){
                    currentShip = Submarine;
                    currentShipSize = Submarine.size;
                }
                break;
            case "destroyer":
                if(e.target.getAttribute('clicked') === 'false'){
                    currentShip = Destroyer;
                    currentShipSize = Destroyer.size;
                }
                break;
            default:
                currentShip = null;
                currentShipSize = 0;
        }
    });

    //create board
    const createBoard = () => {
        for (let row = 0; row < board[0].length; row++) {
            for (let cell = 0; cell < board[0].length; cell++) {
                const createCell = document.createElement('div');
                createCell.classList.add('cell');
                if(board[row][cell] === 0){                    
                    dock.addEventListener('click', (e) => {
                        createCell.addEventListener('mouseover', () => {
                            if(e.target.getAttribute('clicked') === 'false'){
                                x[1] = cell;
                                y[1] = row;

                                currentShip.hoverBoard();
                            }
                        });

                        createCell.addEventListener('mouseout', () => {
                            if(e.target.getAttribute('clicked') === 'false'){
                                currentShip.awayCell();
                            }
                        });

                        createCell.addEventListener('click', () => {
                            currentShip.selected = false;
                            if(e.target.getAttribute('clicked') === 'false'){
                                currentShip.selectCell();

                                if(currentShip.selected){
                                    e.target.style.backgroundColor = 'green';
                                    e.target.setAttribute('clicked', 'true');
                                }

                                if(checkShips()){
                                    alert('all are filled')
                                }
                            }
                        });
                    });

                    dock.addEventListener('keydown', (e) => {
                        if(e.code === 'ArrowDown' && !keyPressed){
                            rotate = !rotate;
                            currentShip.rotateShip();
                            keyPressed = true;
                        }
                    });

                    dock.addEventListener('keyup', (e) => {
                        if(e.code === 'ArrowDown' && keyPressed){
                            keyPressed = false;
                        }
                    });

                    container.appendChild(createCell);
                }
            }
        }
    }


    //create enemy board
    const createEnemyBoard = () => {
        for (let row = 0; row < enemyBoard[0].length; row++) {
            for (let cell = 0; cell < enemyBoard[0].length; cell++) {
                const createCell = document.createElement('div');
                createCell.classList.add('cell');
                enemyContainer.appendChild(createCell);
            }
        }
    }    

    //check if all ships are placed
    const checkShips = () => {
        for (let i = 0; i < 5; i++) {
            if(dock.children[i].getAttribute('clicked') === 'false'){
                return false;
            }
        }

        return true;
    }

    let shots = 0;

    //update enemy board
    launchButton.addEventListener('click', () => {       

        if(checkShips()){           
            const input = launchInput.value;

            const arrInput = input.split(' ');

            if(enemyBoard[arrInput[1] - 1][coordLetters[arrInput[0].toUpperCase()]] === 0){
                checkHit(arrInput);

                launchInput.value = '';
                shots++;
                computerAtk();

                if(checkWin()){
                    alert('you win!');
                }

                if(checkEnemyWin()){
                    alert('you lose!');
                    console.log(shots);
                    
                }            
            }
            else{
                alert('you hit the same cell admiral!');
                launchInput.value = '';
            }
        }
        else{
            alert('place all your ships first admiral!');
            launchInput.value = '';
        }
    });

    //check if enemy ship is hit
    const checkHit = (arrInput) => {
        if(enemyBoard[arrInput[1] - 1][coordLetters[arrInput[0].toUpperCase()]] === 2){
            enemyBoard[arrInput[1] - 1][coordLetters[arrInput[0].toUpperCase()]] = 1;
            cellDiv[((coordLetters[arrInput[0].toUpperCase()]) + (arrInput[1] - 1) * (enemyBoard[0].length)) + Math.pow(enemyBoard[0].length, 2)].style.backgroundColor = 'red';
        }
        else{
            enemyBoard[arrInput[1] - 1][coordLetters[arrInput[0].toUpperCase()]] = 3;
            cellDiv[((coordLetters[arrInput[0].toUpperCase()]) + (arrInput[1] - 1) * (enemyBoard[0].length)) + Math.pow(enemyBoard[0].length, 2)].style.backgroundColor = 'blue';
        }
    }    

    //check if all ships have sinked
    const checkWin = () => {
        for (let row = 0; row < enemyBoard[0].length; row++) {
            for (let cell = 0; cell < enemyBoard[0].length; cell++) {
                if(enemyBoard[row][cell] === 2){
                    return false;
                }
            }
        }
        return true;
    }

    //variables of the computer    
    let initX;
    let initY;
    let chosenX;
    let chosenY;
    let compChoice = null;
    let alt = 1;
    let pickCell;
    let pickOption = [0, 1, 2, 3];
    const cells = [];   
    let pattern = 0; 

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            cells.push([x, y]);
        }
    }

    let cell;

    //computer attack
    const computerAtk = () => {
        if (!startThink) {
            if (cells.length > 0) {
                const randIndex = Math.floor(Math.random() * cells.length);
                cell = cells[randIndex];

                if((cell[0] + cell[1]) % 2 === 0){
                    return computerAtk();
                }

                cells.splice(randIndex, 1);               
        
                if (board[cell[1]][cell[0]] === 2) {
                    board[cell[1]][cell[0]] = 3;
                    cellDiv[cell[0] + cell[1] * board[0].length].style.backgroundColor = 'yellow';
                    chosenX = initX = cell[0];
                    chosenY = initY = cell[1];
                    startThink = true;
                    alt = 1;
                    pattern = 0;
                } else if (board[cell[1]][cell[0]] === 0) {
                    board[cell[1]][cell[0]] = 4;
                    cellDiv[cell[0] + cell[1] * board[0].length].style.backgroundColor = 'blue';
                }
            } 
        } 
        else {
            const directions = [
                { dx: 1, dy: 0 },
                { dx: -1, dy: 0 },
                { dx: 0, dy: 1 },
                { dx: 0, dy: -1 },
            ];
        
            if (compChoice === null && pickOption.length > 0) {
                const opt = Math.floor(Math.random() * pickOption.length);
                pickCell = pickOption.splice(opt, 1)[0];
            }
            else if(pickOption.length === 0){
                pickCell = 0;
            } 
            else {
                pickCell = compChoice;
                pickOption = [0, 1, 2, 3];
            }
        
            const { dx, dy } = directions[pickCell];
            const newX = chosenX + dx;
            const newY = chosenY + dy;
        
            if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
                const index = cells.findIndex(([x, y]) => x === newX && y === newY);
        
                if (index !== -1) {
                    cells.splice(index, 1);
        
                    if (board[newY][newX] === 2) {
                        board[newY][newX] = 3;
                        cellDiv[newX + newY * board[0].length].style.backgroundColor = 'yellow';
                        compChoice = pickCell;
                        chosenX = newX;
                        chosenY = newY;
                        pattern++;
                    } 
                    else if (board[newY][newX] === 0) {
                        board[newY][newX] = 4;
                        cellDiv[newX + newY * board[0].length].style.backgroundColor = 'blue';
                        if (alt <= 0) {
                            compChoice = null;
                            startThink = false;
                        } 
                        else if (pattern >= 1 && alt > 0) {
                            compChoice = pickCell % 2 === 0 ? pickCell + 1 : pickCell - 1;
                            chosenX = initX;
                            chosenY = initY;
                            alt = 0;
                        }
                    }
                } else { 
                    if(compChoice === null){
                        startThink = true; 
                        return computerAtk();
                    }
                    else{
                        if (alt <= 0) {
                            compChoice = null;
                            startThink = false;
                        } 
                        else if (pattern >= 1 && alt > 0) {
                            compChoice = pickCell % 2 === 0 ? pickCell + 1 : pickCell - 1;
                            chosenX = initX;
                            chosenY = initY;
                            alt = 0;
                        }  
                        return computerAtk();                     
                    } 
                }
            } else {
                if(compChoice === null){
                    startThink = true;
                    return computerAtk();
                }
                else{
                    compChoice = null;
                    startThink = false;
                    return computerAtk();
                }                
            }
        }        
    }

    const calcPDF = () => {
        
    }

    //check enemy win
    const checkEnemyWin = () => {
        for (let row = 0; row < board[0].length; row++) {
            for (let cell = 0; cell < board[0].length; cell++) {
                if(board[row][cell] === 2){
                    return false;
                }
            }
        }
        return true;
    }
    
    //logic
    createBoard();
    
    createEnemyBoard();

    //get all the cells of the board for updates
    const cellDiv = document.querySelectorAll('.cell');

    for (let i = 0; i < 5; i++) {
        EnemyShips[i].placeShips();
    }

});
