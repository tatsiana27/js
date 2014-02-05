;(function ( $, window, document, undefined ) {
 
    var pluginName = "myPlagin",
        defaults = {
            currentIndex: 0,
            result: 0,
            survey: {},
            surveyComplete: function () {}
        };
    
 
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }
 
    Plugin.prototype.init = function () {
        this.bindClick();
        this.getData();

    };

    Plugin.prototype.getData = function () {

        var self = this;

    	$.getJSON("questions.json", function (data) {
           
            self.options.survey = data;
            self.getHtml(self.options.currentIndex);
		});
        
    };

    Plugin.prototype.getHtml = function (index) {

        var self = this, html = '', survey = self.options.survey, currentAnswer = {};

        html = '<h3>'+survey[index].question+'</h3>';
        for (var i=0, max=survey[index].answers.length; i<max; i+=1) {

            html += '<input type="radio" name="answer" id="r'+i+'" data-answer="'+i+'"><label for="r'+i+'">'+survey[index].answers[i] + '</label><br>';
            

            }
            $(this.element).html(html);
           
    };


    Plugin.prototype.bindClick = function () {


        var self = this,  answ = {};

        $(this.element).on('click', 'input', function() {
            self.getPoints(self.options.survey[self.options.currentIndex].points[$(this).attr('data-answer')]);
 
        });

    };

    Plugin.prototype.getPoints = function (points) {

        var survey_lenght = this.options.survey.length;

        this.options.result += points;
      //  console.log(this.options.result);

            if (this.options.currentIndex < survey_lenght-1) {
                this.getHtml(++this.options.currentIndex);

            } else {
               // console.log (this.options.result);
                if (typeof this.options.surveyComplete === "function") {
                     this.options.surveyComplete({point: this.options.result});
                 }
            }

    };

 
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

  
})( jQuery, window, document );