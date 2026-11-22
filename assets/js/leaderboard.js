(function () {
  var reviews = (window.BV_REVIEWS || []).slice();
  var body = document.getElementById("board-body");
  var empty = document.getElementById("board-empty");
  var countrySel = document.getElementById("country-filter");
  var state = { cat: "all", country: "all" };

  // Country dropdown from the data.
  var countries = {};
  reviews.forEach(function (r) { if (r.country) countries[r.country] = r.country_code; });
  Object.keys(countries).sort().forEach(function (name) {
    var o = document.createElement("option");
    o.value = name;
    o.textContent = bvFlag(countries[name]) + " " + name;
    countrySel.appendChild(o);
  });

  function render() {
    var rows = reviews
      .filter(function (r) {
        return (state.cat === "all" || r.category === state.cat) &&
               (state.country === "all" || r.country === state.country);
      })
      .sort(function (a, b) { return b.rating - a.rating || (b.date > a.date ? 1 : -1); });

    empty.hidden = rows.length > 0;
    var rank = 0, prev = null;
    body.innerHTML = rows.map(function (r, i) {
      if (r.rating !== prev) { rank = i + 1; prev = r.rating; } // ties share a rank
      var t = bvType(r.category);
      var medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;
      return '<tr style="--accent:' + t.color + '">' +
        '<td class="rank-cell">' + medal + '</td>' +
        '<td><a href="' + r.url + '"><strong>' + bvEscape(r.title) + '</strong>' +
          (r.dish ? '<small>' + bvEscape(r.dish) + '</small>' : '') + '</a></td>' +
        '<td class="hide-sm">' + t.emoji + ' ' + bvEscape(t.label) + '</td>' +
        '<td>' + bvFlag(r.country_code) + ' ' + bvEscape(r.city) + '</td>' +
        '<td class="hide-sm muted">' + bvEscape(r.date) + '</td>' +
        '<td class="num"><span class="score-chip">' + r.rating + '</span></td>' +
      '</tr>';
    }).join("");
  }

  bvChips(document.getElementById("cat-filters"), function (cat) { state.cat = cat; render(); });
  countrySel.addEventListener("change", function () { state.country = countrySel.value; render(); });
  render();
})();
