// build a calendar widget that draws the current month and highlights the current day.
var TOTAL_DAYS = new Date(2016, 03, 0).getDate(); // cheated here http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
var TODAY = new Date().getDate();
var ROW_START_OFFSET = new Date(2016, 02, 01).getDay();
var ROW_END_OFFSET = 7 - (new Date(2016, 02, TOTAL_DAYS).getDay() + 1);

$(document).ready(function() {
    drawStartOffset();
    drawDates();
    drawEndOffset();
});

function drawStartOffset() {
    for (var i = 0; i < ROW_START_OFFSET; i++) {
        $('.dates').append('<div class="date blank"></div>');
    }
}

function drawDates() {
    for (var i = 1; i <= TOTAL_DAYS; i++) {
        if (i === TODAY) {
            $('.dates').append('<div class="date today">' + i + "</div>");
        } else {
            $('.dates').append('<div class="date">' + i + "</div>");
        }
    }
}

function drawEndOffset() {
    for (var i = 0; i < ROW_END_OFFSET; i++) {
        $('.dates').append('<div class="date blank"></div>');
    }
}
