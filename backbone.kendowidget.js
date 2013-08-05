Backbone.KendoWidget = Backbone.View.extend({
	initialize: function() {
		var _this = this, widget;

		var widget = this.getElement();

		this.$el.html(widget);

		if(typeof this.setData === 'function') {
			this.options.dataSource = this.setData();
		}

		widget = widget[this.widget](this.options).data(this.widget);

		if(widget.enable && this.dataBind) {
			widget.enable(false);

			this.enable = _.bind(widget.enable, widget);

			if(this.model) {
				widget.value(this.model.get(this.dataBind));

				widget.bind('change', function(e) {
					var value = e.value || e._value || e.sender._value;

					_this.model.set(_this.dataBind, value);
					_this.model.save();
				});

				this.model.on('change:' + _this.dataBind, function(model, value) {
					console.log(value);
					widget.value(value);
				});

				this.model.on('change:isOn', function(model, isOn) {
					widget.enable(isOn);
				});
			}
		}

		if(this.emitter) {
			widget.enable(false);

			this.enable = _.bind(widget.enable, widget);

			if(this.model) {
				this.model.on('change:isOn', function(model, isOn) {
					widget.enable(isOn);
				});
				widget.bind('change', function() {
					_this.model.goToBookmark(widget.value());
				});
				if(Drupal.admin) {
					require(['bookmarkr'], function(bookmarkr) {
						bookmarkr.initialize(widget).render();
					});
				}
			}
		}

		if(widget.dataSource) {
			widget.dataSource.read();
		}
	},
	getElement: function() {
		switch(this.widget) {
			case 'kendoSlider':
				return $('<div />', { id: 'widget-' + this.boundTo });
			case 'kendoNumericTextBox':
				return $('<input />', { id: 'widget-' + this.boundTo });
			case 'kendoDropDownList':
				return $('<input />', { id: 'widget-' + this.boundTo });
			default:
				return $('<div />', { id: 'widget-' + this.boundTo });
		}
	},
	remove: function() {
		this.undelegateEvents();
		if(this.$el.data(this.widget)) {
			this.$el.data(this.widget).remove();
		}
		delete this.model;
	}
});