mapboxgl.accessToken = 'pk.eyJ1Ijoic29waGlhbWV5ZXJzIiwiYSI6ImNtaDljY2V5dzFkYm0ya3B0cTB5NGxjYXUifQ.BKtiD06UgJVUyv1ODAQ-vA';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/sophiameyers/cmh9dpvwu00ay01sq35bb44mx', // your Style URL goes here
  center: [-122.6784, 45.5152], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
    });
