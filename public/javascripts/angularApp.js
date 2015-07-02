var app = angular.module('brewgarage', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
            postPromise: ['recipes', function(recipes){
                return recipes.getAll();
            }]
        }
    })
    .state('recipes', {
    	url: '/recipes/{id}',
    	templateUrl: '/recipes.html',
    	controller: 'RecipeCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);


app.factory('recipes', ['$http', function($http){
    var r = {
    	recipes: []
 	};
	r.getAll = function() {
		return $http.get('/recipes').success(function(data){
			angular.copy(data, r.recipes);
		})
	};
  	return r;
}]);


app.controller('MainCtrl', [
'$scope', 'recipes',
function($scope, recipes){
  $scope.recipes = recipes.recipes;
  $scope.hops = [{name: 'Amarillo'}, {name: 'Simcoe'}, {name: 'Citra'}];
$scope.addRecipe = function(){
	if (!$scope.title || !$scope.style) { return; }
	  $scope.recipes.push({
	  	title: $scope.title, 
	  	style: $scope.style,
	  	batchsize: $scope.batchsize,
	  	boiltime: '60',
	  	malts: [
	  		{name: 'Pilsner malt', amount: '5 kg'}
	  	],
	  	hops: [
	  		{name: 'Amarillo', alpha: '7', amount: '10g', time: '45'}
	  	],
	  	yeast: {name: 'Safale US-05', temp: '19c', days: '10'}
	  });
	  $scope.title = '';
	  $scope.style = '';
	  $scope.batchsize = '';
};
}]);

app.controller('RecipeCtrl', [
'$scope',
'$stateParams',
'recipes',
function($scope, $stateParams, recipes){
	console.log("running");
	$scope.recipe = recipes.recipes[$stateParams.id];
}]);