Ghost.Collections._Posts = Backbone.Collection.extend({
	comparator: function(post) {
		return post.get("id");
	},
	clear_active: function(){
		this.each(function(post) {
			post.set({active: false});
		});
	},
	set_active: function(pid){
		var post = this.get(pid);
		this.clear_active();
		post.set({active: true});
		this.trigger("update_posts");
	},
	set_active_at: function(id){
		var post = this.at(id);
		this.clear_active();
		post.set({active: true});
		this.trigger("update_posts");
	},
	get_active: function(){
		var active = this.where({active: true});
		if(active.length > 0)
			return active[0].get("id");
		else
			return false;
	}
});