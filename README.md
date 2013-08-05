Backbone-KendoWidget
====================

KendoWidget views for backbone.js.

This module is far from complete or useful for most use cases currently.

Support
=======

Currently Backbone-KendoWidget only supports kendoDropDownList, kendoSlider, and kendoGrid to a very limited extent.

Feel free to commit to this project if you would like to see it go somewhere!

Use
======

kendoSlider:

```
var SliderZoom = Backbone.KendoWidget.extend({
	el: '#zoom-control',
	options: {
    // Kendo settings here.
		orientation: "vertical",
    min: -10,
    max: 10,
    smallStep: 1,
    largeStep: 20,
    showButtons: true
	},
  // Type of kendo widget.
	widget: 'kendoSlider',
  // Bind changes to this.model (bi-directional).
	dataBind: 'value_zoom'
});

```

```
var LocationPicker = Backbone.KendoWidget.extend({
  	el: '#location-picker',
		widget: 'kendoDropDownList',
		options: {
      // Kendo widget options.
      dataTextField: "text",
	    dataValueField: "value",
	    dataSource: [],
	    index: 0
    },
    // Emit this event on the model when location changes (sends new value along with trigger).
    emitter: 'reposition',
    // Gets called immediately after kendoWidget has been initialized.
    setData: function() {
      var locationData = [], titles;

      if(this.model && this.model.get('bookmarks')) {
			  titles = _.keys(this.model.get('bookmarks'));
				locationData = [];

				_.each(titles, function(title) {
					locationData.push({text: title, value: title})
				});
	    }
      // Returns new dataSource.
		  reurn locationData;
    }
});
