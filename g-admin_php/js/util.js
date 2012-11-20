Ghost.Utils.update_preview = function() {
	$('#markdown-to-html').html(
		Ghost.converter.makeHtml(
			$("#markdown-text").val()
			)
		);
}