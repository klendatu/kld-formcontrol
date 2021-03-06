
+(function($, global){


	var FormControl = function($node, options){
		this.$node = $node;
		
		if (this.$node.length < 1)
			return;
			
		if (options == undefined)
			options = {};
			
		this.options = this.jsonExtend(options, FormControl.defaults);
		
		this.error = false;
		this.init();
	}

	FormControl.prototype.init = function(){
		var that = this;
		this.setDom();
		this.setFocus();
		
		this.$node.on('submit', function(){
			console.log('--------------------------------')
			that.error = false;
			that.resetMessage();
			that.checkInputFile();
			that.checkInputSelect();
			that.checkInputText();
			that.checkInputRadio();
			that.checkInputCheckbox();
			that.checkSameValues();
			return !that.error;
		});
	},
	
	FormControl.prototype.setDom = function(){
		this.$selectorFieldText 			= '.FieldText';
		this.$selectorFieldRadio		 	= '.FieldRadio';
		this.$selectorFieldCheckbox		 	= '.FieldCheckbox';
		this.$selectorFieldSelect		 	= '.FieldSelect';
		this.$selectorFieldFile			 	= '.FieldFile';
	},
	
	FormControl.prototype.setFocus = function(){
		var that = this;
		this.$node.find('input[type="text"]').on('focus', function(){
			var $fieldText = $(this).parents(that.$selectorFieldText);
			if ($fieldText.length == 1){
				$fieldText.removeClass('is-error');
			}
		});
	},
	
	FormControl.prototype.resetMessage = function(){
		this.$node.find(this.$selectorFieldText).removeClass('is-error');
		this.$node.find(this.$selectorFieldRadio).removeClass('is-error');
		this.$node.find(this.$selectorFieldCheckbox).removeClass('is-error');
		this.$node.find(this.$selectorFieldSelect).removeClass('is-error');
		this.$node.find(this.$selectorFieldFile).removeClass('is-error');
	},
	
	FormControl.prototype.checkInputFile = function(){
		var that = this;
		
		this.$node.find(this.$selectorFieldFile).each(function(){
			var $field 	= $(this);
			var $input 	= $(this).find(that.$selectorFieldFile + '-input');
			var $message = $(this).find(that.$selectorFieldFile + '-message');
			
			if ($field.hasClass('is-required')){
				if ($input.val() == ''){
					that.error = true;
					$field.addClass('is-error');
				}
			}			
		});
	},	
	
	FormControl.prototype.checkInputSelect = function(){
		var that = this;
		
		this.$node.find(this.$selectorFieldSelect).each(function(){
			var $field 	= $(this);
			var $input 	= $(this).find(that.$selectorFieldSelect + '-input');
			var $message = $(this).find(that.$selectorFieldSelect + '-message');
			
			if ($field.hasClass('is-required')){
				if ($input.val() == ''){
					that.error = true;
					$field.addClass('is-error');
				}
			}			
		});
	},	
	
	FormControl.prototype.checkInputRadio = function(){
		var that = this;
		
		this.$node.find(this.$selectorFieldRadio).each(function(){	
			var $field 		= $(this);
			var $inputList	= $(this).find('input[type="radio"]');
			var $message 	= $(this).find(that.$selectorFieldRadio + '-message');
		
			if ($field.hasClass('is-required')){	
				var error = true;	
				$inputList.each(function(){
					var $input = $(this);				
					if ($input.is(':checked')){
						error = false;
					}
				});
								
				if (error){
					$field.addClass('is-error');
					that.error = error;
				}
			}			
		});
		
	},
	
	FormControl.prototype.checkInputCheckbox = function(){
		var that = this;	
		
		this.$node.find(this.$selectorFieldCheckbox).each(function(){	
			var $field 		= $(this);
			var $inputList	= $(this).find('input[type="checkbox"]');
			var $message 	= $(this).find(that.$selectorFieldCheckbox + '-message');
		
			if ($field.hasClass('is-required')){	//console.log('is-required')	
				var error = true;	
				$inputList.each(function(){		
					var $input = $(this);					//	console.log($input.attr('name'))
					if ($input.is(':checked')){				//console.log('is checked')
						error = false;
					}
				});
				
				if (error){
					$field.addClass('is-error');
					that.error = error;
				}
			}			
		});
	},
	
	FormControl.prototype.checkInputText = function(){
		var that = this;
		
		this.$node.find(this.$selectorFieldText).each(function(){
			var $field 	= $(this);
			var $input 	= $(this).find(that.$selectorFieldText + '-input');
			var $message = $(this).find(that.$selectorFieldText + '-message');
			
			if ($field.hasClass('is-required')){
				if ($input.val() == ''){
					that.error = true;
					$field.addClass('is-error');
				}
			}			
		});
	},
	
	FormControl.prototype.checkSameValues = function(){
		var that = this;		
		
		for (var key in this.options.sameValues){
			var selector 	= this.options.sameValues[key];
					
			if (this.$node.find(selector).length != 2)
				continue;
				
			var $fieldInput 	= this.$node.find(selector).eq(0);
			var $fieldConfirm 	= this.$node.find(selector).eq(1);
			
			var input1 = $fieldInput.find(this.$selectorFieldText + '-input').val();
			var input2 = $fieldConfirm.find(this.$selectorFieldText + '-input').val();
			
			if (input2 != input1){
				$fieldConfirm.addClass('is-error');
				this.error = true;
			}
		}
	},
	
	FormControl.prototype.jsonExtend = function(json, defaultJSON){
		var result={};
		for(var key in defaultJSON) result[key]=defaultJSON[key];
		for(var key in json) 		result[key]=json[key];
		return result;
	}
	
	FormControl.defaults = {
		sameValues: []
	}
		
	var module = function(selector, options){
		$(selector).each(function(){
			var $form = $(this);
			$form.data('kld.formcontrol', new FormControl($form, options));
		});
	}

	global.Kld = global.Kld || {};
	
	global.Kld.FormControl = module;
	
}(jQuery, window));

