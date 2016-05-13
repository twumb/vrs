'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')
.controller('IndustController', function($scope, $rootScope, $uibModal, $http, REMOTE, Upload, $cookieStore){
    $rootScope.headingData = 'Industrial Vessels';
    $scope.loadAmount = 0; 
    $scope.loadAmountEvidence = 0; 
    $scope.loadAmountStatus = 0;

    $scope.role = parseInt($cookieStore.get('fishreg_user_role'));
    //console.log($scope.role);
    
    /* section for compliance function. This section is activated only for MCS group users*/

    $scope.new_vessel_compliance = function(){
      $scope.vesselcompliance = {};
      $scope.vesselcompliancetext = 'New Vessel Compliance Report';
      $scope.vesselcompliance_button = 'Save';   
      $scope.read_vessel = false;    
      $scope.complianceModalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'vesselComplianceModal.html',
        //controller: 'McsController',
        size: 'md',
        scope: $scope
      });
    };

    $scope.newcomplianceClose = function(){
      $scope.complianceModalInstance.dismiss('cancel');   
    }


    /* end of compliance section */




    $http.get(REMOTE+'equipmentlisting/')
            .then(function(response) {
                $scope.equipmentList = response.data;
                
            }); 

    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data =$scope.equipmentList;
 
  	$scope.upload = function (file) {
        Upload.upload({
            url: REMOTE+'photo',
            data: {file: file, 'username':'userPhoto' }
        }).then(function (resp) {
            $scope.newvessel.Photo_vessel = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmount = progressPercentage;
        });
    };

  	$scope.uploadEvidence = function (file) {
        Upload.upload({
            url: REMOTE+'evidencefile',
            data: {file: file, 'username':'userFile' }
        }).then(function (resp) {
            $scope.replacement.evidence = REMOTE+'uploads/Env'+resp.data;
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
            data: {file: file, 'username':'userStatus' }
        }).then(function (resp) {
            $scope.statusChange.picture = REMOTE+'uploads/'+resp.data;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $scope.loadAmountStatus = progressPercentage;
        });
  	};

    $scope.exportSelected = {};

    //pdf printer


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

      if($scope.pdfType=='Company'){
       var master =  ['Company_id', 'Company_name', 'Year_establishment', 'Name_director', 'finalTotal'];
      $scope.pdfHeading = ["Company ID", "Company Name", "Year of Establishment", "Name of Director", "Vessels"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Company_id==null)
              {
                  value.Company_id='-'; 
              }
              if(value.Company_name==null){
                  value.Company_name='-';
              }
              if(value.Year_establishment==null){
                value.Year_establishment ='-';
              }
              if(value.Name_director==null){
                value.Name_director = '-';
              }
              if(value.finalTotal==null){
                value.finalTotal= '-';
              }
          });
      }else if($scope.pdfType=='Vessels'){
        var master =  ['Vessel_id', 'Company_id', 'Current_vessel_name', 'Name', 'Date_registration', 'count'];
      $scope.pdfHeading = ["Vessel ID", "Company ID", "Current Vessel Name", "Flag Origin", "Registration Date", "Licenses"];

          angular.forEach($scope.exportdata, function(value, key){
              if(value.Vessel_id==null)
              {
                  value.Vessel_id='-'; 
              }
              if(value.Company_id==null){
                  value.Company_id='-';
              }
              if(value.Current_vessel_name==null){
                value.Current_vessel_name ='-';
              }
              if(value.Name==null){
                value.Name = '-';
              }
              if(value.Date_registration==null){
                value.Date_registration= '-';
              }
              if(value.count==null){
                value.count= '-';
              }
              value.Date_registration = value.Date_registration.slice(0, -14);
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


     //industrial init
    $scope.init = function(){
          $http.get(REMOTE+'industrial_company/')
            .then(function(response) {
                $rootScope.industrial_company = response.data;
                $scope.totalItems = $scope.industrial_company.length; 
            });

             $http.get(REMOTE+'industrial_vessel/')
            .then(function(response) {
                $rootScope.industrial_vessel = response.data;
                 $scope.totalVessels = $scope.industrial_vessel.length; 
                
            });

             $http.get(REMOTE+'industrial_vessel_all/')
            .then(function(response) {
                $scope.industrial_vessel_all = response.data;            
            });


             $http.get(REMOTE+'industrial_license/')
            .then(function(response) {
                $rootScope.industrial_license = response.data;
            });

             $http.get(REMOTE+'industrial_license_cur/')
            .then(function(response) {
                $rootScope.industrial_license_current = response.data;
                $scope.totalLicense = response.data.length; 
            });
            $http.get(REMOTE+'industrial_tracking/')
            .then(function(response) {
                //$rootScope.industrial_tracking = response.data;
                $rootScope.industrial_tracking = response.data;
                
                $scope.totalTracking = response.data.length; 
            });
             $http.get(REMOTE+'agreement/')
            .then(function(response) {
                $scope.agreement = response.data;
                
            });
             $http.get(REMOTE+'country_flag/')
            .then(function(response) {
                $scope.flagList = response.data;
                
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
            $http.get(REMOTE+'fishing_gear/')
            .then(function(response) {
                $scope.fishing_gearList = response.data;
                
            });

            $http.get(REMOTE+'tracking_type/')
            .then(function(response){
               $scope.trackingList = response.data
            })

            $http.get(REMOTE+'vessel_type/')
            .then(function(response){
                $scope.vesselTypeList = response.data
                
            })
            //target_species
            $http.get(REMOTE+'target_species/')
            .then(function(response){
                $scope.tagetSpeciesList = response.data
                
            })
            $http.get(REMOTE+'fishing_zone/')
            .then(function(response){
                $scope.zoneList = response.data
                
            })
            $http.get(REMOTE+'mesh_size/')
            .then(function(response){
                $scope.meshsizeList = response.data
            }); 
            $http.get(REMOTE+'crewType')
            .then(function(response){
                $scope.crewTypeList = response.data;
               // console.log($scope.crewTypeList)
            })
            $http.get(REMOTE+'license_officer')
            .then(function(response){
                $scope.licenseOfficerList = response.data;
               // console.log($scope.crewTypeList)
            }) 
             $http.get(REMOTE+'replacement')
            .then(function(response){
                $rootScope.replacementHistory = response.data;
               // console.log($scope.crewTypeList)
            }) ; 

            $http.get(REMOTE+'reason')
            .then(function(response){
                $scope.reasonList = response.data
            })

          }; 
          $scope.init();

          $scope.tab = 1; 
          $scope.select = 1; 
          $scope.setTab = function (tabId) {
            this.tab = tabId;
          };

          $scope.isSet = function (tabId) {
            return this.tab === tabId;
          };


          $scope.setSelected = function (tabId) {
            this.select = tabId;
          };

          $scope.isSelected = function (tabId) {
            return this.select === tabId;
          };

          //sorting
          $scope.viewby = 10;
          $scope.itemsPerpageVessel = 10;
          $scope.itemsPerpageCompany = 10;
          $scope.itemsPerpageLicense = 10;
          $scope.itemsPerpageTracking = 10;


          $scope.currentPage = 1;
          $scope.currentCompany = 1; 

          $scope.currentVessel = 1; 
          $scope.currentLicense = 1; 
          $scope.currentTracking = 1; 
          $scope.numPerPage = 15;
          /*$scope.maxSize = 5;*/



          $scope.sortType     = 'Company_name'; // set the default sort type for vessel company
          $scope.sortVessel   = 'V'; // set the default sort type for industrial vessel
          $scope.sortLicense  ='License_id';  // set the default sort type for vessel license
          $scope.sortReverse  = false;  // set the default sort order for vessel company
          $scope.sortVesselReverse = false;  // set the default sort order for industrial vessel
          $scope.sortLicenseReverse = false; // set the default sort order for industrial license

          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };

          $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
          };

        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first paghe
        }


         $scope.read = false; 

      //industrial checklist
      $scope.checkList = {
          companies :[], 
          vessels:[], 
          licenses:[], 
          tracking:[]
      };


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
       // End of Date functions



      //Vessel Company Functions

      $scope.companySelect = function(){
        if($scope.company_select){
          $scope.checkList.companies = angular.copy($scope.industrial_company);
        }else{
          $scope.checkList.companies = []; 
        }
      }; 

      //Delete Company Function
      $scope.deleteCompany = function(){
        if($scope.checkList.companies.length<1){
            $scope.alertText = 'Select a company before you can delete'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.companies.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };



        //$scope.customPopupSelectedOne

        //Show Vessels of Company
        $scope.showVessel = function(n){
          $scope.statusHeader = n.Company_name;
          $scope.company = n.Company_id;
          $scope.selectedVessels = []; 
          $scope.replaceList = [];
          $scope.allVessels = [];

          //$scope.industrial_vessel_all 

          angular.forEach($scope.industrial_vessel_all, function(value, key){
              if(value.Company_id===n.Company_id){
                  $scope.allVessels.push(value)
              }
          }); 

          angular.forEach($scope.industrial_vessel, function(value, key){
              if(value.Company_id===n.Company_id){
                  $scope.selectedVessels.push(value)
              }
          }); 

          angular.forEach($scope.replacementHistory, function(value, key){
            
              if(value.owner===n.Company_id){
                  $scope.replaceList.push(value)
              }
          }); 


          //console.log($scope.selectedVessels)
              $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofVessel.html',
                  controller: 'IndustController',
                  size: 'md',
                  scope: $scope
                });
        }

        //Vessel Replacement
        $scope.replacement = {}; 
        $scope.replace_error = false; 
        
        $scope.replaceVessel= function(){
           if($scope.replacement.old_vessel===$scope.replacement.new_vessel){
              $scope.replace_error = true; 
           }else{
            $scope.replacement.owner = $scope.company;

              //console.log($scope.replacement);
            $http.post(REMOTE+'replacement', $scope.replacement).then(function(response){
                $scope.closestatus(); 
                $scope.init();
            });

           }
        }




        //Export Selected Company 
        $scope.exportCompany = function(){
          if($scope.checkList.companies.length<1){
            $scope.alertText = 'Select a company before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });
        }
        else{
          $scope.exportdata = $scope.checkList.companies;
          $scope.pdfType = 'Company';
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
            }
        }; 


      // Export Buttons
       $scope.getArray = [{a: 1, b:2}, {a:3, b:4}];
      $scope.export = function(){
          if($scope.exportSelected=='pdf'){
            console.log($scope.exportdata)
              console.log( $scope.checkList.company);

          }
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



      // vessel things

      $scope.vesselSelect = function(){
        if($scope.vessel_select){
           $scope.checkList.vessels = angular.copy($scope.industrial_vessel);  // $scope.industrial_vessel.map(function(item) { return item.V; });
         // console.log($scope.checkList.vessels)
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
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.vessels.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };

        // industrial export vessel
        $scope.exportVessel = function(){
        
          $scope.pdfType = 'Vessels'; 
          if($scope.checkList.vessels.length<1){
            $scope.alertText = 'Select a vessel before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustController',
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
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 
          //$scope.selectedLicenses = [];

          $scope.newtracking = {}; 
  
    $scope.$watch('customPopupSelected', function() { 
                //$scope.myAutocompleteModel = ($scope.selected && 'value' in $scope.selected) ? $scope.selected.value : null; 
            //console.log('nana');
              //console.log($scope.customPopupSelected);
              //$scope.selectedVesselName = $scope.customPopupSelected; 
              if($scope.customPopupSelected){
                    $scope.newtracking.name = $scope.customPopupSelected.Current_vessel_name; 
                	$scope.newtracking.Vessel_id = $scope.customPopupSelected.Vessel_id;
                }
            });

        $scope.selectedType=0;
        $scope.changedItem = {};

          $scope.setType = function (tabId) {
            $scope.selectedType = tabId;
          };

          $scope.isType = function (tabId) {
            return $scope.selectedType == tabId;
          };

          $scope.changeType = function(){
             $scope.setType($scope.newtracking.Change_type); 
          }


          $scope.showLicense = function(n){
            //console.log(n);
          $scope.statusHeader = n.Vessel_id;
          $scope.selectedLicenses = []; 
          angular.forEach($scope.industrial_license, function(value, key){
              if(value.Vessel_id===n.Vessel_id){
                
                  $scope.selectedLicenses.push(value); 

              }

          }); 
         // console.log($scope.selectedLicenses);
          //console.log($scope.selectedVessels)
              $scope.statusModalInstance = $uibModal.open({
                  animation: true,
                  templateUrl: 'numberofLicense.html',
                  controller: 'IndustController',
                  size: 'md',
                  scope: $scope
                });
        }




      /*$scope.export = function(){
        $scope.closeExport(); 
      }

      $scope.closeExport = function(){
          $scope.modalExport.dismiss('cancel');
      };*/
        //crew management

        
        $scope.saveCrew = function(){
          
            $scope.newcrew.vessel_id = $scope.crewHeader; 
            $http.post(REMOTE+'crew', $scope.newcrew).then(function(response){
                $scope.closecrew();
                $scope.init();
                //$scope.select = 2; 
            });
        }






      // License things

      $scope.licenseSelect = function(){
        if($scope.license_select){
           $scope.checkList.licenses = $scope.industrial_license.map(function(item) { return item.License_id; });
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
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.deleteText ='Do you want to delete '+ $scope.checkList.licenses.length +' items';
          $scope.modalDelete = $uibModal.open({
                  animation: true,
                  templateUrl: 'deleteModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
        }

        };


        $scope.exportLicense = function(){
           $scope.pdfType = 'License'; 
          if($scope.checkList.licenses.length<1){
            $scope.alertText = 'Select a license before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          $scope.exportdata = $scope.checkList.licenses;
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 

        //industrial tracking

        $scope.trackingSelect = function(){
        if($scope.tracking_select){
           $scope.checkList.tracking = angular.copy($scope.industrial_tracking);//$scope.industrial_tracking.map(function(item) { return item.Tracking_id; });
        }else{
          $scope.checkList.tracking = []; 
        }
      }; 


       $scope.exportTracking = function(){
         $scope.pdfType = 'Tracking'; 
          if($scope.checkList.tracking.length<1){
            $scope.alertText = 'Select a tracking before you can export'; 
            $scope.modalAlert = $uibModal.open({
                  animation: true,
                  templateUrl: 'alertModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });

        }
        else{
          //$scope.deleteText ='Do you want to export '+ $scope.checkList.companies.length +' items';
          $scope.exportdata = $scope.checkList.tracking;
          $scope.modalExport = $uibModal.open({
                  animation: true,
                  templateUrl: 'exportModal.html',
                  controller: 'IndustController',
                  size: 'sm',
                  scope: $scope
                });     
        }
        }; 


      $scope.new_vessel_company = function(){
        $scope.newcompany = {};
        $scope.heading_text = 'New Vessel Company';
        $scope.company_button = 'Save';
          $scope.read_ = false;
          $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'vessel_companyModal.html',
                //controller: 'IndustController',
                size: 'md',
                scope: $scope
              });
      };

      $scope.closeModal =function(){
            $scope.modalInstance.dismiss('cancel');
      };


      /*this.closeModal = function(){// = function(){
      	 $scope.modalInstance.dismiss('cancel');
      }*/

      $scope.edit_vessel_company = function(d){
          $scope.heading_text = d.Company_name;
          $scope.newcompany = d;   
          $scope.company_button = 'Update';
          $scope.read_ = false; 
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vessel_companyModal.html',
            //controller: 'IndustController',

            size: 'md',
            scope: $scope
          });
        
      };

      $scope.view_vessel_company = function(d){
          $scope.heading_text = d.Company_name; 
          $scope.companyName = d.Company_id;
          $scope.newcompany = d; 
          $scope.read_ = true;  
          $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'vessel_companyModal.html',
            //controller: 'IndustController',
            size: 'md',
            scope: $scope
          });
      
      };

      $scope.new_industrial_vessel = function(d){
       	$scope.newvessel = {};
       	$scope.newIndustrial_button = 'Save';
        $scope.newvessel.Company_id = d.Company_id
        $scope.vessel_text = 'New Industrial Vessel ' +d.Company_name;
        $scope.read_vessel = false;
        $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'newIndustrial.html', 
            size:'md', 
            scope:$scope
        });
      };

      $scope.vessel_edit = function(d){
        $scope.newvessel = d; 
        $scope.newvessel.Date_registration = new Date(d.Date_registration);
        $scope.newIndustrial_button = 'Update';
        $scope.vessel_text = d.Current_vessel_name;
        $scope.read_vessel = false;
        $scope.modalInstance = $uibModal.open({
        	animation: true, 
            templateUrl:'newIndustrial.html', 
            size:'md', 
            scope:$scope
        });
      };

      $scope.vessel_view = function(d){
        //console.log(d);
        $scope.newvessel = d; 
        $scope.vessel_text = d.Current_vessel_name;
        $scope.read_vessel = true;
            $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'newIndustrial.html', 
            controller:'IndustController', 
            size:'md', 
            scope:$scope
        });

      };
      //$scope.newlicense = {};
      $scope.new_industrial_license = function(){
        $scope.newlicense = {};
        $scope.licensetext = 'New Vessel License';
        $scope.read_license = false;
        $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'newLicense.html', 
            //controller:'IndustController', 
            size:'md', 
            scope:$scope
        })
      }; 


      $scope.license = function(d){
          $scope.newlicense = {};
          $scope.license_button ='Save';
          $scope.licensetext = 'Vessel : '+ d.V;
          $scope.newlicense.Vessel_id = d.V
          $scope.read_license = false;
          $scope.modalInstance = $uibModal.open({
              animation: true, 
              templateUrl:'newLicense.html', 
              //controller:'IndustController', 
              size:'md', 
              scope:$scope
          })
      }; 



      $scope.license_close = function(){
          $scope.industrialModal.dismiss('cancel');  
      };

      $scope.license_edit = function(d){
        $scope.newlicense = d; 
        $scope.license_button ='Update';
        $scope.read_license = false;
        $scope.licensetext = d.License_id; 
        $scope.industrialModal = $uibModal.open({
            animation: true, 
            templateUrl:'newLicense.html', 
            //controller:'IndustController', 
            size:'md', 
            scope:$scope
        });

      }; 

      $scope.license_view = function(d){
        $scope.newlicense = d; 
        $scope.read_license = true;
        $scope.licensetext = d.License_id; 
        $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'newLicense.html', 
            //controller:'IndustController', 
            size:'md', 
            scope:$scope
        });
      }
      

      $scope.saveVessel = function(){
	    $scope.newvessel.Nav_fish_aids = $scope.newvessel.multipleSelect;
	    if($scope.newIndustrial_button=='Save'){
	    	$http.post(REMOTE+'industrial_vessel', $scope.newvessel).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }else if ($scope.newIndustrial_button=='Update'){
	    	$http.put(REMOTE+'industrial_vessel', $scope.newvessel).then(function(response){
	    		//console.log(response.data);
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }
      }

      $scope.saveCompany = function(){
	            if($scope.company_button=='Update'){
	            	 $http.put(REMOTE+'industrial_company', $scope.newcompany).then(function(response){
		               $scope.closeModal();
	            	})
	            }else if($scope.company_button=='Save'){
	            	$http.post(REMOTE+'industrial_company', $scope.newcompany).then(function(response){
		                if(response.data.insert){
		                  $scope.closeModal();
		                }
	            	})
	            }
      }

      $scope.saveLicense = function(){
      	//alert('ghana');
          /*if($scope.license_button=='Update'){
	            	 $http.put(REMOTE+'industrial_license', $scope.newlicense).then(function(response){
		               $scope.closeModal();
	            	})
	            }else if($scope.license_button=='Save'){
	            	$http.post(REMOTE+'industrial_license', $scope.newlicense).then(function(response){
		                if(response.data.insert){
		                  $scope.closeModal();
		                }
	            	})
	            } */

	          // console.log($scope.newlicense);
	    if($scope.license_button=='Save'){
	    	$http.post(REMOTE+'industrial_license', $scope.newlicense).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }else if ($scope.license_button=='Update'){
	    	$http.put(REMOTE+'industrial_license', $scope.newlicense).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          	}else{

	          	}
          	})
	    }
      }

      $scope.saveTrack = function(){
          $http.post(REMOTE+'industrial_tracking', $scope.newtracking).then(function(response){
	          	if(response.data.affectedRows==1){
	          		$scope.closeModal();
	          		$scope.init();
	          	}else{

	          	}
          	})


      }


      



      
      //newLicense



      $scope.new_industrial_tracking = function(){
          $scope.modalInstance = $uibModal.open({
            animation: true, 
            templateUrl:'newTracking.html', 
            controller:'IndustController', 
            size:'md', 
            scope:$scope
        })
      }

      $scope.crew = function(d){  
      	$scope.newcrew = {};
        $scope.crewHeader = d.V;
        $http.get(REMOTE+'crew/'+d.V).then(function(response){
            $scope.selectedcrewList = response.data;
        })


        $scope.crewModal = $uibModal.open({
            animation: true, 
            templateUrl:'crewmanager.html', 
            //controller:'IndustController', 
            size:'md', 
            scope:$scope
        })
      }; 

      $scope.closecrew = function(){
        $scope.crewModal.dismiss('cancel');
      };

      $scope.status = function(d)
      {
      		$scope.statusChange = {};
            $scope.statusHeader = d.V;
            $scope.vessel_id = d.V;
            $scope.status.Change_type = 'Inactive'; 
            $scope.modalInstance = $uibModal.open({
              animation: true, 
              templateUrl:'statusModal.html', 
              size:'md', 
              scope:$scope
          })
      }; 
     

          $scope.saveStatus =function(){
          var th = {
              statement: "Vessel_status ='"+$scope.statusChange.Change_type+"'", 
              Vessel_id: $scope.vessel_id, 
              Change_type: '8', 
              Change_description: $scope.statusChange.Change_description, 
              Change_date: $scope.statusChange.Change_date, 
              picture:$scope.statusChange.picture
          }
          $http.put(REMOTE+'industrial_vessel/'+ $scope.vessel_id, th).then(function(response){
          	  console.log(response.data)
              $scope.closeModal();
              $scope.init();
          }); 
      }; 


      $scope.closestatus = function(){
        $scope.statusModalInstance.dismiss('cancel');
      }


            
})

