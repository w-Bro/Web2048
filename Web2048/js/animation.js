/// <reference path="jquery-3.2.1.min.js" />

function showNumWithAnimation(i, j, ranNum) {
    var numcell = $('#num-cell-' + i + "-" + j);

    numcell.css('background-color', getNumBgColor(ranNum));
    numcell.css('color', getNumColor(ranNum));
    numcell.text(ranNum);

    numcell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50); //持续时间50ms
};

function showMoveAnimation(fromi, fromj, toi, toj) {
    var numcell = $('#num-cell-' + fromi + '-' + fromj);
    numcell.animate({
        top: getPosTop(toi, toj),
        left: getPosLeft(toi, toj)
    }, 200);
};

function updateScore(score) {
    $("#score").text(score);
};