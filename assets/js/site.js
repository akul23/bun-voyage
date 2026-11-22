// Shared helpers for Bun Voyage.
(function () {
  // Turn ISO country codes (e.g. "HU") into flag emoji.
  window.bvFlag = function (code) {
    if (!code || code.length !== 2) return "";
    return code.toUpperCase().replace(/./g, function (c) {
      return String.fromCodePoint(127397 + c.charCodeAt(0));
    });
  };

  window.bvType = function (key) {
    var types = window.BV_TYPES || {};
    return types[key] || types.other || { label: "Other", emoji: "🍽️", color: "#4a6b5d" };
  };

  window.bvEscape = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  function fillFlags(root) {
    (root || document).querySelectorAll("[data-flag]").forEach(function (el) {
      el.textContent = window.bvFlag(el.getAttribute("data-flag"));
    });
  }
  window.bvFillFlags = fillFlags;
  fillFlags();

  // Category chip filtering for simple grids (reviews page).
  document.querySelectorAll("[data-filter-target]").forEach(function (bar) {
    var target = document.querySelector(bar.getAttribute("data-filter-target"));
    if (!target) return;
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      bar.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("active", c === chip); });
      var cat = chip.getAttribute("data-cat");
      target.querySelectorAll("[data-cat]").forEach(function (item) {
        item.hidden = cat !== "all" && item.getAttribute("data-cat") !== cat;
      });
    });
  });

  // Shared chip-bar wiring that reports the selected category.
  window.bvChips = function (bar, onChange) {
    if (!bar) return;
    bar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      bar.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("active", c === chip); });
      onChange(chip.getAttribute("data-cat"));
    });
  };

  window.bvTiles = function (map) {
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(map);
  };
})();
