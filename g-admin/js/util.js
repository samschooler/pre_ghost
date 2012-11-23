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
Ghost.Utils.new_post = function() {
	var id = Ghost.Collections.posts.new();
	Ghost.Collections.posts.set_active(id);
	Ghost.routers.navigate("!/edit/" + id, {trigger: true});
}