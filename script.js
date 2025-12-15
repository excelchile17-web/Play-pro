// for home page nevbar//

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const icon = menuBtn.querySelector("span");

  if (!menuBtn || !navLinks) return; // safety

  menuBtn.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", isActive ? "true" : "false");

    // toggle icon between bars and times
    if (isActive) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});


