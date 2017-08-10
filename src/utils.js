export function geoCenter(geometry) {
  if (geometry.getType() === 'Point') {
    return geometry.getCoordinates().slice();
  }
  if (typeof geometry.getBounds !== 'function') {
    return undefined;
  }
  let bounds = geometry.getBounds();
  return [
    bounds[0][0] + (bounds[1][0] - bounds[0][0]) / 2,
    bounds[0][1] + (bounds[1][1] - bounds[0][1]) / 2
  ];
}

export function metroName(obj) {
  if (!obj || !obj.properties || typeof obj.properties.getAll !== 'function') {
    return '';
  }
  let props = obj.properties.getAll();
  if (props.name) { return props.name; }
  let meta = props.metaDataProperty ?
             props.metaDataProperty.GeocoderMetaData :
             null;
  if (meta) {
    if (meta.Address && Array.isArray(meta.Address.Components)) {
      let c = meta.Address.Components.find(c => c.kind === 'metro');
      if (c) { return c.name; }
    }
  }
  return '';
}

export function metroLine(obj) {
  if (!obj || !obj.properties || typeof obj.properties.getAll !== 'function') {
    return '';
  }
  let props = obj.properties.getAll();
  let meta = props.metaDataProperty ?
             props.metaDataProperty.GeocoderMetaData :
             null;
  if (meta) {
    if (meta.Address && Array.isArray(meta.Address.Components)) {
      let c = meta.Address.Components.find(c => c.kind === 'route');
      if (c) { return c.name; }
    }
  }
  return '';
}
