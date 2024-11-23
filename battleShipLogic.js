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
    

    const createBoard = () => {
        for (let row = 0; row < board[0].length; row++) {
            for (let cell = 0; cell < board[0].length; cell++) {
                if(board[row][cell] === 0){
                    const createCell = document.createElement('div');
                    createCell.classList.add('cell');
                    container.appendChild(createCell);
                }
            }
        }
    }

    createBoard();
    
    
});
