Ghost.Utils.update_preview = function() {
	$('#markdown-to-html').html(
		Ghost.converter.makeHtml(
			$("#markdown-text").val()
			)
		);
}
Ghost.Utils.set_fullscreen = function(full) {
	if (full) {
		$('.adminbar').addClass('fullscreen');
		$('#main').addClass('fullscreen');
		$('#fullscreen').addClass('icon-resize-small')
		$('#fullscreen').removeClass('icon-resize-full');
	}
	else
	{
		$('.adminbar').removeClass('fullscreen');
		$('#main').removeClass('fullscreen');
		$('#fullscreen').addClass('icon-resize-full')
		$('#fullscreen').removeClass('icon-resize-small');
	}
}