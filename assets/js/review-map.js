(function () {
  var el = document.getElementById("mini-map");
  if (!el || !window.L) return;
  var lat = parseFloat(el.dataset.lat), lng = parseFloat(el.dataset.lng);
  var map = L.map(el, { scrollWheelZoom: false, zoomControl: false, attributionControl: true }).setView([lat, lng], 14);
  bvTiles(map);
  L.circleMarker([lat, lng], {
    radius: 10, color: "#fff", weight: 3, fillColor: el.dataset.color || "#d9412b", fillOpacity: 1
  }).addTo(map);
})();
