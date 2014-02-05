;(function ( $, window, document, undefined ) {
 
    var pluginName = "PlaginResults",
        defaults = {
            results: {}
            
        };
 
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init(options.answerRes);
    }
 
    Plugin.prototype.init = function () {
        this.getData();

    };

    Plugin.prototype.getData = function () {

        var self = this, items = [];

    	$.getJSON("results.json", function (data) {


            self.options.results = data;
            console.log(self.options.answerRes, 'getJSON');
                      
            self.getResult();
		});
        
    };

    Plugin.prototype.getResult = function () {
        var self = this, results = self.options.results;
        console.log(self.options.answerRes, 'getResult');

        for(var i=0, max=results.length; i<max; i+=1) {
                if (self.options.answerRes <=results[i].to) {
                    $(this.element).html('Your result: '+results[i].status);
                    return ;
                }
            }
    }

 
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );