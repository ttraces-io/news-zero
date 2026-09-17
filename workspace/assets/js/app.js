/* Zero-Tracking Client-Side Interaction Script */

function applyFilters() {
  const country = document.getElementById("country-select").value.toLowerCase();
  const category = document.getElementById("category-select").value.toLowerCase();
  const search = document.getElementById("search-input").value.toLowerCase();

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    const cardCountry = (card.getAttribute("data-country") || "").toLowerCase();
    const cardCat = (card.getAttribute("data-category") || "").toLowerCase();
    const text = card.textContent.toLowerCase();

    const matchCountry = !country || cardCountry === country || cardCountry === "global";
    const matchCat = !category || cardCat === category;
    const matchSearch = !search || text.includes(search);

    if (matchCountry && matchCat && matchSearch) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function toggleLike(id) {
  if (!id) return;
  const key = "liked:" + id;
  const isLiked = localStorage.getItem(key) === "true";
  if (isLiked) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, "true");
  }
  updateLikeButton(id);
}

function updateLikeButton(id) {
  const btn = document.getElementById("like-" + id);
  if (!btn) return;
  const key = "liked:" + id;
  const isLiked = localStorage.getItem(key) === "true";
  if (isLiked) {
    btn.textContent = "LIKED [LOCAL]";
    btn.style.borderColor = "var(--color-signal-green)";
    btn.style.color = "var(--color-signal-green)";
  } else {
    btn.textContent = "LIKE";
    btn.style.borderColor = "var(--color-wire)";
    btn.style.color = "var(--color-paper)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[id^='like-']").forEach(btn => {
    const id = btn.id.replace("like-", "");
    updateLikeButton(id);
  });
});
