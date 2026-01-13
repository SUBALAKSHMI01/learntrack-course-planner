let course = null;
let totalCourseHours = 0;
let completedHours = 0;

function createPlan() {
    course = document.getElementById("courseName").value.trim();
    totalCourseHours = Number(document.getElementById("totalHours").value);
    const dailyHours = Number(document.getElementById("dailyHours").value);

    if (!course || totalCourseHours <= 0 || dailyHours <= 0) {
        document.getElementById("result").innerText =
            "Please enter valid course details.";
        return;
    }

    completedHours = 0; // reset progress

    const fullDays = Math.floor(totalCourseHours / dailyHours);
    const remainingHours = totalCourseHours % dailyHours;

    let message = "";

    if (remainingHours === 0) {
        message = `Plan created! You need ${fullDays} full day(s) to complete "${course}".`;
    } else {
        message = `Plan created! You need ${fullDays} full day(s) and ${remainingHours.toFixed(1)} hour(s) on the next day to complete "${course}".`;
    }

    document.getElementById("result").innerText = message;
}
function logProgress() {
    const hoursStudied = Number(document.getElementById("dailyProgress").value);

    if (!course) {
        document.getElementById("progressStatus").innerText =
            "Please create a course plan first.";
        return;
    }

    if (hoursStudied <= 0) {
        document.getElementById("progressStatus").innerText =
            "Enter valid study hours.";
        return;
    }

    completedHours += hoursStudied;

    if (completedHours > totalCourseHours) {
        completedHours = totalCourseHours;
    }

    const remaining = totalCourseHours - completedHours;

    document.getElementById("progressStatus").innerText =
        `Progress updated! Completed: ${completedHours.toFixed(1)} hrs | Remaining: ${remaining.toFixed(1)} hrs`;
}

