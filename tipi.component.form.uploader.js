function setUploader() {
	var uploader = $('.uploader');
	if(uploader.length > 0) {
		uploader.each(function() {
			var uploaderEach = $(this);
			var uploaderInput = uploaderEach.find('.uploader-input');
			var uploaderLabel = uploaderEach.find('.uploader-label');
			var uploaderLabelName = uploaderEach.find('.uploader-label-name');

			if(uploaderInput.length > 0 && uploaderLabel.length > 0 && uploaderLabelName.length > 0) {
				var label = uploaderLabelName.html();

				uploaderEach.addClass('__uploader--ready');
				uploaderInput.on({
					change : function(e) {
						var fileName = '';

						if(this.files && this.files.length > 1) {
							//Combine the files with our uploader data attribute;
							fileName = ( this.getAttribute( 'data-uploader-multiple-name' ) || '' ).replace( '{files}', this.files.length );
						} else if(e.target.value){
							//Show the selected file
							fileName = e.target.value.split( '\\' ).pop();
						}

						if(fileName !== '') {
							//Set the new name on the label
							uploaderLabelName.html(fileName);
							uploaderEach.addClass('__uploader--queued');

							//Fire a custom trigger when the input has a file
							uploaderInput.trigger('tipi.uploader.queued');
						} else {
							//Reset the name of the label
							uploaderLabelName.html(label);
							uploaderEach.removeClass('__uploader--queued');
						}
					},
					focus : function() {
						uploaderEach.addClass('__uploader--focus');
					},
					blur : function() {
						uploaderEach.removeClass('__uploader--focus');
					}
				});
			}

		});
	}
}