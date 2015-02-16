(function(app) {
	var alphaCtrl = function($scope, dataServ, $routeParams, wSEO){
		wSEO.setTitle('Index Numérique (H&L)');

		$scope.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V"];
		$scope.index = $routeParams.ID;
		dataServ.getServData('alphabet', $routeParams.ID).then(function(data){
			$scope.alpha = data;
		})
	};

	app.controller('alphaCtrl', ['$scope', 'dataServ', '$routeParams', 'wSEO', alphaCtrl]);

})(angular.module('wsapp'));
