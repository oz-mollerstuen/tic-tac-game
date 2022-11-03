// Buisiness Logic

function GameClass() {
    this.turn = 0;
    this.symbol = "X";
    this.winner = "";
}

let game = new GameClass();

function setSymbol() {
    switch (game.turn) {
        case 0:
            game.symbol = "X";
            break;
        case 1:
            game.symbol = "O";
            break;
    }
}

function changeTurn() {
    if (game.turn === 0) {
        game.turn = 1
    }
    else {
        game.turn = 0
    }
    setSymbol();
}

function checkVals(val1, val2, val3) {
    let side = [val1[0], val2[0], val3[0]];
    let elems = [val1[1], val2[1], val3[1]];
    if (val1[0] && val2[0] && val3[0]) {
        if (side[0] === side[1] && side[1] === side[2]) {
            elems.forEach(function(e) {
                e.style.backgroundColor = "magenta";
            });
            return [true, val2[0]];
        }
    }
    return [false, ""];
}

function ties() {
    const tiles = [];
    let empty = false
    for (let i = 1; i < 4; i++) {
        tiles.push(getTile(i, "a"));
        tiles.push(getTile(i, "b"));
        tiles.push(getTile(i, "c"));
    }
    tiles.forEach(function(tile) {
        if (tile[1].innerText === "") {
            empty = true
        }
    });
    return empty === false;
}

function checks() {
    let win = false;
    let sym = "";
    const checkY1 = [getTile(1, "a"), getTile(1, "b"), getTile(1, "c")];
    const checkY2 = [getTile(2, "a"), getTile(2, "b"), getTile(2, "c")];
    const checkY3 = [getTile(3, "a"), getTile(3, "b"), getTile(3, "c")];
    const checkX1 = [getTile(1, "a"), getTile(2, "a"), getTile(3, "a")];
    const checkX2 = [getTile(1, "b"), getTile(2, "b"), getTile(3, "b")];
    const checkX3 = [getTile(1, "c"), getTile(2, "c"), getTile(3, "c")];
    const checkD1 = [getTile(1, "a"), getTile(2, "b"), getTile(3, "c")];
    const checkD2 = [getTile(3, "a"), getTile(2, "b"), getTile(1, "c")];

    const checks = [checkY1, checkY2, checkY3, checkX1, checkX2, checkX3, checkD1, checkD2];
    checks.forEach(function(check) {
        let boolCheck = checkVals(check[0], check[1], check[2]);
        if (boolCheck[0] === true) {
            win = true;
            sym = boolCheck[1];
        }
    });
    return [win, sym];
}

function checkTile(event) {
    if (!event.target.classList.contains("checked")) {
        event.target.innerText = game.symbol;
        event.target.classList.add("checked");
        let winCheck = false;
        let checkArray = [checks];
        for (const c in checkArray) {
            let check = checkArray[c]();
            if (check[0] === true) {
                winCheck = true;
                game.winner = check[1];
            }
        }
        if (!game.winner) {
            let tie = ties();
            if (tie === false) {
                changeTurn();
            } else {
                setTimeout(function() {
                    clearBoard();
                    game = new GameClass();
                }, 1500);
            }
        } else {
            console.log("winner:");
            console.log(game.winner);
            setTimeout(function() {
                clearBoard();
                game = new GameClass();
            }, 1500);
        }
    }
}

// UI Logic

function clearBoard() {
    const tiles = [];
    for (let i = 1; i < 4; i++) {
        tiles.push(getTile(i, "a"));
        tiles.push(getTile(i, "b"));
        tiles.push(getTile(i, "c"));
    }
    tiles.forEach(function(tile) {
        tile[1].style.backgroundColor = "silver";
        tile[1].classList.remove("checked");
        tile[1].innerText = "";
    });
}

function getTile(num, letter) {
    const element = document.getElementById(`td${num}${letter.toLocaleLowerCase()}`);
    return [element.innerText, element];
}

addEventListener("load", function() {
    document.querySelectorAll("td").forEach(function(tile) {
        tile.addEventListener("click", checkTile);
    });
});