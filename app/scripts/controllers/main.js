'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')

    .controller('MasterController', function($scope, $cookieStore, $rootScope, $state, $uibModal){
    	//$rootScope.headingData = 'Dashboard';

      $scope.loggedUser = $cookieStore.get('fishreg_user_gh');
      $scope.userRole = $cookieStore.get('fishreg_user_role');
      //console.log($scope.userRole);
      //console.log($cookieStore.get('fishreg_user_role'));

      $scope.changePassword = function () {
      $scope.passInstance = $uibModal.open({
          animation: true,
          templateUrl: 'passwordModal.html',
          controller: 'MasterController',
          size: 'md',
          scope: $scope
        });
      };

      $scope.closepass = function(){
        $scope.passInstance.dismiss('cancel');
      }


      $scope.logout = function(){
          $cookieStore.put('fishreg_user_gh', '');
          $state.go('index')
      }

    	var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };

    /*$scope.men = 0; 
      var that = this; 
    
    $scope.setSel = function (tabId) {

          $scope.men = tabId;
      };

      $scope.isSel = function (tabId) {
          return this.men === tabId;
      }; */

    }).controller('SetupController', function($scope,$uibModal, $http , REMOTE, $rootScope){

    	$scope.member ={};

    	$rootScope.headingData = 'Setup';
    	$scope.init = function(){

    			$scope.list()
    	}

    	$scope.newSetup = function (size) {
			$scope.modalInstance = $uibModal.open({
		      animation: true,
		      templateUrl: 'newMemberModal.html',
		      controller: 'SetupController',
		      size: 'md',
		      scope: $scope
		    });
  		};



  $scope.closeMemberModal =function(){
      $scope.modalInstance.dismiss('cancel');
  }

  $scope.ok = function(){

    $scope.closeMemberModal();
  }

  $scope.list = function(){
  		$http.get(REMOTE+'sanctuary').then(function(response) {
		        $rootScope.sanctuaryList = response.data;
		           
		    });
  }

  $scope.create = function(){
    		$http.post(REMOTE+'sanctuary',  $scope.member).then(function(response) {
		        alert('Saved');
		        $scope.member = {};
		        $scope.closeMemberModal(); 
		        $scope.init();
		        
		    });
    	}

    }).controller('EnteriesController', function($scope, $http, REMOTE, $rootScope){

    	$rootScope.headingData = 'Contributions';
    	$scope.list = {};
    	$scope.sanc = {};
    	$scope.tot = 0;
    	 $scope.listed = function(){
    		$http.get(REMOTE+'sanctuary').then(function(response) {
		        $scope.sanctuaryList = response.data;
		           
		    });
    	}; 

    	$scope.save = function(){
    		$http.post(REMOTE+'entry',  $scope.sanc).then(function(response) {
		        alert('Saved');
		        $scope.sanc = {};
		        $scope.init();
		       
		    });
    	}

    	$scope.init = function(){
    		$scope.listed();
    		$scope.listenter();
    	}



    }).controller('DashController', function($scope, $http, REMOTE, $rootScope, dashReport){

      $scope.industrial = {};
      $scope.industrial_total = 0; 
      $scope.semi_industrial_total = 0; 
      dashReport.industial_license().then(function(data){
        $scope.industrial = data; 
      });
      dashReport.semi_industial_license().then(function(data){
        $scope.semi_industrial = data; 
        $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        $scope.series = ['Industrial', 'Semi-Industrial'];
        $scope.data = [
          [$scope.industrial[0].jan, $scope.industrial[0].feb,$scope.industrial[0].mar,$scope.industrial[0].apr,$scope.industrial[0].may,$scope.industrial[0].jun,$scope.industrial[0].jul,$scope.industrial[0].aug, $scope.industrial[0].sep,$scope.industrial[0].oct, $scope.industrial[0].nov,$scope.industrial[0].dec],
          [$scope.semi_industrial[0].jan, $scope.semi_industrial[0].feb,$scope.semi_industrial[0].mar,$scope.semi_industrial[0].apr,$scope.semi_industrial[0].may,$scope.semi_industrial[0].jun,$scope.semi_industrial[0].jul,$scope.semi_industrial[0].aug, $scope.semi_industrial[0].sep,$scope.semi_industrial[0].oct, $scope.semi_industrial[0].nov,$scope.semi_industrial[0].dec]
        ];
        $scope.data2 = [
          [$scope.industrial[1].jan, $scope.industrial[1].feb,$scope.industrial[1].mar,$scope.industrial[1].apr,$scope.industrial[1].may,$scope.industrial[1].jun,$scope.industrial[1].jul,$scope.industrial[1].aug, $scope.industrial[1].sep,$scope.industrial[1].oct, $scope.industrial[1].nov,$scope.industrial[1].dec],
          [$scope.semi_industrial[1].jan, $scope.semi_industrial[1].feb,$scope.semi_industrial[1].mar,$scope.semi_industrial[1].apr,$scope.semi_industrial[1].may,$scope.semi_industrial[1].jun,$scope.semi_industrial[1].jul,$scope.semi_industrial[1].aug, $scope.semi_industrial[1].sep,$scope.semi_industrial[1].oct, $scope.semi_industrial[1].nov,$scope.semi_industrial[1].dec]
        ];
        $scope.industrial_total =$scope.industrial[0].jan+$scope.industrial[0].feb+$scope.industrial[0].mar+$scope.industrial[0].apr+$scope.industrial[0].may+$scope.industrial[0].jun + $scope.industrial[0].jul +$scope.industrial[0].aug+ $scope.industrial[0].sep + $scope.industrial[0].oct+ $scope.industrial[0].nov+$scope.industrial[0].dec;
        $scope.semi_industrial_total  = $scope.semi_industrial[0].jan+ $scope.semi_industrial[0].feb+$scope.semi_industrial[0].mar+$scope.semi_industrial[0].apr+$scope.semi_industrial[0].may+$scope.semi_industrial[0].jun+$scope.semi_industrial[0].jul+$scope.semi_industrial[0].aug+$scope.semi_industrial[0].sep+$scope.semi_industrial[0].oct+$scope.semi_industrial[0].nov+$scope.semi_industrial[0].dec;
      });


    	$rootScope.headingData = 'Dashboard';
      $scope.mine= 1; 

    	$scope.init = function(){
        $http.get(REMOTE+'industrial_vessel_dash/')
              .then(function(response) {
                  $scope.ind_vess_total = response.data;   
              });
         $http.get(REMOTE+'semi_vessel_dash/')
              .then(function(response) {
                  $scope.semi_vess_total = response.data;   
              });
         $http.get(REMOTE+'dash_vessel/')
              .then(function(response) {
                  $scope.vessel_list = response.data;                
              });
          $http.get(REMOTE+'dash_semi_vessel/')
              .then(function(response) {
                  $scope.semi_vessel_list = response.data;       
              });
          $http.get(REMOTE+'dash_canoes/')
              .then(function(response) {
                  $scope.canoes_list = response.data;
              });
          $http.get(REMOTE+'industrial_license_dash/')
              .then(function(response) {
                  $scope.industrial_license_dash = response.data;
              });
          $http.get(REMOTE+'semi_license_dash/')
              .then(function(response) {
                  $scope.semi_license_dash = response.data; 
              });
    	}
      $scope.init();

    }).controller('LoginController', function($scope, $state, $http, REMOTE, md5, $cookieStore){

      $scope.result = false; 
    	$scope.login = function(){
        var t = {
          username:$scope.username,
          password:md5.createHash($scope.password) 
        };
   
      $http.post(REMOTE+'login', t).then(function(response){
        if(response.data[0].total ===0){
            $scope.result=true; 
            $scope.username = '';
            $scope.password = '';
            document.getElementById('username').focus(); 
        }else if(response.data[0].total ===1){
            //console.log(response.data[0].GroupID);
            $scope.result= false;
            $cookieStore.put('fishreg_user_gh', $scope.username);
            $cookieStore.put('fishreg_user_role', response.data[0].GroupID);
            $scope.username=''; 
            $scope.password ='';
            if(response.data[0].GroupID==7){
              $state.go('app.dashboard2');
            }else{
              $state.go('app.dashboard');
            }
        }
      })

    		
    	}
    })

// Marine Controller


.controller('McsController', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'MCS Activity';
      $scope.tab = 1; 
      $scope.maxSize = 5;
      $scope.currentVessel = 1; 
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
      }


})
.controller('DataReportingController', function($scope, $rootScope, $http, REMOTE, $uibModal){
  $rootScope.headingData = 'Data Reporting';

  $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };



    $scope.init = function(){
       $http.get(REMOTE+'active_industrial/')
            .then(function(response) {
                $scope.industrialList = response.data;
                //console.log($scope.industrialList);
                
            });
    $http.get(REMOTE+'active_semi_industrial/')
            .then(function(response) {
                $scope.semiList = response.data;
                //console.log($scope.semiList)
            }); 
    }; 

    $scope.operations = [{name:'Contains', item:''}, {name:'Equals', item:''},{name:'Starts With', item:''},{name:'More than', item:''},{name:'Less than', item:''},{name:'Between', item:''},{name:'Empty', item:''},{name:'Doesnt contain', item:''},{name:'Doesnt equal', item:''},{name:'Is not more than', item:''},{name:'Is not less than', item:''},{name:'Is not between', item:''}, {name:'Is not empty', item:''}];

    $scope.query =function(n){
          //$scope.exportdata = $scope.industrialList
          //$scope.pdfType = 'Industrial';
          var t = {
              name: n
          }
          $http.post(REMOTE+'columnSearch',t ).then(function(response){
              $scope.selectedListing = response.data; 
          })


          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'queryModal.html',
                  controller: 'DataReportingController',
                  size: 'md',
                  scope: $scope
                });  
    }
    $scope.searching = {};

    $scope.queryList = [];
    $scope.queryAdd = function()
    {
        $scope.queryList.push($scope.searching); 
        console.log($scope.queryList)
        $scope.searching = {};
    }


     $scope.exportActiveVessel = function(){ 
          $scope.exportdata = $scope.industrialList
          $scope.pdfType = 'Industrial';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'DataReportingController',
                  size: 'sm',
                  scope: $scope
                });         
        }; 
    $scope.exportActiveSemiVessel = function(){ 
          $scope.exportdata = $scope.semiList;
          $scope.pdfType = 'Semi-Industrial';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'DataReportingController',
                  size: 'sm',
                  scope: $scope
                });         
        }; 

        $scope.closeExport = function(){
            $scope.modalExport.dismiss('cancel');
        }

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
          console.log($scope.pdfType);
      if($scope.pdfType=='Industrial'){
       var master =  ['License_id', 'Vessel_id', 'Starting_date', 'End_date'];
      $scope.pdfHeading = ["License ID", "Vessel ID", "Start Date", "Expiry Date"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id='-';
              }
              if(value.Starting_date==null){
                value.Starting_date ='-';
              }else{
                 value.Starting_date = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date = '-';
              }else{
                 value.End_date = value.End_date.slice(0, -14);
              }
              
          });
      }else if($scope.pdfType=='Semi-Industrial'){
       var master =  ['License_id', 'Vessel_id', 'Starting_date', 'End_date'];
      $scope.pdfHeading = ["License ID", "Vessel ID", "Start Date", "Expiry Date"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.License_id==null)
              {
                  value.License_id='-'; 
              }
              if(value.Vessel_id==null){
                  value.Vessel_id='-';
              }
              if(value.Starting_date==null){
                value.Starting_date ='-';
              }
              else{
                 value.Starting_date = value.Starting_date.slice(0, -14);
              }
              if(value.End_date==null){
                value.End_date = '-';
              }else{
                 value.End_date = value.End_date.slice(0, -14);
              }
              
          });

      }
      var docDefinition = {
              content: [
                  { text: 'Active '+ $scope.pdfType + ' Report', style: 'header' },
                  table($scope.exportdata, master)

              ]
          }

           pdfMake.createPdf(docDefinition).download('activeReports.pdf')


    }

/*

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
*/


})
.controller('AuxiliaryController', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'Auxiliary Data';
$scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };


    $scope.editModal = function(d){
     
      $scope.temp = d;
      $scope.temp_read = false; 
      $scope.firstLabel = 'Code'; 
      $scope.secondLabel = 'Name'; 
      //$scope.number = d; 
      $scope.headerText = 'Edit '+d.name; 
      //$scope.vesselcompliance = d;
      //$scope.vesselcompliancetext = d.Inspection_id;  
      //$scope.read_vessel = true; 

      if(d==1){
       
      }


      $scope.tempModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'alertModal.html',
            controller: 'AuxiliaryController',
            size: 'md',
            scope: $scope
      });
    
    };

    $scope.showModal = function(d, text){
      $scope.temp = {};
      $scope.temp_read = false; 
      $scope.firstLabel = 'Code'; 
      $scope.secondLabel = 'Name'; 
      $scope.number = d; 
      $scope.headerText = text; 
      //$scope.vesselcompliance = d;
      //$scope.vesselcompliancetext = d.Inspection_id;  
      //$scope.read_vessel = true; 

      if(d==1){
       
      }if(d==20){

      }


      $scope.tempModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'alertModal.html',
            controller: 'AuxiliaryController',
            size: 'md',
            scope: $scope
      });
    }; 

    $scope.closeModal = function(){
      $scope.tempModalInstance.dismiss('cancel');
    }

    $scope.saveTemp = function(d){
      console.log(d);
      if(d==20){
          $http.post(REMOTE+'mesh_size', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
      }else if(d==21){
          $http.post(REMOTE+'crewType', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
      }else if(d==22){
          $http.post(REMOTE+'license_officer', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();
          })
      }else if(d==23){
          $http.post(REMOTE+'reason', $scope.temp).then(function(response){
              $scope.temp = {};
              $scope.closeModal();

          })
      }
      $scope.init();
      
    }


//auxiliary init
$scope.init = function(){
            $http.get(REMOTE+'authority_inspection/')
            .then(function(response) {
                $scope.authorityList = response.data;
            }); 
            
             $http.get(REMOTE+'construction_material/')
            .then(function(response) {
                $scope.materialsList = response.data;
            }); 


             $http.get(REMOTE+'equipment/')
            .then(function(response) {
                $scope.equipmentList = response.data;
            }); 

            $http.get(REMOTE+'fishing_company/')
            .then(function(response) {
                $scope.companyList = response.data;
            }); 
             $http.get(REMOTE+'target_species/')
            .then(function(response) {
                $scope.targetList = response.data;
            }); 
             $http.get(REMOTE+'agreement/')
            .then(function(response) {
                $scope.agreementList = response.data;
            }); 

            $http.get(REMOTE+'engine/')
            .then(function(response) {
                $scope.engineList = response.data;
            }); 
            $http.get(REMOTE+'fishing_gear/')
            .then(function(response) {
                $scope.fishingList = response.data;
            });

            $http.get(REMOTE+'storage/')
            .then(function(response) {
                $scope.storageList = response.data;
            });
            $http.get(REMOTE+'tracking_type/')
            .then(function(response) {
                $scope.trackingList = response.data;
            });

            $http.get(REMOTE+'vessel_type/')
            .then(function(response) {
                $scope.vesselList = response.data;
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

            $http.get(REMOTE+'inspection_place/')
            .then(function(response) {
                $scope.inspectionList = response.data;
            });

            $http.get(REMOTE+'landing_site/')
            .then(function(response) {
                $scope.ladingsiteList = response.data;
            });

            $http.get(REMOTE+'fishing_zone/')
            .then(function(response) {
                $scope.fishingzoneList = response.data;
            });
            $http.get(REMOTE+'country_flag/')
            .then(function(response) {
                $scope.flagList = response.data;
            });

             $http.get(REMOTE+'mesh_size/')
            .then(function(response){
                $scope.meshsizeList = response.data;
            })

            $http.get(REMOTE+'crewType')
            .then(function(response){
                $scope.crewTypeList = response.data;
               // console.log($scope.crewTypeList)
            }) //license_officer

               $http.get(REMOTE+'license_officer')
            .then(function(response){
                $scope.licenseOfficerList = response.data;
               // console.log($scope.crewTypeList)
            }) 

            $http.get(REMOTE+'reason')
            .then(function(response){
                $rootScope.reasonList = response.data
            })

    }

})
.controller('RegisterController', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'Register Audit Log';

          $scope.init = function(){
            $http.get(REMOTE+'audit/')
            .then(function(response) {
                $scope.auditList = response.data;
            }); 
          }

          $scope.checkList = {
            audits:[]
          }

           $scope.auditSelect = function(){
          
        if($scope.audit_select){
           $scope.checkList.audits = $scope.auditList.map(function(item) { return item.id; });
        }else{
          $scope.checkList.audits = []; 
        }
      }; 


    $scope.deleteAudit = function(){
        if($scope.checkList.audits.length<1){
            $scope.alertText = 'Select an audit item before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'RegisterController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.audits.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'RegisterController',
                  size: 'sm',
                  scope: $scope
                });     
          }

        };

        $scope.exportAudit = function(){
          if($scope.checkList.audits.length<1){
            $scope.alertText = 'Select a report item before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'RegisterController',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'RegisterController',
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




})
.controller('AdminController', function($scope, $rootScope, $http, REMOTE, $uibModal){
$rootScope.headingData = 'Administrator';

  $scope.tab = 1; 
      var that = this; 

      $scope.setTab = function (tabId) {
        this.tab = tabId;
      };

      $scope.isSet = function (tabId) {
        return this.tab === tabId;
      };


  $scope.init = function(){
        $http.get(REMOTE+'user_groups/')
            .then(function(response) {
                $scope.usergroupList = response.data;
                
            });
        $http.get(REMOTE+'user_rights/')
            .then(function(response) {
                $scope.userrightsList = response.data;
            });

         $http.get(REMOTE+'group_members/')
            .then(function(response) {
                $scope.userList = response.data;
            });

        $http.get(REMOTE+'users/')
            .then(function(response) {
                $scope.loginList = response.data;
            });

  }

  $scope.showGroup = function(){
     $scope.tempModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'groupModal.html',
            controller: 'AdminController',
            size: 'md',
            scope: $scope
      });
  }; 
  //addUser
  $scope.addUser = function(){
    $scope.newuser = {};
    $scope.button = 'Save';
    $scope.userModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addUserModal.html',
            controller: 'AdminController',
            size: 'md',
            scope: $scope
      });

  }

  $scope.editUser = function(d){
    $scope.newuser = d; 
    $scope.button = 'Update';
      $scope.userModalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addUserModal.html',
            controller: 'AdminController',
            size: 'md',
            scope: $scope
      });
  }

  $scope.closeUser =function(){
    $scope.userModalInstance.dismiss('cancel');
  }

  $scope.list = 
 [{name:'Authority Inspection', id:'authority_inspection', status:''}, {name:'Canoes', id:'canoes' , status:''}, {name:'Canoes Report', id:'canoes Report', status:''}, {name:'Canoes Compliance', id:'canoes_compliance', status:''}, 
  {name:'Canoes Compliance Report', id:'canoes_compliance Report', status:''},{name:'Canoes Licenses', id:'canoes_licenses', status:''},{name:'Canoes License Report', id:'canoes_licenses Report', status:''},{name:'Canoes Managers', id:'canoes_managers', status:''},
  {name:'Canoes Managers Report', id:'canoes_managers Report', status:''},{name:'Coastal District', id:'coastal_district', status:''},{name:'Coastal Region', id:'coastal_region', status:''},{name:'Construction Material', id:'construction_material', status:''},
  {name:'Country Flag', id:'country_flag', status:''},{name:'Equipment', id:'equipment', status:''},{name:'Fishing Company', id:'fishing_company', status:''},{name:'Fishing Village', id:'fishing_village', status:''},
  {name:'Fishing Zones', id:'fishing_zones', status:''},{name:'Industrial Vessel', id:'industrial_vessel', status:''},{name:'Industrial Vessel Report', id:'industrial_vessel Report', status:''},{name:'Industrial Vessel License', id:'industrial_vessel_license', status:''},
  {name:'Industrial Vessel License Report', id:'industrial_vessel_license Report', status:''},{name:'Industrial Vessel Tracking', id:'industrial_vessel_tracking', status:''},{name:'Landing Beach', id:'landing_beach', status:''},{name:'Landing Site', id:'landing_site', status:''},
  {name:'Marine Canoe Tracking', id:'marine_canoe_tracking', status:''},{name:'Place of Inspection', id:'place_of_inspection', status:''},{name:'Register Audit', id:'register_audit', status:''},{name:'Semi Industrial Vessel', id:'semi_industrial_vessel', status:''},
  {name:'Semi Industrial License Report', id:'semi_industrial_vessel Report', status:''},{name:'Semi Industrial Vessel License', id:'semi_industrial_vessel_license', status:''},{name:'Semi Industrial Vessel License Report', id:'semi_industrial_vessel_license Report', status:''},{name:'Semi Industrial Vessel Tracking', id:'semi_industrial_vessel_tracking', status:''},
  {name:'Target Species', id:'target_species', status:''},{name:'Type of Agreement', id:'type_of_agreement', status:''},{name:'Type of Engine', id:'type_of_engine', status:''},{name:'Type of Fishing Gear', id:'type_of_fishing_gear', status:''},
  {name:'Type of Storage', id:'type_of_storage', status:''},{name:'Type of Tracking Change', id:'type_of_tracking_change', status:''},{name:'Type of Vessel', id:'type_of_vessel', status:''},{name:'Vessels Compliance Report', id:'vessels_compliance_report Report', status:''},
  {name:'Vessel Company', id:'vessel_company', status:''},{name:'Vessel Company Report', id:'vessel_company Report', status:''},{name:'Vessel Manager', id:'vessel_manager', status:''},{name:'Vessel Manager Report', id:'vessel_manager Report', status:''},
  ];

 
  $scope.closegroupModal = function(){
    $scope.tempModalInstance.dismiss('cancel');
  }

  $scope.permitCheck = function(a, b){
     return a===b;
  }


 // $scope.add
  $scope.checkList = {
      add:true
  }

  $scope.addCheck = function(d){
      if(d.indexOf('A') > -1){
        return true;
      }
  }
  $scope.editCheck = function(d){
      if(d.indexOf('E') >-1){
        return true; 
      }
  }
  $scope.deleteCheck = function(d){
      if(d.indexOf('D') >-1){
        return true; 
      }
  }

  $scope.listCheck = function(d){
      if(d.indexOf('S') >-1){
        return true; 
      }
  }
  $scope.printCheck = function(d){
       if(d.indexOf('P') >-1){
        return true; 
      }
  }
  $scope.importCheck = function(d){

     if(d.indexOf('M') >-1){
        return true; 
      }
  }
  $scope.adminCheck = function(d){
    
  }

  $scope.groupRight = function(d){
    $scope.userrightsListSelected = [];
    angular.forEach($scope.userrightsList, function(value, key) {
        if(value.GroupID===d){
          //console.log(value);
            angular.forEach($scope.list, function(first, keys){
              //console.log(value.TableName)
                if(value.TableName===first.id){
                    first.status = value.AccessMask;
                }
            })
            //$scope.userrightsListSelected.push(value)
        }
    });

    //console.log($scope.list)

  }
}).controller('ActiveController', function($scope, $rootScope, $http, REMOTE, $uibModal){

   $http.get(REMOTE+'active_industrial/')
            .then(function(response) {
                $scope.industrialList = response.data;
                console.log($scope.industrialList);
                
            });
    $http.get(REMOTE+'active_semi_industrial/')
            .then(function(response) {
                $scope.semiList = response.data;
            }); 

})
.directive('rdLoading', function() {
   var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
  })
.directive('rdWidgetBody', function(){

	   var directive = {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><rd-loading ng-show="loading"></rd-loading><div ng-hide="loading" class="widget-content" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
}).directive('rdWidgetFooter', function(){

	 var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
}).directive('rdWidgetHeader', function(){
	    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><div class="row"><div class="pull-left"><i class="fa" ng-class="icon"></i> {{title}} </div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
        restrict: 'E'
    };
    return directive;
}).directive('rdWidget', function(){
	    var directive = {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
    }
}).filter('imgThumb', function() {
        return function(images, start) {
              if(images){
                //console.log(images);
                  return images.slice(start);
              }
            
        };
})

.directive('exportTable', function(){
    var link = function($scope, elm, attr){
    $scope.$on('export-pdf', function(e, d){
          elm.tableExport({type:'pdf', escape:'false'});
     });
    $scope.$on('export-excel', function(e, d){
           elm.tableExport({type:'excel', escape:false});
     });
    $scope.$on('export-doc', function(e, d){
         elm.tableExport({type: 'doc', escape:false});
     });
        return{
          restrict:'C', 
          link:link
        }
      }
})
