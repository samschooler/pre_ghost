Ghost.Collections._Posts = Backbone.Collection.extend({
	active: 0,
	the_id: 0,
	comparator: function(post) {
		return post.get("id");
	},
	clear_active: function(){
		
	},
	set_active: function(id){
		this.active = id;
		this.trigger("update_posts");
	},
	get_active: function(){
		return this.active;
	},
	new: function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy; 
		var id = this.the_id;
		this.clear_active();
		Ghost.Collections.posts.add(new Ghost.Models._Post({
			title: "Untitled",
			tags: [],
			date: today,
			view: 0,
			content: "", 
			published: false, 
			featured: false,
			active: true
		}));
		return id;
	}
});