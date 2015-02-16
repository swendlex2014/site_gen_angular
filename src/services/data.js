(function(app) {
    var dataServ = function($http, $q){
        return {
            getSiteRoot : function(){
                return document.wsConfig.server;
            }, 
            
            //GO TO TOP
            slideToTop: function(){
                $("html, body").animate({ scrollTop: 0 }, "slow");
            },
            
            //TAB ACTIVE
            activeTab : function(index, list){
                list.map(function(elem){
                    elem.active = false;
                });
                list[index].active = true;
                return list;
            },
            
            //HELPER
            range: function(min, max, step){
                step = (step === undefined) ? 1 : step;
                var input = [];
                for (var i = min; i <= max; i += step) input.push(i);
                return input;
            },
            
            getData:  function(link) {
                var deferred = $q.defer();

                $http.get(link).success(function(data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },

            postData : function(jsondata, link, table){
                var deferred = $q.defer();
                var data = new FormData();
                data.append('data', JSON.stringify(jsondata));
                if (table !== undefined){
                    data.append('table', JSON.stringify(table));
                }
                var xhr = new XMLHttpRequest();
                xhr.open('POST', link, true);
                xhr.onload = function () {
                    var result = JSON.parse(xhr.responseText);
                    deferred.resolve(result);
                };
                xhr.send(data);
                return deferred.promise;
            },

            sendEmail : function(jsondata){
                return this.postData(jsondata, this.getSiteRoot() + 'mail/contact.php');
            },
            
            //PAGINATION
            pages: function(start, size, length, number){
                pages = {};
                pages.start = start-1;
                pages.size = size;
                pages.number = number;
                pages.length = length;
                pages.show = length > size;
                pages.limit = length / size;
                pages.pagination = []; 
                i = start - (number / 2);
                if (start > 1)
                    pages.pagination.push({"class" : '', "page": start - 1, "show": "&laquo;"});
                while (i < start+(number / 2)) {
                    if (i > 0 && (i-1) < pages.limit){
                        var c = (i === start)? 'active' : '';
                        pages.pagination.push({"class" : c, "page": i, "show": i});
                    }
                    i++;
                }
                if (start < pages.limit)
                    pages.pagination.push({"class" : '', "page": start, "show": "&raquo;"});
                return pages;
            },
            
            goToPage: function(index, page){
                if (index.class !== 'active'){
                    this.slideToTop();
                    return this.pages(index.page, page.size, page.length, page.number);
                }
                return page;
            },
            
            updatePagination: function(index, page){
                return this.pages(1, page.size, index, page.number);
            },
            
            //WEB SERVICES ARRAY
            getWebServices : function(filename, ID){
                var id = '?ID=' + ID;
                if (ID === undefined)
                    id = '';
                var root = this.getSiteRoot();
                var link = root + 'data/get/' + filename + '.php' + id;
                var deferred = $q.defer();

                this.getData(link).then(function(data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },
            
            getServData : function(file, ID){
                return this.getWebServices(file, ID);
            }
        }
    };

    app.factory('dataServ', ['$http', '$q', dataServ])

})(angular.module('wsapp'));