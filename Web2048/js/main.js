/// <reference path="jquery-3.2.1.min.js" />

var num = new Array();
var isMoved = false;
var score = 0;

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function () {
    prepareForMobile();
    newgame();
});

function prepareForMobile() {

    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.06 * cellSideLength);
}
function newgame() {
    Init(); //初始化界面

    //随机生成两个数字
    addNum();
    addNum();
};

function Init() {

    isMoved = false;
    score = 0;
    updateScore(score);
    for (var i = 0 ; i < 4 ; i++) {
        for (var j = 0 ; j < 4 ; j++) {
            var gridcell = $("#grid-cell-" + i + "-" + j);
            gridcell.css('top', getPosTop(i, j));
            gridcell.css('left', getPosLeft(i, j));
        }
    }

    for (var i = 0 ; i < 4 ; i++) {
        num[i] = new Array(); //变为二维数组
        for (var j = 0 ; j < 4 ; j++) {
            num[i][j] = 0;
        }
    }
    UpdateGrid();   //显示数字
};
function UpdateGrid() {
    $(".num-cell").remove();
    for (var i = 0 ; i < 4 ; i++) {
        for (var j = 0 ; j < 4 ; j++) {
            $("#grid-container").append('<div class="num-cell" id = "num-cell-' + i + '-' + j + '"></div>');
            var theNumbercell = $('#num-cell-' + i + '-' + j);
            if (num[i][j] == 0) {
                theNumbercell.css('width', '0px');
                theNumbercell.css('heigth', '0px');
                theNumbercell.css('top', getPosTop(i, j) + cellSideLength / 2);
                theNumbercell.css('left', getPosLeft(i, j) + cellSideLength / 2);
            }
            else {
                theNumbercell.css('width', cellSideLength);
                theNumbercell.css('heigth', cellSideLength);
                theNumbercell.css('top', getPosTop(i, j));
                theNumbercell.css('left', getPosLeft(i, j));
                theNumbercell.css('background-color', getNumBgColor(num[i][j]));
                theNumbercell.css('color', getNumColor(num[i][j]));
                theNumbercell.text(num[i][j]);
            }
        }
    }
    $('.num-cell').css('line-height', cellSideLength + 'px');
    $('.num-cell').css('font-size', 0.6 * cellSideLength + 'px');
    $('.num-cell').css('border-radius', 0.06 * cellSideLength);
};

function addNum() {
    if (isFull(num))
        return false;
    else {
        isMoved = false;
        //随机一个位置
        //random生成0 - 1的浮点数 ， *4生成0 - 4 ， floor取整数部分转换为整型
        var randX = parseInt(Math.floor(Math.random() * 4));
        var randY = parseInt(Math.floor(Math.random() * 4));
        var times = 0;
        while(times < 50)
        {
            if (num[randX][randY] == 0)
                break;

            var randX = parseInt(Math.floor(Math.random() * 4));
            var randY = parseInt(Math.floor(Math.random() * 4));
            times++;
        }
        if (times == 50)
        {
            for (var i = 0 ; i < 4 ; i++) {
                for (var j = 0 ; j < 4 ; j++) {
                    if (num[i][j] == 0) {
                        randX = i;
                        randY = j;
                    }
                }
            }
        }
        //随机一个数 生成2的概率是0.9
        var randNum = Math.random() < 0.9 ? 2 : 4;
        num[randX][randY] = randNum;
        //alert(randX + " " + randY + " " + randNum);
        //动画效果
        showNumWithAnimation(randX, randY ,randNum);
        return true;
    }
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //左
            event.preventDefault();
            moveLeft(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
            break;
        case 38: //上
            event.preventDefault();
            moveUp(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
            break;
        case 39: //右
            event.preventDefault();
            moveRight(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
            break;
        case 40: //下
            event.preventDefault();
            moveDown(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
            break;
        default:
            break;
    }
});
document.addEventListener('touchstart', function (event) {

    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchend', function (event) {

    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;
    if (Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth)
        return;
    if(Math.abs(deltaX) >= Math.abs(deltaY)){
        //横向滑动
        if (deltaX > 0) {
            moveRight(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
        }
        else {
            moveLeft(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
        }
    }
    else {
        if (deltaY > 0) {
            //屏幕坐标系中向下为正方向
            moveDown(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
        }
        else {
            moveUp(num);
            if (isMoved == true)
                setTimeout(addNum(), 210);
            setTimeout(isGameOver(num), 300);
        }
    }
});
