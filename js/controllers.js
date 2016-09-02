var RDDApp = angular.module('RDDApp', ['ngTouch']);


RDDApp.controller('RDDAppCtrl', ['$scope', '$window', function ($scope, $window) {
  $scope.jsonNg=jsonData
  TemplateCount=0
  NgChangeCount=0
    $scope.$on('$includeContentLoaded',function()
    {
        TemplateCount++
	if (TemplateCount==7)
        {
          $(document).ready(function()
          {
            $window.AppMain()
          });
          
        }
    });
    
  $scope.NgChangeDealer=function(WinDealer)
  {

     $scope.currentDealer=WinDealer
     if (NgChangeCount>0) {$scope.$apply()}
     NgChangeCount++
  }

  $window.NgChangeDealer=$scope.NgChangeDealer
  
  $scope.NgFeature=function(aFeature)
  {
    $scope.Feature=aFeature
    $('.product-left-block-main').hide()
    $('.product-left-block-feature').show()
    $scope.$apply()
  }
  
  $scope.NgCheckCurrentFeature=function()
  {
  	  return $('.product-left-block-main').is(':hidden')
  }
  
   $scope.NgFeatureInit=function(aFeature)
  {
    $scope.Feature=aFeature
    $('.product-left-block-main').show()
    $('.product-left-block-feature').hide()
    $scope.$apply()
  }
  $scope.NgProductGroupPage=function(PageNumber)
  {
    //alert(PageLetter+":"+PageNumber+":")
    $scope.Feature=null
   $('.product-left-block-main').show()
    $('.product-left-block-feature').hide()
    $window.GoToPage("F",PageNumber)
  }
  
  $scope.SetSeries=function(TheSeriesID,CurrentProdGrp)
  {
  	//$scope.Feature=null  
  	$scope.CurrentNumber=CurrentProdGrp.APP_PROD_GROUP_ID  	  //tab number 
    $window.GoToPage("G")
    $scope.CurrentSeriesID=TheSeriesID
  }
  
  $scope.BigPicture=function($event)
  {
  	  $('#features_mainpic_big_fullscreen').show('slow')
  }	  
  
  $scope.FindDealer=function(DealerSuperID)
  {
    alert(jsonData.app_dealers.Data[0].APP_DEALER_ID)
  }
  $scope.GoToPage=function(PageLetter,PageNumber)
  {
    //alert(PageLetter+":"+PageNumber+":")
    $window.GoToPage(PageLetter,PageNumber)
  }
}]);
