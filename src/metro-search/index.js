import angular from 'angular';

import searchInput  from '../search-input';
import resultsMap   from '../results-map';
import resultsList  from '../results-list';

import template   from './metro-search.template.html';
import controller from './metro-search.controller';

export default angular
  .module('app.metro-search', [searchInput, resultsMap, resultsList])
  .component('metroSearch', {template, controller})
  .name;
