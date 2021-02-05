$(document).ready(function () {

    //display the current day
    var currentDay = moment();
    $("#currentDay").text(currentDay.format("dddd, MMMM Do"));

    // current hour in military time
    var currentMilHour = moment();
    currentMilHour = currentMilHour.format("HHmmss");

    //array of hour id's
    var hourId = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

    //loads current todos
    hourId.forEach(getTodos);

    //highlight past, current, future hours
    hourId.forEach(isPastPresentFuture);

    //save to local storage
    $(".saveBtn").click(function () {
        var whatHourId = $(this).attr("id");
        whatHourId = parseInt(whatHourId);
        todo = $(".description" + whatHourId).val();
        localStorage.setItem("hour" + whatHourId, todo);
    });

    //get from local storage
    function getTodos(item) {
        var savedHour = parseInt(item);
        var currentTodoVal = localStorage.getItem("hour" + savedHour);
        $(".description" + savedHour).val(currentTodoVal);
    };

    //clears the schedule
    $(".clearSchedule").click(function () {
        hourId.forEach(clearSchedule);
        hourId.forEach(getTodos);
    });

    //loops through hours to highlight past, present, future
    function isPastPresentFuture(item) {
        var assessHour = parseInt(item);
        if (currentMilHour >= assessHour * 10000 && currentMilHour < (assessHour + 1) * 10000) {
            $("#" + assessHour).addClass("present");
        } else if (currentMilHour > assessHour * 10000) {
            $("#" + assessHour).addClass("past");
        } else if (currentMilHour < assessHour * 10000) {
            $("#" + assessHour).addClass("future");
        };
    };

    function clearSchedule(item) {
        var clearHour = parseInt(item);
        localStorage.setItem("hour" + clearHour, "");
    };
});