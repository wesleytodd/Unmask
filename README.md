#Password (Un)Masking (unmask)

**Version 1.2**

This plugin is will [un-mask your password fields](http://www.useit.com/alertbox/passwords.html).  It also supports password confirmation fields and native browser password saving.

## Example
	$('input[type=password]').unmask({
		'wrapperClass'   : 'unmask-wrap',       //A class added to the wraper on the checkbox
		'defaultMasked'  : 'show',              //show | hide password on page load
		'labelText'      : 'Show Password',     //Label text for the checkbox
		'confirmPrefix'  : 'confirm_'           //Optional method to determine password confirmation
		                                        //fields.  Takes the name of the password field and adds
		                                        //the prefix on the front
	});