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
	get_active: function(){
		return this.where({active: true})[0].get("id");
	}
});