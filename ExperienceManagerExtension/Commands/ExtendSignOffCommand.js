Type.registerNamespace("Community.Extensions");

Community.Extensions.DetectEditModeCommand = function DetectEditModeCommand(selection, pipeline) {
    Type.enableInterface(this, "Community.Extensions.DetectEditModeCommand");
    this.addInterface("Tridion.Cme.Command", ["DetectEditModeCommand"]);
}

Community.Extensions.DetectEditModeCommand.prototype._isEnabled = function DetectEditModeCommand$_isEnabled(selection) {
    return true;
};

Community.Extensions.DetectEditModeCommand.prototype._isAvailable = function DetectEditModeCommand$_isAvailable(selection, pipeline) {
    return true;
};

Community.Extensions.DetectEditModeCommand.prototype._execute = function DetectEditModeCommand$_execute(selection, pipeline) {
    var w = window.parent || window;    
    if (w && w.$display)
    {
        var view = w.$display.getView();
        if (view && view.getLastKnownUrl) {
            var url = view.getLastKnownUrl();
            
            //Check if parameter is still in the url. If so: remove it
            var returnUrl = new Uri(url);
          
            returnUrl = returnUrl.deleteQueryParam(Community.Extensions.Constants.paramNameActiveInXpm);
            returnUrl = returnUrl.addQueryParam(Community.Extensions.Constants.paramNameExitXpmEditor, true);
            view.properties.lastKnownUrl = returnUrl.toString();            
        }
    }

    //Continue with the default action
    pipeline.stop = false;

};