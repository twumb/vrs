'use strict';

/**
 * @ngdoc function
 * @name fishApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fishApp
 */
angular.module('fishApp')

    .factory('dashReport',['REMOTE','$http',function(REMOTE,$http){

    var month={};

    month.industial_license=function(){
    	var th = [{jan:0, feb:0, mar:0, apr:0, may:0, jun:0, jul:0, aug:0, sep:0, oct:0, nov:0, dec:0}, {jan:0, feb:0, mar:0, apr:0, may:0, jun:0, jul:0, aug:0, sep:0, oct:0, nov:0, dec:0}];	
       	return $http.get(REMOTE+'industrial_license_current').then(function(response) {
		    month.industrial = response.data; 
		  	angular.forEach(month.industrial, function(value, key){
		  		if(new Date(value.Date_issue).getMonth()==0 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].jan+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==1 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].feb+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==2 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].mar+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==3 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].apr+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==4 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].may+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==5 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].jun+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==6 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].jul+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==7 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].aug+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==8 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].sep+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==9 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].oct+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==10 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].nov+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==11 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].dec+=1; 
		  		}
		  		if(new Date(value.End_date).getMonth()>=0){
              		th[1].jan+=1; 
	            }
	             if(new Date(value.End_date).getMonth()>=1){
	              	th[1].feb+=1; 
	            }
	             if(new Date(value.End_date).getMonth()>=2){
	              	th[1].mar+=1; 
	            }
	             if(new Date(value.End_date).getMonth()>=3){
	              	th[1].apr+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=4){
	              	th[1].may+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=5){
	             	th[1].jun+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=6){
	              	th[1].jul+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=7){
	              	th[1].aug+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=8){
	              	th[1].sep+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=9){
	              	th[1].oct+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=10){
	              	th[1].nov+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=11){
	              	th[1].dec+=1; 
	            }
		  	});
		  	month.industrial = th; 
		    return month.industrial;
		});
    }

    month.semi_industial_license=function(){
    	var th = [{jan:0, feb:0, mar:0, apr:0, may:0, jun:0, jul:0, aug:0, sep:0, oct:0, nov:0, dec:0}, {jan:0, feb:0, mar:0, apr:0, may:0, jun:0, jul:0, aug:0, sep:0, oct:0, nov:0, dec:0}];   	
       	return $http.get(REMOTE+'semi_industrial_license_current').then(function(response) {
		    month.semi_industrial = response.data; 
		  	angular.forEach(month.semi_industrial, function(value, key){
		  		if(new Date(value.Date_issue).getMonth()==0 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].jan+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==1 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].feb+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==2 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].mar+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==3 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].apr+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==4 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].may+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==5 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].jun+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==6 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].jul+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==7 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].aug+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==8 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].sep+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==9 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].oct+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==10 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].nov+=1; 
		  		}else if(new Date(value.Date_issue).getMonth()==11 && new Date(value.Date_issue).getFullYear()=='2015' ){
		  			th[0].dec+=1; 
		  		}
		  		if(new Date(value.End_date).getMonth()>=0){
              		th[1].jan+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=1){
	              	th[1].feb+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=2){
	              	th[1].mar+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=3){
	              	th[1].apr+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=4){
	              	th[1].may+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=5){
	             	th[1].jun+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=6){
	              	th[1].jul+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=7){
	              	th[1].aug+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=8){
	              	th[1].sep+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=9){
	              	th[1].oct+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=10){
	              	th[1].nov+=1; 
	            }
	            if(new Date(value.End_date).getMonth()>=11){
	              	th[1].dec+=1; 
	            }
		  	});
		  	month.semi_industrial = th; //console.log(th);
		    return month.semi_industrial;
		});
    };

    return month;

}]);