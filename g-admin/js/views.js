Ghost.Views._Posts = Backbone.View.extend({
    render: function(){
		$(this.el).html(Ghost.Templates["t-posts"]());
		return this;
    }
});

Ghost.Views._Posts_List = Backbone.View.extend({
	events: {
		"click .post-meta": "clicked"
	},
	initialize: function(){
		Ghost.Collections.posts.on('update_posts', this.render, this);
		Ghost.Collections.posts.on('add', this.render, this);
		Ghost.Collections.posts.at(0).set({active: true});
	},
    render: function(){
		var data = Ghost.Collections.posts.toJSON();
		$(this.el).html(Ghost.Templates["t-posts-list"]({"posts": data}));

		return this;
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
		return this;
    },
    clicked: function(e) {
    	Ghost.Collections.posts.each(function(post){
    		if(post.get("active")) {
    			if(e.target.id == "publish") {
    					post.set({published: !(post.get("published"))});
    					Ghost.Collections.posts.trigger("update_posts");
    			} else if(e.target.id == "feature") {
    					post.set("featured", !(post.get("featured")));
    					Ghost.Collections.posts.trigger("update_posts");
    			} else if(e.target.id == "delete") {
    					alert("Delete");
    			} else if(e.target.id == "edit") {
    					Ghost.Utils.switch_to_edit_view();
    			}
    		}
    	});
    }
});


Ghost.Views._Edit = Backbone.View.extend({
    render: function(){
		$(this.el).html(Ghost.Templates["t-edit"](Ghost.Collections.posts.get(this.id).toJSON()));
		return this;
    }
});
Ghost.Views._Edit_Edit = Backbone.View.extend({
	initialize: function(){
		Ghost.Collections.posts.get(this.id).on('update_posts', this.render, this);
		_.bindAll(this, 'render', 'count_words', 'path_from_title');
	},
	remove: function(){
		Ghost.Collections.posts.get(this.id).off('update_posts', this.render, this);
	},
    render: function(){
		var data = Ghost.Collections.posts.get(this.id).toJSON();
		$(this.el).html(Ghost.Templates["t-edit-edit"](Ghost.Collections.posts.get(this.id).toJSON()));

		$('#markdown-text').on('keyup', function(e) {
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
		var words = $('#markdown-to-html').text().match(/\S+/g)
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
	}
});
Ghost.Views._Edit_View = Backbone.View.extend({
	render: function(){
		$(this.el).html(Ghost.Templates["t-edit-view"]());
		$('#markdown-text').trigger('keyup');
		return this;
    },
});