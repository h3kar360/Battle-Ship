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
    
    //initialise imports
    const container = document.getElementById('board');
    const dock = document.getElementById('ship-dock');
    //coordinates
    let x;
    let y;

    //ship class
    class Ship{
        constructor(size){
            this.size = size;
        }

        hoverBoard(){
            if((y + this.size - 1) < board[0].length){
                for (let i = 0; i < this.size; i++) {
                    board[y + i][x] = 1;
                }                
                console.log(board);
                
            }            
        }
    }

    //initialise ship classes
    const Carrier = new Ship(5);
    const Battleship = new Ship(4);
    const Cruiser = new Ship(3);
    const Submarine = new Ship(3);
    const Destroyer = new Ship(2);

    //create board
    const createBoard = () => {
        for (let row = 0; row < board[0].length; row++) {
            for (let cell = 0; cell < board[0].length; cell++) {
                const createCell = document.createElement('div');
                createCell.classList.add('cell');
                if(board[row][cell] === 0){                    
                    dock.addEventListener('click', (e) => {
                        createCell.addEventListener('mouseover', () => {
                            x = cell;
                            y = row;

                            if(e.target.id === "carrier"){
                                Carrier.hoverBoard();
                            }
                            else if(e.target.id === "battleship"){
                                Battleship.hoverBoard();
                            }
                            else if(e.target.id === "cruiser"){
                                Cruiser.hoverBoard();
                            }
                            else if(e.target.id === "submarine"){
                                Submarine.hoverBoard();
                            }
                            else if(e.target.id === "destroyer"){
                                Destroyer.hoverBoard();
                            }                            
                        });
                    });
                    container.appendChild(createCell);
                }
            }
        }
    }

    //update the board
    const updateBoard = () => {
        const cell = document.querySelectorAll('cell');
        
    }
    

    //logic
    createBoard();

    //events
    
    
});
