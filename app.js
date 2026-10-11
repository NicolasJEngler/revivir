// Revivir: gestores y puntos de acopio de RAEE (Argentina)
// SPDX-License-Identifier: AGPL-3.0-or-later
// Datos en datos/puntos.json (CC0).

const DATOS = "datos/puntos.json";

const COLORES = {
  gestor: "#0b6ea8",
  planta: "#7b3fa0",
  acopio: "#1b7f3b",
  "punto-verde": "#2f7d32",
};

const ETIQUETA = {
  gestor: "Gestor / cooperativa RAEE",
  planta: "Planta de tratamiento",
  acopio: "Punto de acopio RAEE",
  "punto-verde": "Punto verde",
};

const map = L.map("map").setView([-38.4, -63.6], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const layer = L.layerGroup().addTo(map);

let puntos = [];

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function popup(p) {
  const color = COLORES[p.tipo] || "#555";
  const recibe = p.recibe || [];
  const noRecibe = p.no_recibe || [];
  let h = '<div class="pop">';

  h +=
    '<div class="pop__head">' +
    `<span class="pop__dot" style="background:${color}"></span>` +
    `<span class="pop__title">${esc(p.nombre)}</span>` +
    "</div>";
  h += `<div class="pop__tipo" style="color:${color}">${esc(ETIQUETA[p.tipo] || p.tipo)}</div>`;

  const lugar = [p.direccion, [p.localidad, p.provincia].filter(Boolean).join(", ")]
    .filter(Boolean)
    .map(esc)
    .join("<br>");
  if (lugar) h += `<div class="pop__lugar">${lugar}</div>`;

  if (recibe.length)
    h +=
      '<div class="pop__label">Recibe</div><div class="pop__chips">' +
      recibe.map((r) => `<span class="chip">${esc(r)}</span>`).join("") +
      "</div>";
  if (noRecibe.length)
    h +=
      '<div class="pop__label">No recibe</div><div class="pop__chips">' +
      noRecibe.map((r) => `<span class="chip chip--no">${esc(r)}</span>`).join("") +
      "</div>";

  const meta = [];
  if (p.horario) meta.push(`<div><span class="pop__k">Horario</span> ${esc(p.horario)}</div>`);
  if (p.operador) meta.push(`<div><span class="pop__k">Operador</span> ${esc(p.operador)}</div>`);
  if (meta.length) h += `<div class="pop__meta">${meta.join("")}</div>`;

  const estado =
    p.estado === "aproximado"
      ? '<span class="pop__estado pop__estado--aprox">ubicación aproximada</span>'
      : '<span class="pop__estado">verificado</span>';
  h +=
    '<div class="pop__foot">' +
    estado +
    (p.fuente ? `<a class="pop__src" href="${esc(p.fuente)}" target="_blank" rel="noopener">Fuente</a>` : "") +
    "</div>";

  h += "</div>";
  return h;
}

function provinciaSeleccionada() {
  return document.getElementById("provincia").value;
}

function tiposActivos() {
  return new Set(
    [...document.querySelectorAll("#tipos input:checked")].map((c) => c.value)
  );
}

function render() {
  const prov = provinciaSeleccionada();
  const tipos = tiposActivos();
  const visibles = puntos.filter(
    (p) => (!prov || p.provincia === prov) && tipos.has(p.tipo)
  );

  layer.clearLayers();
  for (const p of visibles) {
    L.circleMarker([p.lat, p.lon], {
      radius: 8,
      color: COLORES[p.tipo] || "#555",
      weight: 2,
      fillColor: COLORES[p.tipo] || "#555",
      fillOpacity: 0.5,
    })
      .bindPopup(popup(p))
      .addTo(layer);
  }

  const resumen = document.getElementById("resumen");
  const lista = document.getElementById("list");
  resumen.textContent = `${visibles.length} gestores${prov ? " en " + prov : ""}`;
  lista.innerHTML = visibles.length
    ? visibles
        .slice()
        .sort((a, b) => (a.provincia || "").localeCompare(b.provincia || ""))
        .map(
          (p) =>
            `<li><strong>${p.nombre}</strong><br><small>${ETIQUETA[p.tipo] || p.tipo}` +
            (p.localidad ? " · " + p.localidad : "") +
            (p.provincia ? " · " + p.provincia : "") +
            `</small></li>`
        )
        .join("")
    : '<li class="nota">No hay puntos con esos filtros.</li>';
}

async function init() {
  try {
    const res = await fetch(DATOS, { cache: "no-store" });
    const data = await res.json();
    puntos = (data.puntos || []).filter((p) => p.lat != null && p.lon != null);

    const provincias = [...new Set(puntos.map((p) => p.provincia).filter(Boolean))].sort();
    const sel = document.getElementById("provincia");
    for (const prov of provincias) {
      const opt = document.createElement("option");
      opt.value = prov;
      opt.textContent = prov;
      sel.appendChild(opt);
    }

    if (puntos.length) {
      map.fitBounds(L.latLngBounds(puntos.map((p) => [p.lat, p.lon])), { padding: [40, 40] });
    }
    render();

    sel.addEventListener("change", render);
    document.querySelectorAll("#tipos input").forEach((c) => c.addEventListener("change", render));
  } catch (e) {
    document.getElementById("resumen").textContent = "No se pudieron cargar los datos";
    document.getElementById("list").innerHTML =
      '<li class="nota">Revisá datos/puntos.json.</li>';
    console.error(e);
  }
}

init();
