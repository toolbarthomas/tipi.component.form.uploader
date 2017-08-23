(function (win, doc, $){

	window.setUploader = function() {
		var uploaders = $('.uploader').not('.__uploader--ready');

		if (uploaders.length === 0) {
			return;
		}

		uploaders.each(function () {
			var uploader = $(this);
			var uploader_input = uploader.find('.uploader-input');
			var uploader_label = uploader.find('.uploader-label');
			var uploader_label_name = uploader.find('.uploader-label-name');

			if (uploader_input.length === 0 && uploader_label.length === 0 && uploader_label_name.length === 0) {
				return;	
			}

			// Set the default placeholder
			setUploaderPlaceholder(uploader);

			setUploaderInputLogic(uploader);

			uploader.addClass('__uploader--ready');
		});
	}

	function getUploaderPlaceholder(uploader) {
		if(typeof uploader === 'undefined') {
			return;
		}

		var uploader_label_name = uploader.find('.uploader-label-name');
		if (uploader_label_name.length === 0) {
			return;
		}

		var placeholder = uploader.data('uploader-placeholder');
		if (typeof placeholder === 'undefined') {
			placeholder = uploader_label_name.html();
		}

		uploader.data('uploader-placeholder', placeholder);

		return placeholder;
	}

	function setUploaderPlaceholder(uploader) {
		if (typeof uploader === 'undefined') {
			return;
		}

		var uploader_label_name = uploader.find('.uploader-label-name');
		if (uploader_label_name.length === 0) {
			return;
		}

		var placeholder = getUploaderPlaceholder(uploader);
		if(typeof placeholder === 'undefined') {
			return;
		}

		uploader_label_name.html(placeholder);
	}

	function setUploaderInputLogic(uploader) {
		if (typeof uploader === 'undefined') {
			return;
		}

		var uploader_input = uploader.find('.uploader-input');
		var uploader_label_name = uploader.find('.uploader-label-name');

		uploader_input.on({
			change: function (event) {
				var file_selected = true;
				var placeholder = getUploaderPlaceholder(uploader);

				// Show a the number of queued files if we have selected multiple files
				if (this.files && this.files.length > 1) {
					placeholder = (this.getAttribute('data-uploader-multiple-name') || '').replace('{files}', this.files.length);
					file_selected = true;
				}
				// Show the single
				else if (event.target.value) {
					//Show the selected file
					placeholder = event.target.value.split('\\').pop();
				}
				// We have no file
				else {
					file_selected = false;
				}

				if (file_selected) {
					//Set the new name on the label
					uploader.addClass('__uploader--queued');

					//Fire a custom trigger when the input has a file
					$(document).trigger('tipi.uploader.queued');
				} else {
					//Reset the name of the label
					uploader.removeClass('__uploader--queued');
				}

				uploader_label_name.html(placeholder);
			},
			focus: function () {
				uploader.addClass('__uploader--focus');
			},
			blur: function () {
				uploader.removeClass('__uploader--focus');
			}
		});
	}

})(window.jQuery(window), window.jQuery(document), window.jQuery);