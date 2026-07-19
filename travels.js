(function () {
  'use strict';

  // Paste your Google Sheet "Publish to web → CSV" link here once it's ready.
  // Until then, the page falls back to SAMPLE_DATA below so the map has something to show.
  const CSV_URL = '';

  // Fixed hue order — validated for colorblind-safe separation. Categories are
  // assigned slots in first-seen order; a 5th+ category falls back to a neutral grey.
  const SLOT_COLORS = {
    light: ['#2a78d6', '#008300', '#e87ba4', '#eda100'],
    dark: ['#3987e5', '#008300', '#d55181', '#c98500']
  };
  const FALLBACK_COLOR = { light: '#9ca3af', dark: '#64748b' };

  const SAMPLE_DATA = [
    { place: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456, category: 'Long-term stay', activity: 'Government consulting', dates: '', description: '' },
    { place: 'Beijing, China', lat: 39.9992, lng: 116.3262, category: 'Long-term stay', activity: 'Graduate research team, Tsinghua University', dates: '', description: '' },
    { place: 'Hebei, China', lat: 38.0428, lng: 114.5149, category: 'Long-term stay', activity: 'Software Engineer, Meihua Group', dates: '2023–present', description: '' }
  ];

  let map, tileLayer, markersLayer;
  let categoryOrder = [];
  let rows = [];

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function tileUrlFor(theme) {
    return theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  }

  function colorFor(category) {
    let idx = categoryOrder.indexOf(category);
    if (idx === -1) {
      categoryOrder.push(category);
      idx = categoryOrder.length - 1;
    }
    const palette = SLOT_COLORS[currentTheme()];
    return idx < palette.length ? palette[idx] : FALLBACK_COLOR[currentTheme()];
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function normalizeRow(raw) {
    const row = {};
    Object.keys(raw).forEach(k => { row[k.trim().toLowerCase()] = (raw[k] || '').toString().trim(); });
    return {
      place: row.place || '',
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng),
      category: row.category || 'Other',
      activity: row.activity || '',
      dates: row.dates || '',
      description: row.description || '',
      image: row.image || ''
    };
  }

  function renderLegend() {
    const el = document.getElementById('travel-legend');
    if (!el) return;
    const palette = SLOT_COLORS[currentTheme()];
    el.innerHTML = categoryOrder.map((cat, i) => {
      const color = i < palette.length ? palette[i] : FALLBACK_COLOR[currentTheme()];
      return `<span class="legend-chip"><span class="legend-dot" style="background:${color}"></span>${escapeHtml(cat)}</span>`;
    }).join('');
  }

  function renderMarkers() {
    markersLayer.clearLayers();
    categoryOrder = [];
    rows.forEach(row => {
      if (isNaN(row.lat) || isNaN(row.lng)) return;
      const marker = L.circleMarker([row.lat, row.lng], {
        radius: 8,
        weight: 2,
        color: '#fff',
        fillColor: colorFor(row.category),
        fillOpacity: 0.9
      });
      const parts = [];
      if (row.image) parts.push(`<img class="travel-popup-img" src="${escapeHtml(row.image)}" alt="${escapeHtml(row.place)}" loading="lazy" />`);
      const lines = [`<strong>${escapeHtml(row.place)}</strong>`];
      if (row.activity) lines.push(escapeHtml(row.activity));
      if (row.dates) lines.push(escapeHtml(row.dates));
      parts.push(lines.join('<br/>'));
      if (row.description) parts.push(`<p class="travel-popup-story">${escapeHtml(row.description)}</p>`);
      marker.bindPopup(parts.join(''), { maxWidth: 260 });
      marker.addTo(markersLayer);
    });
    renderLegend();
  }

  function initMap() {
    map = L.map('travel-map', { scrollWheelZoom: false }).setView([20, 60], 2);
    tileLayer = L.tileLayer(tileUrlFor(currentTheme()), {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }

  function refreshTheme() {
    map.removeLayer(tileLayer);
    tileLayer = L.tileLayer(tileUrlFor(currentTheme()), {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 19
    }).addTo(map);
    renderMarkers();
  }

  function loadData() {
    if (!CSV_URL) {
      rows = SAMPLE_DATA;
      renderMarkers();
      return;
    }
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const parsed = results.data.map(normalizeRow).filter(r => r.place && !isNaN(r.lat) && !isNaN(r.lng));
        rows = parsed.length ? parsed : SAMPLE_DATA;
        renderMarkers();
      },
      error: err => {
        console.error('[travels] failed to load CSV, showing sample data:', err);
        rows = SAMPLE_DATA;
        renderMarkers();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadData();
    new MutationObserver(refreshTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  });
})();
