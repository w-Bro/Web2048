/// <reference path="jquery-3.2.1.min.js" />
documentWidth = window.screen.availWidth; //当前设备屏幕可用宽度
gridContainerWidth = 0.92 * documentWidth; //大方框边长
cellSideLength = 0.18 * documentWidth; //小方块边长
cellSpace = 0.04 * documentWidth; //间距

function getPosTop(i, j) {
    return cellSpace + (cellSideLength + cellSpace) * i;
};

function getPosLeft(i, j) {
    return cellSpace + (cellSideLength + cellSpace) * j;
};

function getNumBgColor(num) {
    switch (num) {
       /* case 0:
            return rgb(216, 212, 208);*/
        case 2:
            //return rgb(238, 228, 218);
            return "#eee4da";
        case 4:
            //return rgb(237, 224, 200);
            return "#ede0c8";
        case 8:
            //return rgb(242, 177, 121);
            return "#f2b179";
        case 16:
            //return rgb(245, 145, 98);
            return "#f59162";
        case 32:
            return "#f67c5f";
        case 64:
            //return rgb(246, 94, 59);
            return "#f65e3b";
        case 128:
            //return rgb(237, 206, 114);
            return "#edce72";
        case 256:
            //return rgb(237, 204, 97);
            return "#edcc61";
        case 512:
            //return rgb(237, 200, 80);
            return "#edc850";
        case 1024:
           // return rgb(237, 197, 63);
            return "#edc53f";
        case 2048:
            //return rgb(237, 194, 46);
            return "#edc22e";
        case 4096:
            //return rgb(237, 191, 29);
            return "#edbf1d";
    }
};

function getNumColor(num) {
    if (num <= 4) {
        //return rgb(119, 110, 101);
        return "#776e65";
    }
        //return rgb(249, 246, 242);
    return "white";

};

function isFull(num) {
    for (var i = 0 ; i < 4 ; i++) {
        for (var j = 0 ; j < 4 ; j++) {
            if (num[i][j] == 0)
                return false;
        }
    }
    return true;
};

function moveLeft(num) {
    //isMoved = false;
    var nextI = -1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            nextI = -1;
            for (var m = j + 1; m < 4; m++) {
                if (num[i][m] != 0) {
                    nextI = m;
                    break;
                }
            }
            if (nextI != -1) {
                if (num[i][j] == 0) {
                    showMoveAnimation(i, nextI, i, j);
                    num[i][j] = num[i][nextI];
                    num[i][nextI] = 0;
                    j--;
                    isMoved = true;
                }
                else if (num[i][j] == num[i][nextI]) {
                    showMoveAnimation(i, nextI, i, j);
                    num[i][j] = num[i][j] * 2;
                    num[i][nextI] = 0;
                    score += num[i][j];
                    updateScore(score);
                    isMoved = true;
                }
            }
        }
    }
    setTimeout("UpdateGrid()", 200);
};

function moveRight(num) {
    //isMoved = false;
    var nextI = -1;
    for (var i = 0; i < 4 ; i++) {
        for (var j = 3 ; j >= 0 ; j--) {
            nextI = -1;
            for (var m = j - 1 ; m >= 0 ; m--) {
                if (num[i][m] != 0) {
                    nextI = m;
                    break;
                }
            }
            if (nextI != -1) {
                if (num[i][j] == 0) {
                    showMoveAnimation(i, nextI, i, j);
                    num[i][j] = num[i][nextI];
                    num[i][nextI] = 0;
                    j++;
                    isMoved = true;
                }
                else if (num[i][j] == num[i][nextI]) {
                    showMoveAnimation(i, nextI, i, j);
                    num[i][j] = num[i][j] * 2;
                    num[i][nextI] = 0;
                    score += num[i][j];
                    updateScore(score);
                    isMoved = true;
                }
            }
        }
    }
    setTimeout("UpdateGrid()", 200);
};

function moveUp(num) {
    //isMoved = false;
    var nextI = -1;
    for (var j = 0 ; j < 4 ; j++) {
        for (var i = 0 ; i < 4 ; i++) {
            nextI = -1;
            for (var m = i + 1 ; m < 4 ; m++) {
                if (num[m][j] != 0) {
                    nextI = m;
                    break;
                }
            }
            if (nextI != -1) {
                if (num[i][j] == 0) {
                    showMoveAnimation(nextI, i, j, i);
                    num[i][j] = num[nextI][j];
                    num[nextI][j] = 0;
                    i--;
                    isMoved = true;
                }
                else if (num[i][j] == num[nextI][j]) {
                    showMoveAnimation(nextI, i, j, i);
                    num[i][j] *= 2;
                    num[nextI][j] = 0;
                    score += num[i][j];
                    updateScore(score);
                    isMoved = true;
                }
            }
        }
    }
    setTimeout("UpdateGrid()", 200);
};

function moveDown(num) {
    //isMoved = false;
    var nextI = -1;
    for (var j = 0 ; j < 4 ; j++) {
        for (var i = 3 ; i >= 0; i--) {
            nextI = -1;
            for (var m = i - 1 ; m >= 0 ; m--) {
                if (num[m][j] != 0) {
                    nextI = m;
                    break;
                }
            }
            if (nextI != -1) {
                if (num[i][j] == 0) {
                    showMoveAnimation(nextI, i, j, i);
                    num[i][j] = num[nextI][j];
                    num[nextI][j] = 0;
                    i++;
                    isMoved = true;
                }
                else if (num[i][j] == num[nextI][j]) {
                    showMoveAnimation(nextI, i, j, i);
                    num[i][j] *= 2;
                    num[nextI][j] = 0;
                    score += num[i][j];
                    updateScore(score);
                    isMoved = true;
                }
            }
        }
    }
    setTimeout("UpdateGrid()", 200);
};

function isGameOver(num) {
    if (isFull(num) == true) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (j != 3 && num[i][j] == num[i][j + 1]) {
                    return false;
                }
                else {
                    if (i == 0 && num[i][j] == num[i + 1][j])
                        return false;
                    else if (i == 1 || i == 2) {
                        if (num[i][j] == num[i + 1][j] || num[i][j] == num[i - 1][j]) {
                            return false;
                        }
                    }
                    else if (i == 3 && num[i][j] == num[i - 1][j])
                        return false;
                }
            }
            alert("Game Over!");
            return true;
        }
    }
    else {
        return false;
    }
};