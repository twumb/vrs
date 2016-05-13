'use strict';

/**
 * @ngdoc overview
 * @name fishApp
 * @description
 * # fishApp
 *
 * Main module of the application.
 */
angular
  .module('fishApp', [
     'ui.bootstrap', 'ui.router', 'ngCookies', 'chart.js', 'angular.morris-chart', 'angular.filter', 'checklist-model','angularUtils.directives.dirPagination', 'angular-md5', 'angularSpinner', 'ngSanitize', 'ngCsv', 'angular-loading-bar', 'ngFileUpload', 'angularjs-dropdown-multiselect',
  ])
  .run(function($rootScope){
    $rootScope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

  })
  .constant('REMOTE', 'http://localhost:8050/api/')
  //.constant('REMOTE', 'http://icgc.etribegh.com:8050/api/')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/sign.html', 
                controller:'LoginController'
            }).
            state('active_industrial', {
                url: '/active_industrial',
                templateUrl: 'views/actind.html', 
                controller:'ActiveController'
            }).
            state('active_semi_industrial', {
                url: '/active_semi_industrial',
                templateUrl: 'views/actsemi.html', 
                controller:'ActiveController'
            }).
             state('app', {
                url:'/app',
                abstract:true, 
                templateUrl:'views/main.html', 
                controller:'MasterController'
             }).
             state('app.dashboard', {
                url:'/dashboard',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/dashboard.html', 
                                controller: 'DashController'
                              }
                        }
             }).
             state('app.dashboard2', {
                url:'/dashboard2',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs/dashboard2.html', 
                                controller: 'DashController'
                              }
                        }
             }).
             state('app.tables', {
                url: '/tables',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/tables.html', 
                                controller: 'EnteriesController'
                              }
                        }
            }).
             state('app.setup', {
              url: '/setup',
              views:{
                         'contentArea':{ 
                              templateUrl:'views/setup.html', 
                              controller: 'SetupController'
                            }
                      }

            }).
             state('app.industrial',{
              url: '/industrial',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/indust.html', 
                                controller: 'IndustController'
                              }
                        }

            })

            .state('app.administrator',{
              url: '/administrator',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/administrator.html', 
                                controller: 'AdminController'
                              }
                        }

            })

            .state('app.semi-industrial',{
              url: '/semi-industrial',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/semi-industrial.html', 
                                controller: 'SemiIndustrialController'
                              }
                        }
            

            })
            .state('app.marine',{
              url: '/marine',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/marine.html', 
                                controller: 'MarineController'
                              }
                        }
            

            })
            .state('app.mcs',{
              url: '/mcs',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs.html', 
                                controller: 'McsController'
                              }
                        }
            

            })
            .state('app.datareporting',{
              url: '/datareporting',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/datareporting.html', 
                                controller: 'DataReportingController'
                              }
                        }
            

            })
            .state('app.auxiliary',{
              url: '/auxiliary',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/auxiliary.html', 
                                controller: 'AuxiliaryController'
                              }
                        }
            

            })
            .state('app.register',{
              url: '/register',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/register.html', 
                                controller: 'RegisterController'
                              }
                        }
            

            })
            .state('app.inspection',{
              url: '/inspection',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs/inspection.html', 
                                controller: 'InspectionController'
                              }
                        }
            

            })
            .state('app.cases',{
              url: '/cases',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs/cases.html', 
                                controller: 'CasesController'
                              }
                        }
            

            })
            .state('app.payment',{
              url: '/payment',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs/payment.html', 
                                controller: 'PaymentController'
                              }
                        }
            

            })
            .state('app.mcssetup',{
              url: '/mcssetup',
                views:{
                           'contentArea':{ 
                                templateUrl:'views/mcs/setup.html', 
                                controller: 'McsSetupController'
                              }
                        }
            

            })
             ;
    }
]);
