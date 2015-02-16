(function(app) {
    var sanitize = function ($sce) {
	    var converter = new Showdown.converter();
	    return function (value) {
			var html = converter.makeHtml(value || '');
	        return $sce.trustAsHtml(html);
	    };
	};
    app.filter('sanitize', ['$sce', sanitize]);

})(angular.module('wsapp'));
