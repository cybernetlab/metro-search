export default class SearchInputController {
  constructor($scope, $element) {
    this.scope = $scope;
    $scope.$watch('selectedItem', (item) => {
      if (!item || !item.value) { return; }
      this.onUpdate({selected: item.value});
    });
  }

  query(searchText) {
    return ymaps.ready().then(() => ymaps.suggest(searchText));
  }
}

SearchInputController.$inject = ['$scope', '$element'];
