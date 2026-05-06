document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const result = document.getElementById("loginResult");

  if (email === "" || password === "") {
    showResult("low", "⚠ Please fill all fields");
    return;
  }

  // Accept any email & password
  showResult("good", "✅ Login successful! Redirecting...");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1200);

  function showResult(type, message) {
    result.classList.remove("hidden", "good", "low");
    result.classList.add(type);
    result.innerHTML = `<div class="status">${message}</div>`;
  }
});
