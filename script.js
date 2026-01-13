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
    document.getElementById("progressBar").style.width = "0%";
document.getElementById("progressMessage").innerText = "";
document.getElementById("progressStatus").innerText = "";

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

   const progressPercent = (completedHours / totalCourseHours) * 100;

document.getElementById("progressBar").style.width =
    progressPercent + "%";

document.getElementById("progressStatus").innerText =
    `Completed: ${completedHours.toFixed(1)} hrs | Remaining: ${remaining.toFixed(1)} hrs`;

let motivation = "";

if (progressPercent >= 100) {
    motivation = "🎉 Course completed! Amazing discipline!";
} else if (progressPercent >= 75) {
    motivation = "🔥 Almost there! Finish strong!";
} else if (progressPercent >= 50) {
    motivation = "💪 Halfway done! Keep going!";
} else if (progressPercent >= 25) {
    motivation = "🚀 Great start! Consistency matters!";
} else {
    motivation = "🌱 Every hour counts. Stay consistent!";
}

document.getElementById("progressMessage").innerText = motivation;

}

