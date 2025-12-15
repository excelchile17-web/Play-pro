document.addEventListener("DOMContentLoaded", () => {

  /* ========= NAVBAR ========= */
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* ========= FREETOGAME API ========= */
  const API_URL =
    "https://corsproxy.io/?https://www.freetogame.com/api/games?platform=browser";

  const gamesDiv = document.getElementById("games");
  const genreLinksDiv = document.getElementById("genreLinks");

  let allGames = [];

  fetch(API_URL)
    .then(res => res.json())
    .then(games => {
      allGames = games;

      const genres = ["All", ...new Set(games.map(g => g.genre))].sort();

      genres.forEach(genre => {
        const link = document.createElement("a");
        link.textContent = genre;
        link.dataset.genre = genre.toLowerCase();
        if (genre === "All") link.classList.add("active");

        link.addEventListener("click", () => {
          document.querySelectorAll("#genreLinks a")
            .forEach(a => a.classList.remove("active"));
          link.classList.add("active");
          renderGames(link.dataset.genre);
        });

        genreLinksDiv.appendChild(link);
      });

      renderGames("all");
    });

  function renderGames(selectedGenre) {
    gamesDiv.innerHTML = "";

    const filtered =
      selectedGenre === "all"
        ? allGames
        : allGames.filter(g => g.genre.toLowerCase() === selectedGenre);

    const grouped = {};

    filtered.forEach(game => {
      grouped[game.genre] ??= [];
      grouped[game.genre].push(game);
    });

    for (const genre in grouped) {
      const title = document.createElement("h2");
      title.textContent = genre;
      gamesDiv.appendChild(title);

      grouped[genre].forEach(game => {
        const card = document.createElement("div");
        card.className = "game";
        card.innerHTML = `
          <img src="${game.thumbnail}" alt="${game.title}">
          <div>
            <h3>${game.title}</h3>
            <a href="${game.game_url}" target="_blank">Play Now</a>
          </div>
        `;
        gamesDiv.appendChild(card);
      });
    }
  }
});
