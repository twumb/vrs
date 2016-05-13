'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
.controller('SemiIndustrialController', function($scope, $rootScope, $http, REMOTE, $uibModal, usSpinnerService, Upload){
    $rootScope.headingData = 'Semi-Industrial Vessels';
    $scope.loadAmount = 0; 
    $scope.loadAmountStatus = 0; 
    $scope.loadAmountEvidence = 0;
    $scope.replacement = {};
    $scope.uploadEvidenceFile = function (file) {
        Upload.upload({
            url: REMOTE+'evidencefile',
            data: {file: file, 'username':'userFile' }
        }).then(function (resp) {
            $scope.replacement.evidence = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmountEvidence = progressPercentage;
        });
    };

    $scope.upload = function (file) {
        Upload.upload({
            url: REMOTE+'photo',
            data: {file: file, 'username':'userFile' }
        }).then(function (resp) {
            $scope.newvessel.Photo_vessel = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmountEvidence = progressPercentage;
        });
    };
     $scope.uploadStatus = function (file) {
        Upload.upload({
            url: REMOTE+'statusfile',
            data: {file: file, 'username':'userFile' }
        }).then(function (resp) {
            $scope.statusChange.photo = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmountEvidence = progressPercentage;
        });
    };

              $scope.viewby = 10;
              $scope.itemsPerpageManager = 10;
              $scope.itemsPerpageCanoe = 10;
              $scope.itemsPerpageLicense = 10;
              $scope.itemsPerpageTracking = 10;
              $scope.maxSize = 5; //Number of pager buttons to show


              $scope.currentPage = 1;
              $scope.currentManager = 1; 
              $scope.currentVessel = 1; 
              $scope.currentLicense = 1; 
              $scope.currentTracking = 1; 
              $scope.numPerPage = 9;
              $scope.maxSize = 5;

              $scope.currentPage = 1;
              $scope.pageSize = 10;

              $scope.sortType     = 'Vessel_id'; // set the default sort type
              $scope.sortVessel   = 'V';
              $scope.sortLicense  ='License_id'; 
              $scope.sortReverse  = false;  // set the default sort order
              $scope.sortVesselReverse = false; 
              $scope.sortLicenseReverse = false; 

              //semi-industrial checkList
              $scope.checkList = {
                    managers :[], 
                    vessels:[], 
                    licenses:[], 
                    tracking:[]
                };

  // semi-industrial print

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
                 var master =  ['Manager_id', 'Name_Manager', 'Phone_number', 'finalTotal'];
                $scope.pdfHeading = ["Manager ID", "Name of Manager", "Phone Number", "Vessels"];

                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.Manager_id==null)
                        {
                            value.Manager_id='-'; 
                        }
                        if(value.Name_Manager==null){
                            value.Name_Manager='-';
                        }
                        if(value.Phone_number==null){
                          value.Phone_number ='-';
                        }
                        if(value.finalTotal==null){
                          value.finalTotal = '-';
                        }
                        
                    });
                }else if($scope.pdfType=='Vessels'){
                  var master =  ['VD', 'Manager_id', 'Region', 'Landing_site', 'Current_vessel_name', 'Date_registration', 'total'];
                $scope.pdfHeading = ["Vessel ID", "Manager ID", "Coastal Region", "Landing Site", "Current Vessel Name", "Registration", "License"];

                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.Vessel_id==null)
                        {
                            value.Vessel_id='-'; 
                        }
                        if(value.Region==null){
                            value.Region ='-';
                        }
                        if(value.Landing_site==null){
                          value.Landing_site ='-';
                        }
                        if(value.Current_vessel_name==null){
                          value.Current_vessel_name = '-';
                        }
                        if(value.Date_registration==null){
                          value.Date_registration = '-';
                        }else{
                          value.Date_registration = value.Date_registration.slice(0, -14);
                        }
                        if(value.total==null){
                          value.total= '-';
                        }
                        //value.Date_registration = value.Date_registration.slice(0, -14);
                    });

                }else if($scope.pdfType =='License'){
                  var master =  ['License_id', 'Vessel_id', 'Name', 'Starting_date', 'End_date', 'Date_issue'];
                  $scope.pdfHeading = ["License ID", "Vessel ID", "Agreement Type", "Start Date", "End Date", "Issue Date"];
                    //console.log($scope.exportdata)
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
                    var master =  ['Vessel_id', 'V', 'Change_type', 'Change_date', 'Change_description'];
                  $scope.pdfHeading = ["Vessel ID", "Change Type", "Change Date", "Change Description"];
                    angular.forEach($scope.exportdata, function(value, key){
                        if(value.Vessel_id==null)
                        {
                            value.Vessel_id ='-'; 
                        }
                        if(value.Change_type==null){
                            value.Change_type ='-';
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
 
  
  //Date functions
      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };
      $scope.open3 = function() {
        $scope.popup3.opened = true;
      };
      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };
      $scope.popup3 = {
        opened: false
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];


  $scope.status = function(d)
      {
            $scope.statusHeader = d.Vessel_id;
            $scope.vessel_id = d.Vessel_id;
            $scope.modalInstance = $uibModal.open({
              animation: true, 
              templateUrl:'statusModal.html', 
              controller:'SemiIndustrialController', 
              size:'md', 
              scope:$scope
          })
      }; 

  $scope.closeModal = function(){
        $scope.modalInstance.dismiss('cancel');
      }

     $scope.statusChange = {};

          $scope.saveStatus =function(){
           
          var th = {
              statement: "Active_vessel = 'inactive",//'"+$scope.statusChange.Change_type+"'", 
              Vessel_id: $scope.vessel_id, 
              Change_type: '8', 
              Change_description: $scope.statusChange.Change_description, 
              Change_date: $scope.statusChange.Change_date
          }
          //console.log(th);

          $http.put(REMOTE+'semi_vessel/'+ $scope.vessel_id, th).then(function(response){
          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          		$scope.init();
	          	}else{

	          	}
          });

        }

    

            $scope.showVessel = function(n){
             
          $scope.statusHeader = n.Name_Manager;
          $scope.company = n.Company_id;
          $scope.selectedVessels = []; 
          $scope.replaceList = [];
          $scope.allVessels = [];

          //$scope.industrial_vessel_all 

          angular.forEach($scope.semi_vessel_all, function(value, key){
              if(value.Manager_id===n.Manager_id){
                  $scope.allVessels.push(value)
              }
          }); 

          angular.forEach($scope.semi_vessel, function(value, key){
              if(value.Manager_id===n.Manager_id){
                  $scope.selectedVessels.push(value)
              }
          }); 

          angular.forEach($scope.replacementHistory, function(value, key){
            
              if(value.owner===n.Company_id){
                  $scope.replaceList.push(value)
              }
          }); 


          //console.log($scope.selectedVessels)
          $scope.modalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofVessel.html',
                  controller: 'IndustController',
                  size: 'md',
                  scope: $scope
                });
          }

         //new manager

    $scope.semivessel_manager = function(){

      $scope.manager = {};
      $scope.managertext = 'New Vessel Manager';
      $scope.manager_button = 'Save';   
      $scope.read_manager = false;    
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'semivessel_managerModal.html',
            //controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    };


    $scope.read_manager_ = false; 
    $scope.edit_semi_manager = function(d){
    	//alert('ghana');
      $scope.manager = d;
      $scope.manager.Year_birth = new Date(d.Year_birth);

      $scope.read_manager_ = true;
      $scope.managertext = d.Manager_id;
      $scope.manager_button = 'Update';   
      $scope.read_manager = false; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'semivessel_managerModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_manager = function(d){
      $scope.manager = d;
      //$scope.manager.Year_birth  = d.Year_birth; 
      $scope.manager.Year_birth = new Date(d.Year_birth);
      $scope.managertext = d.Manager_id;
      $scope.read_manager = true; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'semivessel_managerModal.html',
            //controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.managerSelect = function(){
        if($scope.manager_select){
           $scope.checkList.managers = angular.copy($scope.semi_manager);
        }else{
          $scope.checkList.managers = []; 
        }
      }; 

     $scope.saveManager =function(){
     	if($scope.manager_button=='Save'){
	    	$http.post(REMOTE+'semi_manager', $scope.manager).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }else if ($scope.manager_button=='Update'){
	    	$http.put(REMOTE+'semi_manager', $scope.manager).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }
     }

    $scope.deleteManager = function(){
        if($scope.checkList.managers.length<1){
            $scope.alertText = 'Select a manager before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.managers.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };

        //Semi-industrial export manager
        $scope.exportManager = function(){
          $scope.pdfType = 'Manager';
            if($scope.checkList.managers.length<1){
              $scope.alertText = 'Select a manager before you can export'; 
              $scope.modalAlert = $uibModal.open({
                    animation: true,
                    templateUrl: 'alertModal.html',
                    controller: 'SemiIndustrialController',
                    size: 'sm',
                    scope: $scope
                  });

          }
          else{
            $scope.exportdata = $scope.checkList.managers; 
            $scope.modalExport = $uibModal.open({
                    animation: true,
                    templateUrl: 'exportModal.html',
                    controller: 'SemiIndustrialController',
                    size: 'sm',
                    scope: $scope
                  });     
          }
        }; 

      //new vessel

       $scope.new_vessel = function(d){
        $scope.newvessel = {};
        $scope.newvessel.Manager_id = d.Manager_id;
        //$scope.semi_indust_button = 'Save'; 
        $scope.vesseltext = 'New Semi-Industrial Vessel';
        $scope.vessel_button = 'Save';
        $scope.read_vessel = false;
        $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'new_vesselModal.html', 
            //controller:'SemiIndustrialController', 
            size:'md', 
            scope:$scope
        })

      }; 


      // vessel things
      $scope.edit_semi_vessel = function(d){
      $scope.newvessel = d;
      $scope.vesseltext = d.VD;
      $scope.newvessel.Date_registration = new Date(d.Date_registration);
      //$scope.semi_indust_button = 'Update'; 
      $scope.vessel_button = 'Update';   
      $scope.read_vessel = false; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_vesselModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_vessel = function(d){
      $scope.newvessel = d;
      $scope.vesseltext = d.VD;
      $scope.newvessel.Date_registration = new Date(d.Date_registration); 
      $scope.read_vessel = true; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'new_vesselModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }; 
    $scope.vesselSelect = function(){
        if($scope.vessel_select){
           $scope.checkList.vessels =angular.copy($scope.semi_vessel);
        }else{
          $scope.checkList.vessels = []; 
        }
      }; 


    	$scope.deleteVessel = function(){
        if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.vessels.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };


        $scope.exportVessel = function(){
           $scope.pdfType = 'Vessels';
          if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.exportdata = $scope.checkList.vessels; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 

        $scope.saveVessel = function(){
	       //	$scope.newvessel.Nav_fish_aids = $scope.newvessel.multipleSelect;
		    if($scope.vessel_button=='Save'){
		    	$http.post(REMOTE+'semi_vessel', $scope.newvessel).then(function(response){
		          	if(response.data.affectedRows==1){
		          		$scope.closeModal();
		          	}else{

		          	}
	          	})
		    }else if ($scope.vessel_button=='Update'){
		    	$http.put(REMOTE+'semi_vessel', $scope.newvessel).then(function(response){
		          	if(response.data.affectedRows==1){
		          		$scope.closeModal();
		          	}else{

		          	}
	          	})
		    }
        }


      //license things

      $scope.new_semi_license = function(d){
        $scope.license = {};
        $scope.license.Vessel_id = d.Vessel_id; 
        $scope.licensetext = 'New Vessel License';
        $scope.license_button = 'Save';
        $scope.read_license= false;
        $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'addlicenseModal.html', 
            //controller:'SemiIndustrialController', 
            size:'md', 
            scope:$scope
        })

      }; 


      $scope.edit_semi_license = function(d){
      $scope.license = d;
      $scope.licensetext = d.License_id;
      $scope.license.Starting_date = new Date(d.Starting_date); 
      $scope.license.End_date = new Date(d.End_date);
      $scope.license.Date_issue = new Date(d.Date_issue); 
      $scope.license_button = 'Update';   
      $scope.read_license = false; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addlicenseModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_license = function(d){
      $scope.license = d;
      $scope.licensetext = d.License_id;
      $scope.license.Starting_date = new Date(d.Starting_date); 
      $scope.license.End_date = new Date(d.End_date);
      $scope.license.Date_issue = new Date(d.Date_issue); 
      $scope.read_license = true; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addlicenseModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.licenseSelect = function(){
        if($scope.license_select){
           $scope.checkList.licenses = angular.copy($scope.semi_license)
        }else{
          $scope.checkList.licenses = []; 
        }
      }; 


    $scope.deleteLicense = function(){
          if($scope.checkList.licenses.length<1){
              $scope.alertText = 'Select a license before you can delete'; 
              $scope.modalAlert = $uibModal.open({
                    animation: true,
                    templateUrl: 'alertModal.html',
                    controller: 'SemiIndustrialController',
                    size: 'sm',
                    scope: $scope
                  });

          }
          else{
            $scope.deleteText ='Do you want to delete '+ $scope.checkList.licenses.length +' items';
            $scope.modalDelete = $uibModal.open({
                    animation: true,
                    templateUrl: 'deleteModal.html',
                    controller: 'SemiIndustrialController',
                    size: 'sm',
                    scope: $scope
                  });     
          }
        };

        //semi-industrial license

        $scope.exportLicense = function(){
          $scope.pdfType = 'License'; 
          if($scope.checkList.licenses.length<1){
            $scope.alertText = 'Select a license before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.exportdata = $scope.checkList.licenses; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });     
        }
      }; 


      $scope.saveLicense = function(){
	       //	$scope.newvessel.Nav_fish_aids = $scope.newvessel.multipleSelect;
		    if($scope.license_button=='Save'){
		    	$http.post(REMOTE+'semi_license', $scope.license).then(function(response){
		          	if(response.data.affectedRows==1){
		          		$scope.closeModal();
		          	}else{

		          	}
	          	})
		    }else if ($scope.license_button=='Update'){
		    	$http.put(REMOTE+'semi_license', $scope.license).then(function(response){
		          	if(response.data.affectedRows==1){
		          		$scope.closeModal();
		          	}else{

		          	}
	          	})
		    }
        }

      // tracking things


        $scope.new_semi_tracking = function(){
        $scope.tracking = {};
        $scope.trackingtext = 'New Vessel Tracking';
        $scope.tracking_button = 'Save';
        $scope.read_tracking= false;


        $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'trackingModal.html', 
            controller:'SemiIndustrialController', 
            size:'md', 
            scope:$scope
        })

      }; 

      $scope.edit_semi_tracking = function(d){
      $scope.tracking = d;
      $scope.trackingtext = d.Tracking_id;
      $scope.tracking_button = 'Update';   
      $scope.read_tracking = false; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'trackingModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }

     $scope.view_semi_tracking = function(d){
      $scope.tracking = d;
      $scope.trackingtext = d.Tracking_id;
      //$scope.license_button = 'Update';   
      $scope.read_tracking = true; 
      $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'trackingModal.html',
            controller: 'SemiIndustrialController',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.trackingSelect = function(){
        if($scope.tracking_select){
           $scope.checkList.tracking = angular.copy($scope.semi_tracking);//$scope.semi_tracking.map(function(item) { return item.Tracking_id; });
        }else{
          $scope.checkList.tracking = []; 
        }
      }; 


    $scope.deleteTracking = function(){
        if($scope.checkList.tracking.length<1){
            $scope.alertText = 'Select a tracking before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.tracking.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };


        $scope.exportTracking = function(){
          if($scope.checkList.tracking.length<1){
            $scope.alertText = 'Select a tracking before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'SemiIndustrialController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 





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









    
      //newLicense




    
    $scope.select = 1;

    $scope.setSelected = function (tabId) {
        this.select = tabId;
      };

      $scope.isSelected = function (tabId) {
        return this.select === tabId;
      };

      $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {

          this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
          return this.tab === tabId;
      };


    //semi-industrial init
      $scope.init = function(){
        
          $http.get(REMOTE+'semi_manager/')
            .then(function(response) {
                $rootScope.semi_manager = response.data;
                $scope.totalManager = response.data.length;
            });
            $http.get(REMOTE+'semi_vessel/')
            .then(function(response){
                $rootScope.semi_vessel = response.data;
                $scope.totalVessel = response.data.length;
            })
          	$http.get(REMOTE+'semi_license/')
            .then(function(response){
                $rootScope.semi_license = response.data;
                $scope.totalLicense = response.data.length;
            })
          	$http.get(REMOTE+'semi_tracking/')
            .then(function(response){
                $rootScope.semi_tracking = response.data;
                $scope.totalTracking = response.data.length;
            })
            $http.get(REMOTE+'region/')
            .then(function(response){
                $scope.regionList = response.data;
            })
            $http.get(REMOTE+'landing_site/')
            .then(function(response){
                $scope.landingList = response.data;
            })
            $http.get(REMOTE+'vessel_type/')
            .then(function(response){
                $scope.vesselTypeList = response.data       
            })
            $http.get(REMOTE+'semi_vessel_all/')
            .then(function(response){
                $scope.semi_vessel_all = response.data;
            }); 
             $http.get(REMOTE+'replacement')
            .then(function(response){
                $scope.replacementHistory = response.data;
            })
            $http.get(REMOTE+'reason')
            .then(function(response){
              $scope.reasonList = response.data;
            })
            $http.get(REMOTE+'equipmentlisting')
            .then(function(response){
              $scope.equipmentList = response.data; 
            })
            $http.get(REMOTE+'agreement/')
            .then(function(response) {
                $scope.agreementList = response.data;
            });  //zoneList

            $http.get(REMOTE+'fishing_zone/')
            .then(function(response) {
                $scope.fishingzoneList = response.data;
            });
             $http.get(REMOTE+'mesh_size/')
            .then(function(response){
                $scope.meshsizeList = response.data;
            })
             $http.get(REMOTE+'license_officer')
            .then(function(response){
                $scope.licenseOfficerList = response.data;
            }) 
             $http.get(REMOTE+'target_species/')
            .then(function(response) {
                $scope.targetList = response.data;
            }); 
            $http.get(REMOTE+'construction_material/')
            .then(function(response) {
                $scope.constructionList = response.data;  
            });
            $http.get(REMOTE+'storage/')
            .then(function(response) {
                $scope.freezingList = response.data; 
            });
            $http.get(REMOTE+'engine/')
            .then(function(response) {
                $scope.mainengineList = response.data;
            });

      }
})
//