import angular from 'angular';

import template   from './search-input.template.html';
import controller from './search-input.controller';

const bindings = {
  onUpdate: '&',
};

export default angular
  .module('search-input', [])
  .component('searchInput', {template, controller, bindings})
  .name;
