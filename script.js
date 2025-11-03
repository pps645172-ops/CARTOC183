mapboxgl.accessToken = 'pk.eyJ1Ijoic29waGlhbWV5ZXJzIiwiYSI6ImNtaDljY2V5dzFkYm0ya3B0cTB5NGxjYXUifQ.BKtiD06UgJVUyv1ODAQ-vA';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/sophiameyers/cmh9dpvwu00ay01sq35bb44mx', // your Style URL goes here
  center: [-122.2730, 37.8715], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });
map.on('load', function() {
  map.addSource('points-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/pps645172-ops/CARTOC183/refs/heads/main/data/183data.geosjon'
    });
    map.addLayer({
        id: 'points-layer',
        type: 'circle',
        source: 'points-data',
        paint: {
            'circle-color': '#4264FB',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });
    // Add click event for popups
    map.on('click', 'points-layer', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
            const properties = e.features[0].properties;

    });
     // Create popup content using the properties from the data
           const popupContent = `
              <div>
                  <h3>${properties.original_*Landmark*}</h3>
                  <p><strong>Address:</strong> ${properties.original_*Address*}</p>
                  <p><strong>Architect & Date:</strong> ${original_*Architect & Date*}</p>
                  <p><strong>Designated:</strong> ${original_* Designated *}</p>
                  ${properties.attribution_url ? `<p><a href="${properties.attribution_url}" target="_blank">More Information</a></p>` : ''}
                  ${properties.*Notes* ? `<p><strong>Notes:</strong> ${properties.*Notes*}</p>` : ''}
              </div>
    `      ;
        // Build and attach popup to coordinates
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(popupContent)
              .addTo(map);
      });

      // Change cursor to pointer when hovering over points
      map.on('mouseenter', 'points-layer', () => {
              map.getCanvas().style.cursor = 'pointer';
      });

      // Change cursor back when leaving points
      map.on('mouseleave', 'points-layer', () => {
            map.getCanvas().style.cursor = '';
      });       
});
