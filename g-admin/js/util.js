Ghost.Utils.update_preview = function() {
	$('#markdown-to-html').html(
		Ghost.converter.makeHtml(
			$("#markdown-text").val()
			)
		);
}
Ghost.Utils.switch_to_edit_view = function() {
	if(typeof Ghost.Views.edit != "object") {
		Ghost.Views.edit = new Ghost.Views._Edit({
			id: Ghost.Collections.posts.get_active(),
			el: '#main'
		}).render();
	} else {
		Ghost.Views.edit.render();
	}
	if(typeof Ghost.Views.edit_edit != "object") {
		Ghost.Views.edit_edit = new Ghost.Views._Edit_Edit({
			id: Ghost.Collections.posts.get_active(),
			el: '#posts-edit'
		});
		Ghost.Views.edit_edit.render();
	} else {
		Ghost.Views.edit_edit.id = Ghost.Collections.posts.get_active();
		Ghost.Views.edit_edit.render();
	}
	if(typeof Ghost.Views.edit_view != "object") {
		Ghost.Views.edit_view = new Ghost.Views._Edit_View({el: '#posts-view'}).render();
	} else {
		Ghost.Views.edit_view.render();
	}
}