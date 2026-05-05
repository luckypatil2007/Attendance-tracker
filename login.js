document.getElementById("loginBtn").addEventListener("click", function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const result = document.getElementById("loginResult");

  if (email === "" || password === "") {
    showResult("low", "⚠ Please fill all fields");
    return;
  }


  if (email === "admin@gmail.com" && password === "123456") {
    showResult("good", "✅ Login successful! Redirecting...");
    
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1200);

  } else {
    showResult("low", "❌ Invalid email or password");
  }

  function showResult(type, message) {
    result.classList.remove("hidden", "good", "low");
    result.classList.add(type);
    result.innerHTML = `<div class="status">${message}</div>`;
  }
});