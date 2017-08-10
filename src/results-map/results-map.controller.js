import {geoCenter} from '../utils';

const defaultCenter = [55.76, 37.64];
const defaultZoom   = 13;

export default class ResultsMapController {
  constructor($element) {
    this.el = $element[0];
    this.map = null;
    this.subject = null;
    this.results = null;
  }

  $postLink() {
    // wait for Yandex API to get ready and create new map object
    ymaps.ready(() => {
      this.map = new ymaps.Map(this.el, {
        center: defaultCenter.slice(),
        zoom: defaultZoom,
        controls: ['zoomControl', 'rulerControl'],
      });
    });
  }

  $onDestroy() {
    if (this.map && typeof this.map.destroy === 'function') {
      this.map.destroy();
    }
  }

  setSubject(object) {
    if (this.subject) {
      this.map.geoObjects.remove(this.subject);
    }
    this.subject = object;
    let center = null;
    if (object) {
      // put subject point as a red baloon
      this.map.geoObjects.add(object);
      object.options.set('preset', 'islands#redIcon');
      center = geoCenter(object.geometry);
      if (center) {
        this.map.panTo(center, {checkZoomRange: true});
      }
    } else {
      this.map.panTo(defaultCenter.slice(), {checkZoomRange: true});
    }
  }

  setResults(results) {
    if (this.results) {
      this.map.geoObjects.removeAll();
    }
    // put results as a metro baloon
    this.map.geoObjects.add(results);
    results.each(obj => {
      obj.options.set('preset', 'islands#blueRapidTransitCircleIcon');
    });
    this.results = results;
    if (this.subject) {
      // move subject on top of results
      this.map.geoObjects.remove(this.subject);
      this.map.geoObjects.add(this.subject);
    }
  }

  $onChanges(changes) {
    if (!this.map) { return; }
    if (changes.subject) {
      this.setSubject(changes.subject.currentValue);
    }
    if (changes.results) {
      this.setResults(changes.results.currentValue);
    }
  }
}

ResultsMapController.$inject = ['$element'];
