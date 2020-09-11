const rows = 5;
const cols = 5;
const turn_time = 10.0  // s
const update_interval = 100; // ms


var player_1_turn = true;
var table_state = Array.from(Array(rows), () => new Array(cols)); // table_state[rows][cols];

var timer = turn_time;
var game_ended = false;

gameBoardInit();
setInterval(gameLoop, update_interval);

function gameBoardInit()
{
    // get container by ID
    let table_element = document.getElementById("board");
    // draw board elements
    let row, col;

    for (row = 0; row < rows; row++)
     {
        let row_element = document.createElement("TR");
        table_element.appendChild(row_element);
        
        for (col = 0; col < cols; col++) 
         {
            let cell_element = document.createElement("TD");
            cell_element.classList.add("cell");
            cell_element.addEventListener('click', cellClickAction, {once : true});
            row_element.appendChild(cell_element);
         }
     }

}

function gameLoop()
{
    if (timer <= 0.0)
     {
        player_1_turn = !player_1_turn;
        timer = turn_time;
     }
    else
     {
        timer -= update_interval / 1000;
     }
    
    let p_bar = document.getElementById("progress-bar");
    p_bar.style.width = 100 * timer / turn_time + "%";
}

function cellClickAction(e)
{
    if (game_ended) return;

    // get element
    let clicked_element = e.target;

    // draw symbol
    drawMark(clicked_element);

    // fill array
    let element_place = getElementPlace(clicked_element);
    table_state[element_place[0]][element_place[1]] = player_1_turn ? 'x' : 'o';

    // check win
    if (checkWin())
     {
        printWin();
        game_ended = true;
     }

    // change turn
    timer = turn_time;
    player_1_turn = !player_1_turn;
}

function drawMark(c_element)
{
    let mark = player_1_turn ? "x" : "o";
    c_element.innerHTML = mark;
    c_element.classList.add(mark);
}

function printWin()
{
    let win_message = player_1_turn ? "Player 1 won!" : "Player 2 won!";
    alert(win_message);
}

function getElementPlace(c_element)
{
    let table_element = document.getElementById("board");
	let row, col;
	for (row = 0; row < rows; row++)
	 {
	 	let row_element = table_element.childNodes[row];
		for (col = 0; col < cols; col++)
		 {
			if (row_element.childNodes[col] == c_element)
			 {
				return [row, col];			 
			 }		 
		 }	 
	 }
}

function checkWin()
{
    let col, row, mark;

    mark = player_1_turn ? 'x' : 'o';
    // check rows
    for (row = 0; row < rows; row++)
     {
        for (col = 0; col < cols; col++)
         {
            if (table_state[row][col] != mark) break;
         }
        if (col == cols) return true;
     }

    // check cols
    for (col = 0; col < cols; col++)
     {
        for (row = 0; row < rows; row++)
         {
            if (table_state[row][col] != mark) break;
         }
        if (row == rows) return true;
     }
    
    // check diagonals
    for (col = 0; col < cols; col++)
     {
        if (table_state[col][col] != mark) break;
     }
    if (col == cols) return true;

    for (col = 0; col < cols; col++)
     {
        if (table_state[col][cols - 1 - col] != mark) break;
     }
    if (col == cols) return true;

    return false;
}
