'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
.controller('MarineController', function($scope, $rootScope, $http, REMOTE, $uibModal, Upload){
  $rootScope.headingData = 'Marine Canoes';
  $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };

      $scope.select = 1; 
      $scope.setSelected = function (tabId) {
        this.select = tabId;
      };

      $scope.isSelected = function (tabId) {
        return this.select === tabId;
      };


      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.loadAmount = 0; 

      $scope.checkList = {
          managers :[], 
          canoes:[], 
          licenses:[], 
          tracking:[]
      };

      $scope.viewby = 10;
      $scope.itemsPerpageVessel = 10;
      $scope.maxSize = 5; //Number of pager buttons to show


      $scope.currentPage = 1;
      $scope.currentManager = 1; 
      $scope.currentCanoe = 1; 
      

      $scope.currentVessel = 1; 
      $scope.currentLicense = 1; 
      $scope.currentTracking = 1; 
      $scope.numPerPage = 20;
      $scope.maxSize = 5;


      $scope.managernumPerPage = 50;
      $scope.canoenumPerPage = 50;


      //new manager
      $scope.upload = function (file) {
        Upload.upload({
            url: REMOTE+'photo',
            data: {file: file, 'username':'userFile' }
	        }).then(function (resp) {
	            $scope.canoe.Photo_canoe = REMOTE+'uploads/'+resp.data;
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            $scope.loadAmount = progressPercentage;
	        });
	    };

      //marine page change

      $scope.managerPageChange = function(){
          var t = {
            start:0,
            end: $scope.managernumPerPage
          }
          $http.post(REMOTE+'canoe_manager_read/', t )
            .then(function(response) {
                $rootScope.canoe_manager = response.data;
            });
      }

      $scope.canoePageChange = function(){
          var a = {
              start:0, 
              end: $scope.canoenumPerPage
            }

          $http.post(REMOTE+'canoe_vessel_read/', a)
            .then(function(response){
                $scope.canoe_vessel = response.data
            })
      }



        // Marine showVessel()
       $scope.showVessel = function(n){
          
          $scope.statusHeader = n.Name_Manager;
          $scope.company = n.Company_id;
          //$scope.selectedVessels = []; 
          $scope.replaceList = [];
          $scope.allVessels = [];

          $http.post(REMOTE+'canoe_vessel/'+n.Manager_id).then(function(response){
           // console.log(response.data);
            $scope.selectedVessels = response.data;
          })

            $scope.closestatus = function(){
              $scope.statusModalInstance.dismiss('cancel');
            }


          //console.log($scope.selectedVessels)
              $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofVessel.html',
                  controller: 'IndustController',
                  size: 'md',
                  scope: $scope
                });
        }

        //Marine printer


    function buildTableBody(data, columns) {
        var body = [];
        body.push( $scope.pdfHeading);

        data.forEach(function(row) {
            var dataRow = [];

            columns.forEach(function(column) {
                dataRow.push(row[column].toString());
            })

            body.push(dataRow);
        });

        return body;
    }

    function table(data, columns) {
        return {
            table: {
                headerRows: 1,
                body: buildTableBody(data, columns)
            }
        };
    }

    $scope.PDFprinter = function(){
      if($scope.pdfType=='Manager'){
       var master =  ['Manager_id', 'Name_Manager', 'Nationality', 'Phone_number', 'totalFinal'];
      $scope.pdfHeading = ["Manager ID", "Manager Name", "Nationality", "Phone No", "Canoes"];
          angular.forEach($scope.exportdata, function(value, key){
	          if(value.Manager_id==null)
	          {
	              value.Manager_id='-'; 
	          }
	          if(value.Name_Manager==null){
	              value.Name_Manager='-';
	          }
	          if(value.Nationality==null){
	            value.Nationality ='-';
	          }
	          if(value.Phone_number==null){
	            value.Phone_number = '-';
	          }
	          if(value.totalFinal==null){
	            value.totalFinal= '-';
	          }
          });
      }else if($scope.pdfType=='Canoes'){
        var master =  ['Canoe_id', 'Manager_id', 'label', 'Current_canoe_name', 'Date_registration'];
      $scope.pdfHeading = ["Canoes ID", "Manager ID", "Landing Beach", "Canoe Name", "Registration Date"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Canoe_id==null)
              {
                  value.Canoe_id='-'; 
              }
              if(value.Manager_id==null){
                  value.Manager_id='-';
              }
              if(value.label==null){
                value.label ='-';
              }
              if(value.Current_canoe_name==null){
                value.Current_canoe_name = '-';
              }
              if(value.Date_registration==null){
                value.Date_registration= '-';
              }else{
                value.Date_registration = value.Date_registration.slice(0, -14);
              }
              
              
          });

      }else if($scope.pdfType =='License'){
        var master =  ['License_id', 'Vessel_id', 'Name', 'Starting_date', 'End_date', 'Date_issue'];
        $scope.pdfHeading = ["License ID", "Vessel ID", "Agreement Type", "Start Date", "End Date", "Issue Date"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id ='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id ='-';
              }
              if(value.Name==null){
                value.Name ='-';
              }
              if(value.Starting_date==null){
                value.Starting_date = '-';
              }else{
                value.Starting_date  = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date= '-';
              }else{
                   value.End_date = value.End_date.slice(0, -14);
              }
              if(value.Date_issue==null){
                value.Date_issue= '-';
              }else{
                  value.Date_issue = value.Date_issue.slice(0, -14)
              }
          });

      }else if($scope.pdfType=='Tracking'){
          var master =  ['Vessel_id', 'V', 'Change_date', 'Change_description'];
        $scope.pdfHeading = ["Vessel ID", "Change Type", "Change Date", "Change Description"];
          angular.forEach($scope.exportdata, function(value, key){
              if(value.Vessel_id==null)
              {
                  value.Vessel_id ='-'; 
              }
              if(value.V==null){
                  value.V ='-';
              }
              if(value.Change_description==null){
                value.Change_description ='-';
              }
              if(value.Change_date==null){
                value.Change_date = '-';
              }else{
                value.Change_date  = value.Change_date.slice(0, -14);
              }
              
          });
      }
          var docDefinition = {
              content: [
                  { text: 'Dynamic parts', style: 'header' },
                  table($scope.exportdata, master)
              ]
          }
           pdfMake.createPdf(docDefinition).download('something.pdf')
     }
     //industrial openFile
     $scope.openFile = function(n){
        window.open(n.file);
     }




      $scope.new_canoe_manager = function(){

      $scope.manager = {};
      $scope.managertext = 'New Marine Canoe Manager';
      $scope.manager_button = 'Save';   
      $scope.read_manager = false;    
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'canoe_manager.html',
            //controller: 'MarineController',
            size: 'md',
            scope: $scope
      });
    };

    $scope.edit_canoe_manager = function(d){
      $scope.manager = d;
      $scope.managertext = d.Manager_id;
      $scope.manager_button = 'Update';   
      $scope.read_manager = false; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'canoe_manager.html',
            //controller: 'MarineController',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_canoe_manager = function(d){
      $scope.manager = d;
      $scope.managertext = d.Manager_id;
      //$scope.manager_button = 'Update';
      $scope.manager.Date_birth = new Date(d.Date_birth);   
      $scope.read_manager = true; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'canoe_manager.html',
            //controller: 'MarineController',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.closeModal = function(){
    	$scope.modalInstance.dismiss('cancel');
    }

    $scope.managerSelectClick = function(){
      //alert('ghana');
        if($scope.manager_select){
           $scope.checkList.managers = angular.copy($scope.canoe_manager);//(function(item) { return item.Manager_id; });
        }else{
          $scope.checkList.managers = []; 
        }
      }; 


    $scope.deleteManager = function(){
        if($scope.checkList.managers.length<1){
            $scope.alertText = 'Select a manager before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.managers.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportManager = function(){
          $scope.pdfType = 'Manager'; 
          if($scope.checkList.managers.length<1){
            $scope.alertText = 'Select a manager before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.managers; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 


    $scope.saveManager = function(){
    	if($scope.manager_button=='Save'){
	    	$http.post(REMOTE+'canoe_manager', $scope.manager).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }else if ($scope.manager_button=='Update'){
	    	$http.put(REMOTE+'canoe_manager', $scope.manager).then(function(response){
	    		console.log(response.data);
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }
    }




 //new cannoe

    $scope.new_canoe_vessel = function(d){
      //console.log(d);
      $scope.canoe = {};
      $scope.canoetext = 'New Marine Canoe';
      $scope.canoe_button = 'Save'; 
      $scope.canoe.Manager_id  = d.Manager_id; 
      $scope.read_canoe = false;    
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_canoe_vesselModal.html',
            //controller: 'MarineController',
            size: 'md',
            scope: $scope
      });
    };
    $scope.edit_canoe_vessel = function(d){
      $scope.canoe = d;
      $scope.canoetext = d.Canoe_id;
      $scope.canoe_button = 'Update';   
      $scope.read_canoe = false; 
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_canoe_vesselModal.html',
            controller: 'MarineController',
            size: 'md',
            scope: $scope
      });
    }

    $scope.view_canoe_vessel = function(d){
      $scope.canoe = d;
      $scope.canoetext = d.Canoe_id;
      //$scope.manager_button = 'Update';   
      $scope.read_canoe = true; 
      $scope.canoeModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_canoe_vesselModal.html',
            controller: 'MarineController',
            size: 'md',
            scope: $scope
      });
    }; 




    $scope.canoeSelectClick = function(){
        if($scope.canoe_select){
           $scope.checkList.canoes = angular.copy($scope.canoe_vessel); //.map(function(item) { return item.Canoe_id; });
        }else{
          $scope.checkList.canoes = []; 
        }
      }; 


    $scope.deleteCanoe = function(){
        if($scope.checkList.canoes.length<1){
            $scope.alertText = 'Select a canoe before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.canoes.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportCanoe = function(){
          $scope.pdfType = 'Canoes'; 
          if($scope.checkList.canoes.length<1){
            $scope.alertText = 'Select a canoe before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.canoes; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 

    $scope.saveCanoe = function(){
    	 if($scope.canoe_button=='Save'){
	    	$http.post(REMOTE+'canoe_vessel', $scope.canoe).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }else if ($scope.canoe_button=='Update'){
	    	$http.put(REMOTE+'canoe_vessel', $scope.canoe).then(function(response){
	    		console.log(response.data);
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }
    }




      $scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };

      $scope.closeAlert = function(){
          $scope.modalAlert.dismiss('cancel');
      };
       $scope.closeDelete = function(){
        $scope.modalDelete.dismiss('cancel');
      };

      $scope.delete = function(){
        $scope.closeDelete();
      }

      $scope.nodelete = function(){
        $scope.closeDelete();
      }


      //Date functions
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };

      

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      //marine init

    $scope.init = function(){
          $http.get(REMOTE+'dash_canoes_manager/')
            .then(function(response) {
                $scope.canoesManagerTotal = response.data[0].total;
            });

            $http.get(REMOTE+'dash_canoes_vessel/')
            .then(function(response) {
                $scope.canoesVesselTotal = response.data[0].total;    
            });
          var t = {
            start:0,
            end: $scope.managernumPerPage
          }
          $http.post(REMOTE+'canoe_manager_read/', t )
            .then(function(response) {
                $rootScope.canoe_manager = response.data;
                //$scope.totalCanoeManager= response.data.length; 
            });

            var a = {
              start:0, 
              end: $scope.canoenumPerPage
            }

          $http.post(REMOTE+'canoe_vessel_read/', a)
            .then(function(response){
                $scope.canoe_vessel = response.data
            })

            $http.get(REMOTE+'construction_material/')
            .then(function(response) {
                $scope.constructionList = response.data;
                
            });

             $http.get(REMOTE+'engine/')
            .then(function(response) {
                $scope.mainengineList = response.data;
                
            });

            $http.get(REMOTE+'fishing_gear/')
            .then(function(response) {
                $scope.fishing_gearList = response.data;

            });

            $http.get(REMOTE+'region/')
            .then(function(response) {
                $scope.regionList = response.data;
            });

            $http.get(REMOTE+'district/')
            .then(function(response) {
                $scope.districtList = response.data;
            });

            $http.get(REMOTE+'village/')
            .then(function(response) {
                $scope.villageList = response.data;
            });
            $http.get(REMOTE+'landing_beach/')
            .then(function(response) {
                $scope.beachList = response.data;
            });

             $http.get(REMOTE+'equipmentlisting/')
            .then(function(response) {
                $scope.equipmentList = response.data;
                //console.log($scope.eq)
            }); 
            
      }

      $scope.managerSelect = function(){
            var t ={
                start: parseInt($scope.managernumPerPage) *(parseInt($scope.currentVessel) - 1), 
                 end: $scope.managernumPerPage
            } 
            $http.post(REMOTE+'canoe_manager_read/', t )
            .then(function(response) {
              //$scope.canoe_manager  = {};
                $scope.canoe_manager = response.data;
            });
      }

      $scope.canoeSelect = function(){
            var th ={
                start: parseInt($scope.canoenumPerPage) *(parseInt($scope.currentCanoe) - 1), 
                 end: $scope.canoenumPerPage
            }
            
            $http.post(REMOTE+'canoe_vessel_read/', th )
            .then(function(response) {
              //$scope.canoe_manager  = {};
                $scope.canoe_vessel = response.data;
            });
      }


})