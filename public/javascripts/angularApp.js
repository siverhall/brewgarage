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
    var rec = {
    	recipes: []
 	};
	rec.getAll = function() {
		return $http.get('/recipes').success(function(data){
			angular.copy(data, rec.recipes);
		})
	};
    rec.create = function(recipe) {
        return $http.post('/recipes', recipe).success(function(data){
            rec.recipes.push(data);
        });
    };
  	return rec;
}]);


app.controller('MainCtrl', [
'$scope', 'recipes',
function($scope, recipes){
  $scope.recipes = recipes.recipes;
  $scope.hops = [{name: 'Amarillo'}, {name: 'Simcoe'}, {name: 'Citra'}];
$scope.addRecipe = function(){
	if (!$scope.title || !$scope.style) { return; }
	  recipes.create({
	  	title: $scope.form.title,
	  	style: $scope.form.style,
	  	batchsize: $scope.form.batchsize,
	  	boiltime: $scope.form.boiltime,
	  	malts: [
	  		{name: 'Pilsner malt', amount: '5'}
	  	],
	  	hops: [
	  		{name: 'Amarillo', alpha: '7', amount: '10', time: '45'}
	  	],
	  	yeast: {name: 'Safale US-05', temp: '19', days: '10'}
	  });
	  $scope.form.title = '';
	  $scope.form.style = '';
	  $scope.form.batchsize = '';
	  $scope.form.boiltime = '';
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