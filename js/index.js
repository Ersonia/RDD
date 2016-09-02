/*


 */
var CurrentPage='B'
var PreviousPage='B'
var CurrentNumber=1
var PreviousNumber=1
var CurrentDealer
var FlickPage=0
var FlickList = [["D",0],["E",0],["F",1],["F",2],["F",3],["F",4]];
    
function init()
{
    document.addEventListener("orientationchange", function(event){
    switch(window.orientation) 
    {  
        case -90: case 90:
            /* Device is in landscape mode */
            //alert(window.orientation)
            break; 
        default:
            /* Device is in portrait mode */
	    alert("this app is best in landscape mode")
    }
    });
    
    app.initialize()

}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        receivedElement.setAttribute('style', 'display:none;');
        $(document).ready(function()
	{
	    AppMain()	    
	});

        console.log('Received Event: ' + id);
    }
};

function SetDropdownMenuAction()
{
    //setup drop down menu
    $('.app-dropdown-menu').addClass('app-dropdown-menu-hover');

    //this is there for ios device and safari browser in particular
    $('.app-dropdown-menu-hover').click(function(){
	$('.app-dropdown-menu-content').show()
    });
    
    //this is for other browsers
    $('.app-dropdown-menu').hover(function(){
	$('.app-dropdown-menu-content').show()
    },
    function(){
	$('.app-dropdown-menu-content').hide()
    }
    );
    

}



function AppMain()
{
    

    
    
    
    SetDropdownMenuAction()
    //get tabs ready
    $('ul.tabs li').bind('touchstart',
    function()
    {
	var tab_id = $(this).attr('data-tab');
	$('ul.tabs li').removeClass('current');
	$('.tab-content').removeClass('current');
	$(this).addClass('current');
	$("#"+tab_id).addClass('current');
	var nextDoorColour=$(this).next().css("background-color")
	if (typeof nextDoorColour === "undefined") {nextDoorColour=$(this).prev().css("background-color")}
	$('ul.tabs').css('background-color', nextDoorColour);
	})
	    $('ul.tabs li').bind('mousedown',
    function()
    {
	var tab_id = $(this).attr('data-tab');
	$('ul.tabs li').removeClass('current');
	$('.tab-content').removeClass('current');
	$(this).addClass('current');
	$("#"+tab_id).addClass('current');
	var nextDoorColour=$(this).next().css("background-color")
	if (typeof nextDoorColour === "undefined") {nextDoorColour=$(this).prev().css("background-color")}
	$('ul.tabs').css('background-color', nextDoorColour);
	})
    //end of tabs
    
    $("#app_initpage_1_id").html("<B>jQuery OK")
    //jsonData=BasicAjax("json-data.php")

    SavedDealerID=window.localStorage.getItem("CurrentDealerID")
    CurrentDealer=FindCurrentDealer(SavedDealerID)
    UpdateDealer(SavedDealerID)
    NgChangeDealer(CurrentDealer)
    DisplayDealer()
    //$("#app_dealer_div_id").html(CurrentDealer.APP_DEALER_NAME_MASTHEAD+' ['+CurrentDealer.APP_DEALER_SUPER_ID+']')
    GoToPage('B')
    //$("#app_page_A_id").html(ListTable('app_dealers'))

    $("#app_central").html(LoginForm())
    if (window.angular === undefined) {AngularCheck="Not Loaded"} else {AngularCheck="Loaded"}
    $("#app_feedback").html(ScreenResolution()+"<BR>Dealer Super ID: "+SavedDealerID+"<BR>Angular:"+AngularCheck)

}

function DisplayDealer()
{
    //$("#app_dealer_div_id").html(CurrentDealer.APP_DEALER_NAME_MASTHEAD+' ['+CurrentDealer.APP_DEALER_SUPER_ID+']')
    $("#app_dealer_name_id").html(CurrentDealer.APP_DEALER_NAME_MASTHEAD)
    
}

function LoginForm()
{
    FormDetails="<input class='login-field' type='text' placeholder='Enter code' name='app_login' id='app_login_id'><BR><button class='login-button' onClick='LoginAction()'>Come on in</button>"
    //FormDetails=FormDetails+"<div id='app_feedback'>App Feedback</div>"
    return FormDetails
}

function FindCurrentDealer(DealerSuperID)
{
  Dealers=jsonData['app_dealers'].Data
  for (var i in Dealers)
  {
    if (Dealers[i].APP_DEALER_SUPER_ID==DealerSuperID) 
    {
        return Dealers[i]
    }
  }
  return Dealers[19]
}

function FindCurrentDealerLocation(DealerSuperID)
{
  Dealers=jsonData['app_dealers'].Data
  for (var i in Dealers)
  {
    if (Dealers[i].APP_DEALER_SUPER_ID==DealerSuperID) 
    {
        return i
    }
  }
  return -1
}

function GoBack()
{
    GoToPage(PreviousPage,PreviousNumber)
}

function ShowNameBarPlusMenu()
{

    if ( $('#app_dealer_display_bar_id').css('display')=='none' ) { $('#app_dealer_display_bar_id').show() }
    if ( $('#app-dropdown-menu-id').css('display')=='none' ) { $('#app-dropdown-menu-id').show() }

}

function HideNameBar()
{
    if ( $('#app_dealer_display_bar_id').css('display')=='block' ) { $('#app_dealer_display_bar_id').hide() }
}

function RemoveDropDownMenu()
{
    if (FlickPage==6) {FlickPage=0}
    GoToPage(FlickList[FlickPage][0],FlickList[FlickPage][1])
    FlickPage++
}

function GoToPage(Letter,Number,Action)
{
    $(".app-dropdown-menu-content").hide()
    $(".app_pages_class").hide()
    ThePageID="#app_page_"+Letter+"_id"
    $(ThePageID).show()
    PreviousPage=CurrentPage
    CurrentPage=Letter
    PreviousNumber=CurrentNumber
    CurrentNumber=Number

    switch (Letter)
    {
	case'A':
	    HideNameBar()
	    $("#app_central").html(LoginForm())
	    break;
	case'B':
	    HideNameBar()
	    break;
	case'C':
	    HideNameBar()
	    break;
	case'D':
	    ShowNameBarPlusMenu()
	    break;	
	case'E':
	    ShowNameBarPlusMenu()
	    break;
	case 'F':
	    ShowNameBarPlusMenu()
	    $('ul.tabs li').removeClass('current');
	    $('.tab-content').removeClass('current');
	    if (Number==3 || Number==1)
	    {$('ul.tabs').css('background-color','#666666')}
	    else
	    {$('ul.tabs').css('background-color','#bbbbbb')}
	    $('#tab-'+Number).addClass('current');
	    $('#tab-link-'+Number).addClass('current');
	    $('#tab-link-2').trigger('click');
	    
	    break;
	case 'H':
	    ShowNameBarPlusMenu()
	    break;
	default:
	    break;
    }

    
    //hide product groups when tabs are used instead
    if (Letter=='F') {$('.app_dropdown_product_group').hide()}
    else {$('.app_dropdown_product_group').show()}
    
    //stop page on from showing as an option ... 
    if (Letter=='D') {$('.app_dropdown_dealer_menu').hide()}
    else {$('.app_dropdown_dealer_menu').show()}
    
    return


}

function LoginAction()
{
    InputValue=$("#app_login_id").val()
    CurrentDealer=LookUpDealer(InputValue)
    UpdateDealer(CurrentDealer.APP_DEALER_SUPER_ID)
    NgChangeDealer(CurrentDealer)
    //$("#app_page_A_id").hide()
    $(".app_pages_class").hide()
    DisplayDealer()
    $("#app_page_B_id").show()
    $("#app_feedback").html(CurrentDealer.APP_DEALER_SUPER_ID)
}

function UpdateDealer(DealerSuperID)
{
    $('#app_dealer_id').val(DealerSuperID).trigger('change')
}


function LookUpDealer(DealerPassword)
{
  Dealers=jsonData['app_dealers'].Data
  for (var i in Dealers)
  {
    if (Dealers[i].APP_DEALER_PASSWORD==DealerPassword) 
    {
        window.localStorage.setItem("CurrentDealerID",Dealers[i].APP_DEALER_SUPER_ID)
        return Dealers[i]
    }
  }
  return Dealers[19]
}

function ScreenResolution() {
var fullWidth = window.screen.width;
var fullHeight = window.screen.height;
 
var availableWidth = window.screen.availWidth;
var availableHeight = window.screen.availHeight;
//return fullWidth+" / "+ fullHeight + " ["+availableWidth+" / "+ availableHeight+"]"
gcdValue=gcd(fullWidth,fullHeight)
return fullWidth+" / "+ fullHeight + " [ " + fullWidth/gcdValue + " / " +  fullHeight/gcdValue + " ]"

}
    
function gcd (a, b) {
            return (b == 0) ? a : gcd (b, a%b);
}    
    
function ListTable(TableName)
{
    Result=''
    for (var i in jsonData[TableName].Data)
    {
        Record=jsonData[TableName].Data[i]
        Result+=Record.APP_DEALER_ID+":"
        Result+=Record.APP_DEALER_SUPER_ID+":"
        Result+=Record.APP_DEALER_NAME_MASTHEAD
	Result+=" ["+Record.APP_DEALER_PASSWORD+"]<BR>" 
    }
    return Result;
}

function SetSeries()
{
    alert($('#app_current_series_id').val())
}

function BasicAjax(PHPFile)
{
 	var Result=false
	$.ajax({
    'url': 'http://mitforklift.com/commons/apps/'+PHPFile,
    'async': false,    
    'dataType': 'json',
    'success': function (data) 
	{
          Result=data
    }
    });
	return Result	
}




