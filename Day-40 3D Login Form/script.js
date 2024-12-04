/*
    Author: Tkemza
    MIT LICENSE 2024 (c)
*/

document.addEventListener("DOMContentLoaded", () => {
    // Apply background to the body
    document.body.style.cssText = `
      margin: 0;
      height: 100vh;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      background-size: 400% 400%;
      animation: gradientAnimation 10s ease infinite;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
      color: white;
      overflow: hidden;
    `;

    // Add gradient animation styles dynamically
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
  });
  