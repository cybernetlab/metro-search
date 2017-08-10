import angular from 'angular';

import './results-map.scss';
import controller from './results-map.controller';

const bindings = {
  subject: '<',
  results: '<',
};

export default angular
  .module('resultsMap', [])
  .component('resultsMap', {controller, bindings})
  .name;
