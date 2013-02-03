Ghost.Views._Posts = Backbone.View.extend({
	initialize: function(){
		Mousetrap.reset();
		Mousetrap.bind('n', function(e) {
		    Ghost.routers.navigate("!/edit/new", {trigger: true});
		    return false;
		});
		Mousetrap.bind('d', function(e) {
		    if(confirm("Do you really want to say goodbye to this post FOREVER?"))
			{
				Ghost.Collections.posts.remove(Ghost.Collections.posts.get_active_model());
				Ghost.Collections.posts.set_active(0);
				Ghost.Collections.posts.trigger('update_posts');
			}
		    return false;
		});
		Mousetrap.bind('enter', function(e) {
		    Ghost.routers.navigate("!/edit/" + Ghost.Collections.posts.get_active_model().id, {trigger: true});
		    return false;
		});
		Mousetrap.bind('up', function(e) {
			if(Ghost.Collections.posts.at(Ghost.Collections.posts.get_active()-1) != null)
		    	Ghost.Collections.posts.set_active(Ghost.Collections.posts.get_active()-1);
		    return false;
		});
		Mousetrap.bind('down', function(e) {
			if(Ghost.Collections.posts.at(Ghost.Collections.posts.get_active()+1) != null)
				Ghost.Collections.posts.set_active(Ghost.Collections.posts.get_active()+1);
		    return false;
		});
	},
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
			Ghost.routers.navigate("!/edit/new", {trigger: true});	
		}
    },
    clicked: function(e) {
    	e.preventDefault();
    	var ele = e.target;
		while(!(ele.id.split("post-")[1] > -1)) {
			ele = ele.parentNode;
		}
		Ghost.Collections.posts.set_active(Ghost.Collections.posts.get_index(ele.id.split("post-")[1]));
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
    	var post = Ghost.Collections.posts.get_active_model();
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
				Ghost.routers.navigate("!/edit/" + Ghost.Collections.posts.get_active_model().id, {trigger: true});
		}
    }
});

Ghost.Views._Edit = Backbone.View.extend({
	events: {
		'click #fullscreen': 'toggle_fullscreen'
	},
	initialize: function() {
		Mousetrap.reset();
		Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
		    Ghost.Views.edit_edit.save_data();
		    Ghost.Collections.posts.trigger("update_posts");
		    if($("#update") != null) {
				// !Debug
				$('#update').removeClass("icon-refresh");
				$('#update').addClass("icon-ok");
				var t = setTimeout(function(){
					$('#update').removeClass("icon-ok");
					$('#update').addClass("icon-refresh");
				}, 500);
				// !Debug
			} 
			if($("#save") != null) {
				// !Debug
				$('#save').removeClass("icon-save");
				$('#save').addClass("icon-ok");
				var t = setTimeout(function(){
					$('#save').removeClass("icon-ok");
					$('#save').addClass("icon-save");
				}, 500);
				// !Debug
			}
		    return false;
		});
		Mousetrap.bind('esc', function(e) {
			var post = Ghost.Collections.posts.get_active_model();
		    if(post.get("title") != $('#posts-title').val() || post.get("content") != $('#markdown-text').val() || post.get("tags").toString() != $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")) {
				if((function(){return prompt("You have edited this post. Type YES to close this post without saving.")}()+"--").toLowerCase() == "yes--") {
					Ghost.routers.navigate("!/", {trigger: true});
				}
			} else {
				Ghost.routers.navigate("!/", {trigger: true});
			}
		    return false;
		});
		Mousetrap.bind(['ctrl+esc', 'command+esc'], function(e) {
		    Ghost.Views.edit.toggle_fullscreen();
		});
	},
    render: function(){
		$(this.el).html(Ghost.Templates["t-edit"](Ghost.Collections.posts.get_active_model().toJSON()));
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
		Ghost.Collections.posts.get_active_model().on('update_posts', this.render, this);
		setTimeout(function() {
			$('#markdown-text').focus();
			var text = $('#markdown-text').val()
			$('#markdown-text').val("");
			$('#markdown-text').val(text);
			var textarea = document.getElementById('markdown-text');
			textarea.scrollTop = textarea.scrollHeight;
		}, 0);
	},
    render: function(){
		var data = Ghost.Collections.posts.get_active_model().toJSON();
		$(this.el).html(Ghost.Templates["t-edit-edit"](Ghost.Collections.posts.get_active_model().toJSON()));

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
		var words = Ghost.Utils.censorship($('#markdown-text').val()).match(/\b[a-zA-Z0-9_,']+\b/g)
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
    	var post = Ghost.Collections.posts.get_active_model();
		if(e.target.id        == "publish") {
			alert("Published");
			post.set({published: !(post.get("published"))});
			this.save_data();
			Ghost.Collections.posts.trigger("update_posts");
			Ghost.Views.edit_edit.render();
		} else if(e.target.id == "update") {
			this.save_data();
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
			this.save_data();
			Ghost.Collections.posts.trigger("update_posts");

			// !Debug
			$('#save').removeClass("icon-save");
			$('#save').addClass("icon-ok");
			var t = setTimeout(function(){
				$('#save').removeClass("icon-ok");
				$('#save').addClass("icon-save");
			}, 500);
			// !Debug
		} else if(e.target.id == "close") {
			if(Ghost.Collections.posts.get_active_model().get("title") != $('#posts-title').val() || Ghost.Collections.posts.get_active_model().get("content") != $('#markdown-text').val() || Ghost.Collections.posts.get_active_model().get("tags").toString() != $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")) {
				if((function(){return prompt("You have edited this post. Type YES to close this post without saving.")}()+"--").toLowerCase() == "yes--") {
					Ghost.routers.navigate("!/", {trigger: true});
				}
			} else {
				Ghost.routers.navigate("!/", {trigger: true});
			}
    	}
    },
    save_data: function() {
    	Ghost.Collections.posts.get_active_model().set({
				title: $('#posts-title').val(),
				content: $('#markdown-text').val(),
				tags: $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")
			});
    }
});
Ghost.Views._Edit_View = Backbone.View.extend({
	render: function(){
		$(this.el).html(Ghost.Templates["t-edit-view"]());
		$('#markdown-text').trigger('keyup');
		return this;
    },
});

Ghost.Views._New = Backbone.View.extend({
	events: {
		'click #fullscreen': 'toggle_fullscreen'
	},
	initialize: function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy; 
		this.model = new Ghost.Models._Post({
			title: "",
			tags: [],
			date: today,
			view: 0,
			content: "", 
			published: false, 
			featured: false,
			active: true
		});
		Mousetrap.reset();
		Mousetrap.bind(['command+s', 'ctrl+s'], function(e) {
		    Ghost.Views.edit_edit.new();
		    Ghost.Collections.posts.trigger("update_posts");
			if($("#save") != null) {
				// !Debug
				$('#save').removeClass("icon-save");
				$('#save').addClass("icon-ok");
				var t = setTimeout(function(){
					$('#save').removeClass("icon-ok");
					$('#save').addClass("icon-save");
				}, 500);
				// !Debug
			}
		    return false;
		});
		Mousetrap.bind('esc', function(e) {
			var post = Ghost.Views.edit.model;
		    if(post.get("title") != $('#posts-title').val() || post.get("content") != $('#markdown-text').val() || post.get("tags").toString() != $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")) {
				if((function(){return prompt("You have edited this post. Type YES to close this post without saving.")}()+"--").toLowerCase() == "yes--") {
					Ghost.routers.navigate("!/", {trigger: true});
				}
			} else {
				Ghost.routers.navigate("!/", {trigger: true});
			}
		    return false;
		});
		Mousetrap.bind(['ctrl+esc', 'command+esc'], function(e) {
		    Ghost.Views.edit.toggle_fullscreen();
		});
	},
    render: function(){
		$(this.el).html(Ghost.Templates["t-edit"](this.model.toJSON()));
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
Ghost.Views._New_Edit = Backbone.View.extend({
	events: {
		"click .right i": "clicked"	},
	initialize: function(){
		Ghost.Views.edit.model.on('update_posts', this.render, this);
		setTimeout(function() {
			$('#markdown-text').focus();
			var text = $('#markdown-text').val()
			$('#markdown-text').val("");
			$('#markdown-text').val(text);
			var textarea = document.getElementById('markdown-text');
			textarea.scrollTop = textarea.scrollHeight;
		}, 0);
	},
    render: function(){
		var data = Ghost.Views.edit.model.toJSON();
		$(this.el).html(Ghost.Templates["t-edit-edit"](Ghost.Views.edit.model.toJSON()));

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
		var words = Ghost.Utils.censorship($('#markdown-text').val()).match(/\b[a-zA-Z0-9_,']+\b/g)
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
    	var post = Ghost.Views.edit.model;
		if(e.target.id        == "publish") {
			alert("Published");
			post.set({published: !(post.get("published"))});
			this.new();
			Ghost.Collections.posts.trigger("update_posts");
			Ghost.Views.edit_edit.render();
		} else if(e.target.id == "update") {
			this.new();
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
			this.new();
			Ghost.Collections.posts.trigger("update_posts");

			// !Debug
			$('#save').removeClass("icon-save");
			$('#save').addClass("icon-ok");
			var t = setTimeout(function(){
				$('#save').removeClass("icon-ok");
				$('#save').addClass("icon-save");
			}, 500);
			// !Debug
		} else if(e.target.id == "close") {
			if(Ghost.Views.edit.model.get("title") != $('#posts-title').val() || Ghost.Views.edit.model.get("content") != $('#markdown-text').val() || Ghost.Views.edit.model.get("tags").toString() != $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")) {
				if((function(){return prompt("You have edited this post. Type YES to close this post without saving.")}()+"--").toLowerCase() == "yes--") {
					Ghost.routers.navigate("!/", {trigger: true});
				}
			} else {
				Ghost.routers.navigate("!/", {trigger: true});
			}
    	}
    },
    new: function() {
    	var post = Ghost.Collections.posts.get(Ghost.Collections.posts.new());
    	post.set({
				title: $('#posts-title').val(),
				content: $('#markdown-text').val(),
				tags: $('#tags').val().replace(/[^a-z0-9\-]/gi, ',').replace( /,,+/g, ',' ).replace(/^,*/, '').replace(/,*$/, '').toLowerCase().split(",")
		});
		Ghost.routers.navigate("!/edit/" + post.id, {trigger: true});
    }
});