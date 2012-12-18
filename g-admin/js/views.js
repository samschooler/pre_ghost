Ghost.Views._Posts = Backbone.View.extend({
    render: function(){
		$(this.el).html(Ghost.Templates["t-posts"]());
		return this;
    }
});

Ghost.Views._Posts_List = Backbone.View.extend({
	events: {
		"click .right i": "clicked_tool",
		"click .post-meta": "clicked"
	},

	initialize: function(){
		Ghost.Collections.posts.on('update_posts', this.render, this);
		Ghost.Collections.posts.on('add', this.render, this);

	},
    render: function(){
		var data = Ghost.Collections.posts.toJSON();
		$(this.el).html(Ghost.Templates["t-posts-list"]({"posts": data}));

		return this;
    },
    clicked_tool: function(e) {
		if(e.target.id == "search") {
				alert("search");
		} else if(e.target.id == "new") {
				Ghost.Utils.new_post();
		}
    },
    clicked: function(e) {
    	e.preventDefault();
    	var ele = e.target;
		while(!(ele.id.split("post-")[1] > -1)) {
			ele = ele.parentNode;
		}
		Ghost.Collections.posts.set_active(ele.id.split("post-")[1]);
		Ghost.Utils.update_preview();
    }
});
Ghost.Views._Posts_View = Backbone.View.extend({
	events: {
		"click .right i": "clicked"
	},
	initialize: function(){
		Ghost.Collections.posts.on('update_posts', this.render, this);
		Ghost.Collections.posts.on('add', this.render, this);
	},
    render: function(){
		var data = Ghost.Collections.posts.toJSON();
		$(this.el).html(Ghost.Templates["t-posts-view"]({"posts": data}));
		Ghost.Utils.update_preview();
		return this;
    },
    clicked: function(e) {
    	var post = Ghost.Collections.posts.get(Ghost.Collections.posts.get_active());
		if(e.target.id        == "publish") {
				post.set({published: !(post.get("published"))});
				Ghost.Collections.posts.trigger("update_posts");
		} else if(e.target.id == "feature") {
				post.set("featured", !(post.get("featured")));
				Ghost.Collections.posts.trigger("update_posts");
		} else if(e.target.id == "delete") {
				if(confirm("Do you really want to say goodbye to this post FOREVER?"))
				{
					Ghost.Collections.posts.remove(post);
					Ghost.Collections.posts.set_active(0);
					Ghost.Collections.posts.trigger('update_posts');
				}
		} else if(e.target.id == "edit") {
				Ghost.routers.navigate("!/edit/" + Ghost.Collections.posts.get_active(), {trigger: true});
		}
    }
});


Ghost.Views._Edit = Backbone.View.extend({
	events: {
		'click #fullscreen': 'toggle_fullscreen'
	},
    render: function(){

		$(this.el).html(Ghost.Templates["t-edit"](Ghost.Collections.posts.get(this.id).toJSON()));
		return this;
    },
    toggle_fullscreen: function() {
		if ($('#main').hasClass('fullscreen')) {
			Ghost.Utils.set_fullscreen(false);
		} else {
			Ghost.Utils.set_fullscreen(true);
		}
	}
});
Ghost.Views._Edit_Edit = Backbone.View.extend({
	events: {
		"click .right i": "clicked"	},
	initialize: function(){
		Ghost.Collections.posts.get(this.id).on('update_posts', this.render, this);
	},
    render: function(){
		var data = Ghost.Collections.posts.get(this.id).toJSON();
		$(this.el).html(Ghost.Templates["t-edit-edit"](Ghost.Collections.posts.get(this.id).toJSON()));

		$('#markdown-text').on('keyup', function(e) {
			Ghost.Utils.update_preview();
			$('#word-count').html(Ghost.Views.edit_edit.count_words());
		});
		$('#markdown-text').on('click', function(e) {
			Ghost.Utils.update_preview();
			$('#word-count').html(Ghost.Views.edit_edit.count_words());
		});
		$('#posts-title').on('keyup', function(e) {
			$('#post-url-path').html(Ghost.Views.edit_edit.path_from_title());
		});
		$('#post-url-path').html(Ghost.Views.edit_edit.path_from_title());

		return this;
    },
    count_words: function(){
		var words = $('#markdown-to-html').text().match(/\b[a-zA-Z0-9_,']+\b/g)
		if(words == null) {
			return "No Words";
		}
		else if(words.length == 1) {
			return "1 Word";
		}
		else
		{
			return words.length + " Words";
		}
	},
	path_from_title: function() {
		if($('#posts-title').length > 0)
			return $('#posts-title').val()
					.replace(/[^a-z0-9\-]/gi, '-')
					.replace( /--+/g, '-' )
					.replace(/^-*/, '')
					.replace(/-*$/, '')
					.toLowerCase() || "post_url_here";
		else return "post_url_here";
	},
    clicked: function(e) {
    	var post = Ghost.Collections.posts.get(this.id);
		if(e.target.id        == "publish") {
			alert("Published");
			post.set({published: !(post.get("published"))});
			post.set({
				title: $('#posts-title').val(),
				content: $('#markdown-text').val(),
				tags: $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")
			});
			Ghost.Collections.posts.trigger("update_posts");
			Ghost.Views.edit_edit.render();
		} else if(e.target.id == "update") {
			post.set({
				title: $('#posts-title').val(),
				content: $('#markdown-text').val(),
				tags: $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")
			});
			Ghost.Collections.posts.trigger("update_posts");

			// !Debug
			$('#update').removeClass("icon-refresh");
			$('#update').addClass("icon-ok");
			var t = setTimeout(function(){
				$('#update').removeClass("icon-ok");
				$('#update').addClass("icon-refresh");
			}, 500);
			// !Debug
		} else if(e.target.id == "save") {
			post.set({
				title: $('#posts-title').val(),
				content: $('#markdown-text').val(),
				tags: $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")
			});
			Ghost.Views.edit_edit.render();

			// !Debug
			$('#save').removeClass("icon-save");
			$('#save').addClass("icon-ok");
			var t = setTimeout(function(){
				$('#save').removeClass("icon-ok");
				$('#save').addClass("icon-save");
			}, 500);
			// !Debug
		} else if(e.target.id == "close") {
			if(Ghost.Collections.posts.get(this.id).get("title") != $('#posts-title').val() || Ghost.Collections.posts.get(this.id).get("content") != $('#markdown-text').val() || Ghost.Collections.posts.get(this.id).get("tags").toString() != $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")) {
				if(confirm("You have edited this post, all unsaved changes will be lost! Do you still want to close?")) {
					Ghost.routers.navigate("!/", {trigger: true});
				}
			} else {
				Ghost.routers.navigate("!/", {trigger: true});
			}
    	}
    }
});
Ghost.Views._Edit_View = Backbone.View.extend({
	render: function(){
		$(this.el).html(Ghost.Templates["t-edit-view"]());
		$('#markdown-text').trigger('keyup');
		return this;
    },
});