function createPlan() {
    const courseName = document.getElementById("courseName").value.trim();
    const totalHours = Number(document.getElementById("totalHours").value);
    const dailyHours = Number(document.getElementById("dailyHours").value);

    if (!courseName || totalHours <= 0 || dailyHours <= 0) {
        document.getElementById("result").innerText =
            "Please enter valid course details.";
        return;
    }

    const fullDays = Math.floor(totalHours / dailyHours);
    const remainingHours = totalHours % dailyHours;

    let message = "";

    if (remainingHours === 0) {
        message = `You need ${fullDays} full day(s) to complete "${courseName}".`;
    } else {
        message = `You need ${fullDays} full day(s) and ${remainingHours.toFixed(1)} hour(s) on the next day to complete "${courseName}".`;
    }

    document.getElementById("result").innerText = message;
}
