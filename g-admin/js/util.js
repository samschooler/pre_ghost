var uniq;
Ghost.Utils.update_preview = function() {
	var caret_loc = Ghost.Utils.get_caret($('#markdown-text')[0])
			var slip =  $('#markdown-text').val()
                .replace("(image)", "%%!%%")
                .slice(0, caret_loc);
            uniq = slip.lastIndexOf(_.last(slip.match(/\b[a-zA-Z0-9_]+\b/g)));
            if(uniq < 0) uniq = 0;
            var first_half =  $('#markdown-text').val().slice(0, uniq);
			var second_half = $('#markdown-text').val().slice(uniq);
			var full_text = (first_half + "%%caret%%" + second_half)
                .replace("%%!%%", "(image)")
	$('#markdown-to-html').html(
		Ghost.converter.makeHtml(
			full_text
		)
	);
	$('#markdown-to-html')[0].scrollTop = ($('#caret')[0].offsetTop - $('#caret')[0].offsetHeight) - $('#markdown-to-html').height() * .3;
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
Ghost.Utils.get_caret = function(el) {
	if (el.selectionStart) {
		return el.selectionStart;
	} else if (document.selection) {
		el.focus();

		var r = document.selection.createRange();
		if (r == null) {
			return 0;
		}

		var re = el.createTextRange(),
			rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

		return rc.text.length;
	} 
	return 0;
}