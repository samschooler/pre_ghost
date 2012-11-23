Ghost._Routers = Backbone.Router.extend({
    routes: {
        "!/edit/:id":        "open_editor",
        "!/new":              "new_post",
        "*actions":           "default_route"
    },
	open_editor: function(id) {
		if(!Ghost.Collections.posts.get(id))
			this.default_route();
		Ghost.Collections.posts.set_active(id);
		if (Ghost.Views.edit) Ghost.Views.edit.undelegateEvents();
		Ghost.Views.edit = new Ghost.Views._Edit({
			id: id,
			el: '#main'
		}).render();
		if (Ghost.Views.edit_edit) Ghost.Views.edit_edit.undelegateEvents();
		Ghost.Views.edit_edit = new Ghost.Views._Edit_Edit({
			id: id,
			el: '#posts-edit'
		});
		Ghost.Views.edit_edit.render();
		if (Ghost.Views.edit_view) Ghost.Views.edit_view.undelegateEvents();
		Ghost.Views.edit_view = new Ghost.Views._Edit_View({el: '#posts-view'}).render();
	},
	new_post: function() {
		var id = Ghost.Collections.posts.new();
		Ghost.Collections.posts.set_active(id);
		Ghost.routers.navigate("!/edit/" + id, {trigger: true});
	},
	default_route: function() {
		Ghost.routers.navigate("!/", {replace: true});
		Ghost.Utils.set_fullscreen(false);
		if (Ghost.Views.posts) Ghost.Views.posts.undelegateEvents();
		if (Ghost.Views.post_view) Ghost.Views.post_view.undelegateEvents();
		if (Ghost.Views.post_list) Ghost.Views.post_list.undelegateEvents();
		Ghost.Views.posts =     new Ghost.Views._Posts({el: '#main'}).render();
		Ghost.Views.post_list = new Ghost.Views._Posts_List({el: '#posts-list'}).render();
		Ghost.Views.post_view = new Ghost.Views._Posts_View({el: '#posts-view'}).render();
	}
});