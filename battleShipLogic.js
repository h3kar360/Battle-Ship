document.addEventListener('DOMContentLoaded', () => {
    //board
    let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    //coordinates
    let x = [null, null];
    let y = [null, null];
    //ship variables
    let currentShip;
    let currentShipSize = 0;
    //rotate bools
    let rotate = false;
    let keyPressed = false;

    //ship class
    class Ship{
        constructor(size){
            this.size = size;
        }

        hoverBoard(){            
            if(!rotate){
                if((y[1] + this.size - 1) < board[0].length){
                    for (let i = 0; i < this.size; i++) {
                        board[y[1] + i][x[1]] = 1;                        
                    }

                    x[0] = x[1];
                    y[0] = y[1];
                }
            }
            else if(rotate){
                if((x[1] + this.size - 1) < board[0].length){
                    for (let i = 0; i < this.size; i++) {
                        board[y[1]][x[1] + i] = 1;                        
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
                }
            }
            else if (rotate){
                for (let i = 0; i < this.size; i++) {
                    board[y[0]][x[0] + i] = 0;                        
                }
            }  
        }

        selectCell(){
            for (let i = 0; i < this.size; i++) {
                if(!rotate){
                    board[y[1] + i][x[1]] = 2;
                }
                else if(rotate){
                    board[y[1]][x[1] + i] = 2;
                }    
            }             
        }       
       
        rotateShip(){
            if(rotate){
                for (let i = 0; i < this.size; i++) {
                    board[y[1] + i][x[1]] = 0;
                    board[y[1]][x[1] + i] = 1;             
                }
            }
            else if(!rotate){
                for (let i = 0; i < this.size; i++) {
                    board[y[1]][x[1] + i] = 0;
                    board[y[1] + i][x[1]] = 1;                    
                }                    
            }
        }
    }

    //initialise ship classes
    const Carrier = new Ship(5);
    const Battleship = new Ship(4);
    const Cruiser = new Ship(3);
    const Submarine = new Ship(3);
    const Destroyer = new Ship(2);

    //event listener to identify ship
    dock.addEventListener('click', (e) => {
        switch (e.target.id) {
            case "carrier":
                currentShip = Carrier;
                currentShipSize = Carrier.size;
                break;
            case "battleship":
                currentShip = Battleship;
                currentShipSize = Battleship.size;
                break;
            case "cruiser":
                currentShip = Cruiser;
                currentShipSize = Cruiser.size;
                break;
            case "submarine":
                currentShip = Submarine;
                currentShipSize = Submarine.size;
                break;
            case "destroyer":
                currentShip = Destroyer;
                currentShipSize = Destroyer.size;
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
                            x[1] = cell;
                            y[1] = row;

                            currentShip.hoverBoard();                    
                            updateBoard();                            
                        });

                        createCell.addEventListener('mouseout', () => {
                            currentShip.awayCell();
                            updateBoard();
                        });

                        createCell.addEventListener('click', () => {
                            currentShip.selectCell();
                            updateBoard();
                        });
                    });

                    dock.addEventListener('keydown', (e) => {
                        if(e.code === 'ArrowDown' && !keyPressed){
                            rotate = !rotate;
                            currentShip.rotateShip();
                            updateBoard();
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

    //update the board
    const updateBoard = () => {
        const cellDiv = document.querySelectorAll('.cell');

        //shade cells when certain ships hovered
        for (let row = 0; row < board[0].length; row++) {
            for (let cell = 0; cell < board[0].length; cell++) { 
                if(board[row][cell] === 0){                    
                    cellDiv[cell + row * board[0].length].style.backgroundColor = 'white';
                }               
                else if(board[row][cell] === 1){                    
                    cellDiv[cell + row * board[0].length].style.backgroundColor = 'red';
                }
                else if(board[row][cell] === 2){
                    cellDiv[cell + row * board[0].length].style.backgroundColor = 'grey';
                }                
            }
        }
        
    }
    

    //logic
    createBoard();

    //events
    
    
});
