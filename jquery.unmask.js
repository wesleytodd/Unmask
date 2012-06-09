/*
 * Password (Un)Masking
 * http://wesleytodd.com/
 * 
 * Version 1.2
 * 
 * Requires     jQuery
 * 
 * Basic Usage:
 * $('input[type=password]').unmask({
		'wrapperClass'   : 'unmask-wrap',       //A class added to the wraper on the checkbox
		'defaultMasked'  : 'show',              //show | hide password on page load
		'labelText'      : 'Show Password',     //Label text for the checkbox
		'confirmPrefix'  : 'confirm_'           //Optional method to determine password confirmation
		                                        //fields.  Takes the name of the password field and adds
		                                        //the prefix on the front
		'transferAttrs'  : ['id', 'name', 'class', 'placeholder', 'value'] //An array of attributes to clone over
	});
 */
(function($){
	$.unmask = function(el, options){
		var base = this;
		base.$el = $(el);
		base.$el.data("unmask", base);
		
		base.init = function(){
			base.options = $.extend({},$.unmask.defaultOptions, options);
			
			if(base.$el.is('[name^='+base.options.confirmPrefix+']'))
				return false;
			
			base.$confirm = $('input[name='+base.options.confirmPrefix+base.$el.attr('name')+']');
			
			base.$checkbox = $('<input type="checkbox" class="unmask-checkbox" id="'+base.$el.attr('name')+'_unmask_checkbox" />');
			
			if(base.options.defaultMasked == 'show'){
				base.$checkbox.prop('checked', true);
			}
			base.$el.after(base.$checkbox);
			base.$checkbox
				.wrap('<div class="'+base.options.wrapperClass+'" />')
				.after('<label for="'+base.$el.attr('name')+'_unmask_checkbox" >'+base.options.labelText+'</label>');
			
			base.$checkbox.change(function(){
				var type;
				if($(this).is(':checked')){
					type = 'text';
				}else{
					type = 'password';
				}
				base.replaceFields(type);
			});
			if(base.options.defaultMasked == 'show'){
				base.replaceFields('text');
			}
		};
		
		base.replaceFields = function(type){
			var $newEl = $('<input type="'+type+'" />');
			for(var i=0;i<base.options.transferAttrs.length;i++){
				$newEl.attr(base.options.transferAttrs[i], base.$el.attr(base.options.transferAttrs[i]));
			}
			base.$el.trigger('unmaskreplace', [$newEl]);
			base.$el.replaceWith($newEl);
			base.$el = $newEl;
			if(type == 'text'){
				base.$hiddenpass = $('<input type="password" value="'+base.$el.prop('value')+'" name="'+base.$el.attr('name')+'" style="visibility:hidden;position:absolute;" />');
				base.$el.after(base.$hiddenpass);
				base.$el.keyup(function(){
					base.$hiddenpass.prop('value', $(this).prop('value'));
				});
			}else{
				base.$hiddenpass.remove();
			}
			
			if(base.$confirm.length !== 0){
				var $newConfirm = $('<input type="'+type+'" />');
				for(var i=0;i<base.options.transferAttrs.length;i++){
					$newConfirm.attr(base.options.transferAttrs[i], base.$confirm.attr(base.options.transferAttrs[i]));
				}
				base.$confirm.trigger('unmaskreplace', [$newConfirm]);
				base.$confirm.replaceWith($newConfirm);
				base.$confirm = $newConfirm;
			}
		};
		base.init();
	};

	$.unmask.defaultOptions = {
		'wrapperClass'   : 'unmask-wrap',
		'defaultMasked'  : 'show',
		'labelText'      : 'Show Password',
		'confirmPrefix'  : 'confirm_',
		'transferAttrs'  : ['id', 'name', 'class', 'placeholder', 'value']
	};

	$.fn.unmask = function(options){
		return this.each(function(){
			(new $.unmask(this, options));
		});
	};

})(jQuery);