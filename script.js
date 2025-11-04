mapboxgl.accessToken = 'pk.eyJ1Ijoic29waGlhbWV5ZXJzIiwiYSI6ImNtaDljY2V5dzFkYm0ya3B0cTB5NGxjYXUifQ.BKtiD06UgJVUyv1ODAQ-vA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/sophiameyers/cmh9dpvwu00ay01sq35bb44mx',
  center: [-122.2730, 37.8715],
  zoom: 11
});

map.on('load', () => {
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/pps645172-ops/CARTOC183/refs/heads/main/data/183data.geojson'
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': 'F54927',
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#000000'
    }
  });

  map.on('click', 'points-layer', (e) => {
    const properties = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();

    // Fly to selected point
    map.flyTo({
      center: coordinates,
      zoom: 15,
      essential: true
    });

    // Build overlay content
    const infoHTML = `
      <h3>${properties.Landmark}</h3>
      <p><strong>Address:</strong> ${properties.Address}</p>
      <p><strong>Architect & Date:</strong> ${properties.Architect_Date}</p>
      <p><strong>Designated:</strong> ${properties.Designated}</p>
      ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
      ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
    `;

    document.getElementById('overlay-content').innerHTML = infoHTML;
    document.getElementById('overlay').classList.add('show');
  });

  // Hide overlay when clicking outside content
  document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('overlay').classList.remove('show');
  });

  // Prevent overlay content click from closing
  document.querySelector('.overlay-content').addEventListener('click', e => {
    e.stopPropagation();
  });

  // Change cursor style on hover for interactivity
  map.on('mouseenter', 'points-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
  });
});
