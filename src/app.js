import angular from 'angular';

import 'angular-material/angular-material.scss';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import metroSearch from './metro-search';

angular.module('app', ['ngMaterial', metroSearch]);
