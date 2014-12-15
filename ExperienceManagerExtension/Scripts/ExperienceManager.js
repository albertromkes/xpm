
//Method for editing the original src (url) from the 'WebsiteFrame' <iframe> 
//It adds a querystring parameter to the url to indicate that the inlineediting session starts
var onDisplayStarted = function () {
    $evt.removeEventHandler($display, "start", onDisplayStarted);
            
    var displayViewProperties = $display.getView().properties;
    //Get the <iframe> control where the editable website loads
    var websiteFrameControl = displayViewProperties.controls.websiteFrame;   
    var originalUrl = websiteFrameControl.src;

    //Delete the existing parameters (parameters from this extension only)
    var originalUri = new Uri(originalUrl).deleteQueryParam(Community.Extensions.Constants.paramNameActiveInXpm);
    originalUri = originalUri.deleteQueryParam(Community.Extensions.Constants.paramNameExitXpmEditor);

    //Construct new url with the querystring parameter added
    var newUrl = originalUri.addQueryParam(Community.Extensions.Constants.paramNameActiveInXpm, "true");
    
    websiteFrameControl.src = newUrl;
};

$evt.addEventHandler($display, "start", onDisplayStarted);


