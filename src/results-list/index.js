import angular from 'angular';

import template   from './results-list.template.html';
import controller from './results-list.controller';
import {metroName, metroLine} from '../utils';

const bindings = {
  subject: '<',
  results: '<',
};

export default angular
  .module('resultsList', [])
  .filter('metroName', () => metroName)
  .filter('metroLine', () => metroLine)
  .component('resultsList', {controller, template, bindings})
  .name;
