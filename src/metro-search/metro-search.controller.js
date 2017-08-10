import {geoCenter} from '../utils';

export default class MetroSearchController {
  constructor($scope) {
    this.scope = $scope;
  }

  $onInit() {
    this.subject = null;
    this.results = [];
  }

  /**
   * Searches geo coordinates of specified address
   */
  search(address) {
    if (typeof address === 'string') {
      // wait for Yandex API to get ready and request geocoding
      ymaps.ready(() => {
        ymaps.geocode(address).then((data) => {
          let meta = data.metaData;
          if (meta && meta.geocoder && meta.geocoder.found > 0) {
            // if point is founded, set it as subject field
            this.scope.$apply(() => {
              this.subject = data.geoObjects.get(0);
            });
            // find point coordinates
            let center = geoCenter(this.subject.geometry);
            // search neraest metros
            if (center) { this.searchNearest(center); }
          }
        });
      });
    } else {
      this.subject = null;
    }
  }

  /**
   * Searches a list of metros, nearest to specified point
   */
  searchNearest(point) {
    if (point) {
      // wait for Yandex API to get ready
      ymaps.ready(() => {
        let options = {kind: 'metro'};
        ymaps.geocode(point, options).then((data) => {
          let meta = data.metaData;
          if (meta && meta.geocoder && meta.geocoder.found > 0) {
            // if metro list is not empty, set it as results field
            this.scope.$apply(() => {
              this.results = data.geoObjects;
            });
          }
        });
      });
    }
  }
}

MetroSearchController.$inject = ['$scope'];
