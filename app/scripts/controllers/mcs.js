'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
.controller('InspectionController', function($scope, $rootScope, $http, REMOTE, $uibModal, Upload){
    $rootScope.headingData = 'Inspection';
    /* Initialisers */

    $scope.tab = 1;  // tab initializer
    $scope.maxSize = 5; // pagination 
    $scope.currentVessel = 1;  //
    $scope.loadAmount = 0 ; // upload progress counter initializer

    /* Date functions */

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };

    /* end of Date functions */

    /* Upload function */
      $scope.upload = function (file) {
        Upload.upload({
            url: REMOTE+'photo',
            data: {file: file, 'username':'userPhoto' }
        }).then(function (resp) {
            $scope.cases.evidence = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmount = progressPercentage;
        });
    };
    
    /* end of upload function */ 





    /* calling the init function */
    $scope.init =function(){
    	$http.get(REMOTE+'offense_types/')
            .then(function(response) {
                $rootScope.offense_typesList = response.data;
                console.log(response.data);
        }); 
        $http.get(REMOTE+'sanctions/')
            .then(function(response) {
                $rootScope.sanctionsList = response.data;
        });
        $http.get(REMOTE+'mcsofficers/')
            .then(function(response) {
                $rootScope.mcsofficersList = response.data;
        }); 
    }
    /* Calling the init function*/

    $scope.init();
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

      var that = this; 

      $scope.checkList = {
          vessels :[], 
          canoes:[]
      };
      $scope.itemsPerpageVessel = 20;
      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };

      $scope.init = function(){
          $http.get(REMOTE+'mcs_compliance/')
            .then(function(response) {
                $scope.mcs_compliance = response.data;
                $scope.mcs_vesselTotal = response.data.length; 
            });
            
    }; 

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
      }else if($scope.pdfType=='Vessel'){
        var master =  ['Inspection_id', 'Vessel_id', 'Type_vessel', 'Name', 'Date_inspection', 'Time_inspection', 'Inspection_results'];
      $scope.pdfHeading = ["Inspection ID", "Vessel ID", "Vessel Type", "Inspection Authority", "Inspection Date", "Inspection Time", "Results"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Inspection_id==null)
              {
                  value.Inspection_id='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id ='-';
              }
              if(value.Type_vessel==null){
                value.Type_vessel ='-';
              }
              if(value.Name==null){
                value.Name = '-';
              }
              if(value.Date_inspection==null){
                value.Date_inspection = '-';
              }else{
                value.Date_inspection = value.Date_inspection.slice(0, -14);
              }

              if(value.Time_inspection==null){
                value.Time_inspection = '-';
              }
              if(value.Inspection_results==null){
                value.Inspection_results= '-';
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
 
	$scope.new_vessel_compliance = function(){
	$scope.vesselcompliance = {};
	$scope.vesselcompliancetext = 'New Vessel Compliance Report';
	$scope.vesselcompliance_button = 'Save';   
	$scope.read_vessel = false;    
	$scope.complianceModalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'vesselComplianceModal.html',
        controller: 'McsController',
        size: 'md',
        scope: $scope
      });
    };

    $scope.newcomplianceClose = function(){
      $scope.complianceModalInstance.dismiss('cancel');   
    }

    $scope.edit_compliance_vessel = function(d){

      $scope.vesselcompliance = d;
      $scope.vesselcompliancetext = d.Inspection_id;
      $scope.vesselcompliance_button = 'Update';   
      $scope.read_vessel = false; 
      $scope.complianceModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vesselComplianceModal.html',
            controller: 'McsController',
            size: 'md',
            scope: $scope
      });
    }

    $scope.view_compliance_vessel = function(d){
      $scope.vesselcompliance = d;
      $scope.vesselcompliancetext = d.Inspection_id;  
      $scope.read_vessel = true; 
      $scope.complianceModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vesselComplianceModal.html',
            controller: 'McsController',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.compliancevesselSelect = function(){
        if($scope.compliancevessel_select){
           $scope.checkList.vessels = angular.copy($scope.mcs_compliance); //.map(function(item) { return item.Inspection_id; });
        }else{
          $scope.checkList.vessels = []; 
        }
      }; 


    $scope.deleteComplianceVessel = function(){
        if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a report item before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.vessels.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'MarineController',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportComplianceVessel = function(){
          $scope.pdfType = 'Vessel'; 
          if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a report item before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'McsController',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.vessels; 
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'McsController',
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
      }; 

    $scope.addCase = function(d){
    	$scope.cases = {};
    	$scope.heading = "New Case"; 
      $scope.case_button ="Save";
    	$scope.cases.Inspection_id = d.Inspection_id; 
    	$scope.cases.Vessel_id = d.Vessel_id; 
    	$scope.modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'newcaseModal.html',
          size: 'md',
          scope: $scope
	    });
    }

    $scope.closeModal = function(){
    	$scope.modalInstance.dismiss('cancel')
    }


})
.controller('CasesController', function($scope, $rootScope, $uibModal){
    $rootScope.headingData = 'Cases';

    

})
.controller('PaymentController', function($scope, $rootScope){
    $rootScope.headingData = 'Payment';

})
.controller('McsSetupController', function($scope, $rootScope, $uibModal, $http, REMOTE){
    $rootScope.headingData = 'Setup';
    $scope.tab = 1; 
    var that = this; 

   


    $scope.setTab = function (tabId) {
        this.tab = tabId;
    };

    $scope.isSet = function (tabId) {
        return this.tab === tabId;
    };

    $scope.init =function(){
    	$http.get(REMOTE+'offense_types/')
            .then(function(response) {
                $rootScope.offense_typesList = response.data;
                console.log(response.data);
        }); 
        $http.get(REMOTE+'sanctions/')
            .then(function(response) {
                $rootScope.sanctionsList = response.data;
        });
        $http.get(REMOTE+'mcsofficers/')
            .then(function(response) {
                $rootScope.mcsofficersList = response.data;
        }); 
    }
    /* Calling the init function*/

    $scope.init();


    /* This function is used to show the modal for the setup */ 
	$scope.showModal = function(d, text){
	  	$scope.temp = {};
		$scope.temp_read = false; 
		$scope.number = d; 
		$scope.headerText = text; 

		$scope.tempModalInstance = $uibModal.open({
	        	animation: true,
	        	templateUrl: 'alertModal.html',
	        	size: 'md',
	        	scope: $scope
	  	  });
	}; 
	$scope.closeModal = function(){
	  $scope.tempModalInstance.dismiss('cancel');
	}
	/* Saving from setup modal */
	$scope.saveTemp = function(d){
     if(d==1){
          $http.post(REMOTE+'offense_types', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
     }else if(d==2){
          $http.post(REMOTE+'sanctions', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
     }else if(d==3){
          $http.post(REMOTE+'mcsofficers', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
     }
     console.log('ghana');
     $scope.init();
      
  }

})