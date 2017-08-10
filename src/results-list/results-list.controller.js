import {geoCenter} from '../utils';

export default class ResultsListController {
  constructor($scope) {
    this.scope = $scope;
  }

  $onInit() {
    this.results = [];
    this.point = null;
  }

  setSubject(subject) {
    this.point = null;
    if (subject && subject.geometry) {
      this.point = geoCenter(subject.geometry);
    }
    this.calculateDistance();
  }

  setResults(results) {
    this.results = [];
    if (results && typeof results.toArray === 'function') {
      // convert yandex geoObjectCollection into array of metro objects
      this.results = results.toArray().map(obj => {
        let metro = {geoObject: obj, distance: null, duration: null};
        return metro;
      });
    }
    this.calculateDistance();
  }

  calculateDistance() {
    if (!this.point || !this.results || this.results.length <= 0) { return; }
    let options = {multiRoute: true, routingMode: 'pedestrian'};
    // wait for Yandex API to get ready
    ymaps.ready(() => {
      // request multiRouting for each metro in list
      this.results.forEach(metro => {
        let metroPoint = geoCenter(metro.geoObject.geometry);
        ymaps.route([
          {type: 'wayPoint', point: this.point},
          {type: 'wayPoint', point: metroPoint},
        ], options).then(multiRoute => {
          let routes = multiRoute.model.getRoutes();
          if (!routes || routes.length <= 0) { return; }
          let props = routes[0].properties.getAll();
          // in case we have valid route, add distance and duration to metro object
          this.scope.$apply(() => {
            metro.distance = props.distance;
            metro.duration = props.duration;
          });
        });
      });
    });
  }

  $onChanges(changes) {
    if (changes.subject) {
      this.setSubject(changes.subject.currentValue);
    }
    if (changes.results) {
      this.setResults(changes.results.currentValue);
    }
  }
}

ResultsListController.$inject = ['$scope'];
