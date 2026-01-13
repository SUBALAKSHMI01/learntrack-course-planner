let course = null;
let totalCourseHours = 0;
let completedHours = 0;

/* ---------- Local Storage ---------- */
function saveState() {
    const state = {
        course,
        totalCourseHours,
        completedHours
    };
    localStorage.setItem("learnTrackState", JSON.stringify(state));
}

function loadState() {
    const savedState = localStorage.getItem("learnTrackState");
    if (!savedState) return;

    const state = JSON.parse(savedState);
    course = state.course;
    totalCourseHours = state.totalCourseHours;
    completedHours = state.completedHours;

    updateUIAfterLoad();
}

/* ---------- UI Restore ---------- */
function updateUIAfterLoad() {
    if (!course) return;

    const remaining = totalCourseHours - completedHours;
    const progressPercent = (completedHours / totalCourseHours) * 100;

    document.getElementById("result").innerText =
        `Resumed course "${course}"`;

    document.getElementById("progressBar").style.width =
        progressPercent + "%";

    document.getElementById("progressStatus").innerText =
        `Completed: ${completedHours.toFixed(1)} hrs | Remaining: ${remaining.toFixed(1)} hrs`;

    document.getElementById("progressMessage").innerText =
        getMotivationMessage(progressPercent);
}

/* ---------- Motivation ---------- */
function getMotivationMessage(progressPercent) {
    if (progressPercent >= 100) {
        return "🎉 Course completed! Amazing discipline!";
    } else if (progressPercent >= 75) {
        return "🔥 Almost there! Finish strong!";
    } else if (progressPercent >= 50) {
        return "💪 Halfway done! Keep going!";
    } else if (progressPercent >= 25) {
        return "🚀 Great start! Consistency matters!";
    } else {
        return "🌱 Every hour counts. Stay consistent!";
    }
}

/* ---------- Create Plan ---------- */
function createPlan() {
    course = document.getElementById("courseName").value.trim();
    totalCourseHours = Number(document.getElementById("totalHours").value);
    const dailyHours = Number(document.getElementById("dailyHours").value);

    if (!course || totalCourseHours <= 0 || dailyHours <= 0) {
        document.getElementById("result").innerText =
            "Please enter valid course details.";
        return;
    }

    completedHours = 0;

    const fullDays = Math.floor(totalCourseHours / dailyHours);
    const remainingHours = totalCourseHours % dailyHours;

    let message;
    if (remainingHours === 0) {
        message = `Plan created! You need ${fullDays} full day(s) to complete "${course}".`;
    } else {
        message = `Plan created! You need ${fullDays} full day(s) and ${remainingHours.toFixed(1)} hour(s) on the next day to complete "${course}".`;
    }

    document.getElementById("result").innerText = message;
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("progressStatus").innerText = "";
    document.getElementById("progressMessage").innerText = "";

    saveState();
}

/* ---------- Log Progress ---------- */
function logProgress() {
    if (!course) {
        document.getElementById("progressStatus").innerText =
            "Please create a course plan first.";
        return;
    }

    if (completedHours >= totalCourseHours) {
        document.getElementById("progressStatus").innerText =
            "Course already completed. Great job! 🎉";
        return;
    }

    const input = document.getElementById("dailyProgress");
    const hoursStudied = Number(input.value);
    input.value = "";

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

    document.getElementById("progressBar").style.backgroundColor = "#2ecc71";

    document.getElementById("progressStatus").innerText =
        `Completed: ${completedHours.toFixed(1)} hrs | Remaining: ${remaining.toFixed(1)} hrs`;

    document.getElementById("progressMessage").innerText =
        getMotivationMessage(progressPercent);

    saveState();
}

/* ---------- On Load ---------- */
window.onload = loadState;
