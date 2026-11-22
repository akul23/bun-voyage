(function () {
  var reviews = (window.BV_REVIEWS || []).filter(function (r) {
    return typeof r.lat === "number" && typeof r.lng === "number";
  });
  var map = L.map("world-map", { worldCopyJump: true, scrollWheelZoom: true }).setView([30, 10], 2);
  bvTiles(map);

  function icon(r) {
    var t = bvType(r.category);
    return L.divIcon({
      className: "pin-wrap",
      html: '<span class="pin" style="--accent:' + t.color + '"><span>' + r.rating + '</span></span>',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -34]
    });
  }

  function popup(r) {
    var t = bvType(r.category);
    return '<div class="popup">' +
      (r.image ? '<img src="' + r.image + '" alt="">' : '') +
      '<span class="popup-type">' + t.emoji + ' ' + bvEscape(t.label) + '</span>' +
      '<strong>' + bvEscape(r.title) + '</strong>' +
      (r.dish ? '<em>' + bvEscape(r.dish) + '</em>' : '') +
      '<span class="popup-meta">' + bvFlag(r.country_code) + ' ' + bvEscape(r.city) + ' · <b>' + r.rating + '/10</b></span>' +
      '<a href="' + r.url + '">Read review →</a>' +
    '</div>';
  }

  var layer = L.featureGroup().addTo(map);
  function draw(cat) {
    layer.clearLayers();
    reviews
      .filter(function (r) { return cat === "all" || r.category === cat; })
      .forEach(function (r) {
        L.marker([r.lat, r.lng], { icon: icon(r), riseOnHover: true }).bindPopup(popup(r)).addTo(layer);
      });
    if (layer.getLayers().length) map.fitBounds(layer.getBounds(), { padding: [50, 50], maxZoom: 12 });
  }

  bvChips(document.getElementById("map-filters"), draw);
  draw("all");
})();
