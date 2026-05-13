/* ═══════════════════════════════════════════
   VoltGrid — Charging Stations JavaScript
   ═══════════════════════════════════════════ */

'use strict';

const STATIONS = [
  {
    id: 1,
    name: 'VoltGrid Downtown Hub',
    address: '1 Market St, San Francisco',
    type: 'fast',
    typeLabel: 'DC Fast',
    power: '150 kW',
    ports: 8,
    available: 5,
    price: '$0.28/kWh',
    status: 'available',
    distance: '0.3 mi',
  },
  {
    id: 2,
    name: 'Bayshore Superstation',
    address: '450 Bayshore Blvd, SF',
    type: 'fast',
    typeLabel: 'DC Fast',
    power: '350 kW',
    ports: 12,
    available: 0,
    price: '$0.32/kWh',
    status: 'busy',
    distance: '1.1 mi',
  },
  {
    id: 3,
    name: 'Mission District Level 2',
    address: '2200 Mission St, SF',
    type: 'level2',
    typeLabel: 'Level 2',
    power: '22 kW',
    ports: 6,
    available: 3,
    price: '$0.18/kWh',
    status: 'available',
    distance: '1.8 mi',
  },
  {
    id: 4,
    name: 'SolarCharge Civic Center',
    address: '400 Van Ness Ave, SF',
    type: 'solar',
    typeLabel: 'Solar',
    power: '75 kW',
    ports: 4,
    available: 2,
    price: '$0.22/kWh',
    status: 'available',
    distance: '2.4 mi',
  },
  {
    id: 5,
    name: 'North Beach Fast Hub',
    address: '740 Columbus Ave, SF',
    type: 'fast',
    typeLabel: 'DC Fast',
    power: '150 kW',
    ports: 6,
    available: 1,
    price: '$0.29/kWh',
    status: 'available',
    distance: '3.0 mi',
  },
  {
    id: 6,
    name: 'SoMa Solar Station',
    address: '600 Folsom St, SF',
    type: 'solar',
    typeLabel: 'Solar',
    power: '50 kW',
    ports: 4,
    available: 0,
    price: '$0.20/kWh',
    status: 'busy',
    distance: '3.7 mi',
  },
];

let activeFilter = 'all';

function renderStations(filter = 'all') {
  const list = document.getElementById('stationList');
  if (!list) return;

  const filtered = filter === 'all'
    ? STATIONS
    : STATIONS.filter(s => s.type === filter);

  list.innerHTML = filtered.map(s => `
    <div class="station-item" data-type="${s.type}">
      <div class="si-header">
        <span class="si-name">${s.name}</span>
        <span class="si-badge ${s.status}">${s.status === 'available' ? `${s.available} Free` : 'Busy'}</span>
      </div>
      <p class="si-meta">
        <span><i class="fas fa-map-marker-alt"></i> ${s.distance}</span>
        <span><i class="fas fa-bolt"></i> ${s.power}</span>
        <span><i class="fas fa-plug"></i> ${s.ports} ports</span>
      </p>
      <div class="si-info">
        <span class="si-price">${s.price}</span>
        <span class="si-type">${s.typeLabel}</span>
        <button class="si-nav" onclick="navigateTo(${s.id})">
          <i class="fas fa-navigation"></i> Navigate
        </button>
      </div>
    </div>
  `).join('');

  // Animate in
  list.querySelectorAll('.station-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(16px)';
    item.style.transition = `opacity .35s ease ${i * 0.06}s, transform .35s ease ${i * 0.06}s`;
    requestAnimationFrame(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    });
  });
}

function filterStation(btn, filter) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = filter;
  renderStations(filter);
}

function navigateTo(id) {
  const station = STATIONS.find(s => s.id === id);
  if (!station) return;
  const btn = event.currentTarget;
  btn.innerHTML = '<i class="fas fa-check"></i> Opening…';
  setTimeout(() => { btn.innerHTML = '<i class="fas fa-navigation"></i> Navigate'; }, 2000);
}

// Re-export for inline HTML usage
window.filterStation = filterStation;
window.navigateTo   = navigateTo;
window.searchStations = function() {
  const query = document.getElementById('stationSearch').value.trim().toLowerCase();
  if (!query) { renderStations(activeFilter); return; }
  const filtered = STATIONS.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.address.toLowerCase().includes(query)
  );
  const list = document.getElementById('stationList');
  list.innerHTML = filtered.length
    ? filtered.map(s => `
        <div class="station-item">
          <div class="si-header">
            <span class="si-name">${s.name}</span>
            <span class="si-badge ${s.status}">${s.status === 'available' ? `${s.available} Free` : 'Busy'}</span>
          </div>
          <p class="si-meta">
            <span><i class="fas fa-map-marker-alt"></i> ${s.distance}</span>
            <span><i class="fas fa-bolt"></i> ${s.power}</span>
          </p>
          <div class="si-info">
            <span class="si-price">${s.price}</span>
            <span class="si-type">${s.typeLabel}</span>
            <button class="si-nav">Navigate</button>
          </div>
        </div>`).join('')
    : '<p style="color:var(--text-soft);padding:16px;font-size:.9rem;">No stations found for that location.</p>';
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => renderStations());