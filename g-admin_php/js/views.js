Ghost.Views._Posts = Backbone.View.extend({
	el: 'body',
    render: function(){
		var data = Ghost.Collections.posts.toJSON();

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
    					alert("Edit");
    			}
    		}
    	});
    }
});