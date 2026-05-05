document.addEventListener("DOMContentLoaded", function () {

  const totalInput     = document.getElementById("totalClasses");
  const attendedInput  = document.getElementById("attendedClasses");
  const remainingInput = document.getElementById("remainingClasses");
  const checkBtn       = document.getElementById("checkBtn");
  const resultBox      = document.getElementById("result");

  checkBtn.addEventListener("click", function () {
    checkAttendance();
  });

  function checkAttendance() {
    clearErrors();

    const total     = parseInt(totalInput.value, 10);
    const attended  = parseInt(attendedInput.value, 10);
    const remaining = parseInt(remainingInput.value, 10);

    if (!validateInputs(total, attended, remaining)) {
      return;
    }

    calculateAndDisplay(total, attended, remaining);
  }

  function validateInputs(total, attended, remaining) {
    let valid = true;

    if (isNaN(total) || total < 1) {
      markError(totalInput, "Please enter total classes (at least 1)");
      valid = false;
    }

    if (isNaN(attended) || attended < 0) {
      markError(attendedInput, "Please enter attended classes (0 or more)");
      valid = false;
    }

    if (isNaN(remaining) || remaining < 0) {
      markError(remainingInput, "Please enter remaining classes (0 or more)");
      valid = false;
    }

    if (valid && attended > total) {
      markError(attendedInput, "Attended cannot exceed total classes");
      valid = false;
    }

    return valid;
  }

  function calculateAndDisplay(total, attended, remaining) {
    const percentage = (attended / total) * 100;
    const percentageDisplay = percentage.toFixed(2);

    if (percentage >= 75) {
      showGoodResult(percentageDisplay, attended, total, remaining);
    } else {
      showLowResult(percentageDisplay, attended, total, remaining);
    }
  }

  function showGoodResult(percentageDisplay, attended, total, remaining) {
    const totalFinal = total + remaining;
    const minNeeded  = Math.ceil(0.75 * totalFinal);
    const canSkip    = Math.max(0, (attended + remaining) - minNeeded);

    let html = `
      <div class="percentage">${percentageDisplay}%</div>
      <div class="status">✅ Good! You are safe.</div>
    `;

    if (remaining > 0) {
      html += `
        <div class="info">
          You can miss up to <strong>${canSkip}</strong> of the remaining
          ${remaining} classes and still stay above 75%.
        </div>
      `;
    } else {
      html += `<div class="info">No remaining classes in the semester.</div>`;
    }

    displayResult("good", html);
  }

  function showLowResult(percentageDisplay, attended, total, remaining) {
    const needed = Math.ceil((0.75 * total - attended) / 0.25);

    let html = `
      <div class="percentage">${percentageDisplay}%</div>
      <div class="status">⚠️ Low Attendance!</div>
    `;

    if (needed > remaining) {
      html += `
        <div class="info">
          You need to attend <strong>${needed} more</strong> consecutive classes,
          but only <strong>${remaining}</strong> remain this semester.<br/><br/>
          ❌ You <strong>cannot reach 75%</strong> even if you attend all
          remaining classes.
        </div>
      `;
    } else {
      html += `
        <div class="info">
          Attend the next <strong>${needed} classes</strong> continuously
          to reach 75%.<br/><br/>
          (${remaining - needed} more class${remaining - needed !== 1 ? "es" : ""}
          will remain after you recover your attendance.)
        </div>
      `;
    }

    displayResult("low", html);
  }

  function displayResult(type, html) {
    resultBox.classList.remove("hidden", "good", "low");
    resultBox.classList.add(type);
    resultBox.innerHTML = html;
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function markError(inputElement, message) {
    inputElement.classList.add("error");

    const hint = inputElement.parentElement.querySelector(".hint");
    if (hint) {
      hint.textContent = "⚠ " + message;
      hint.style.color = "#f87171";
    }
  }

  function clearErrors() {
    [totalInput, attendedInput, remainingInput].forEach(function (input) {
      input.classList.remove("error");
    });

    const hints = [
      { el: totalInput,     text: "Classes conducted so far" },
      { el: attendedInput,  text: "How many you were present for" },
      { el: remainingInput, text: "Classes yet to be held this semester" }
    ];

    hints.forEach(function (item) {
      const hint = item.el.parentElement.querySelector(".hint");
      if (hint) {
        hint.textContent = item.text;
        hint.style.color = "";
      }
    });

    resultBox.classList.add("hidden");
    resultBox.classList.remove("good", "low");
  }

});