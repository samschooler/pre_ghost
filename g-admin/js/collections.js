Ghost.Collections._Posts = Backbone.Collection.extend({
	url: '/g-admin/recon/?posts',
	active: 0,
	the_id: 0,
	comparator: function(post) {
		return post.get("id");
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
	},
	serv_changed: function(id) {
		this.changed_ids.push(id);
		//Ghost.Collections.posts.models[id].save();
	},
	serv_sync: function() {
		// Sync all changes
	},
	serv_add: function(id) {
		//Add a model to the server
		var model = Ghost.Collections.posts.models[id];
	},
	serv_save: function(id) {
		// Save changes on a model to the server
		var model = Ghost.Collections.posts.models[id];
	},
	serv_delete: function(id) {
		// Delete a model from the server
		var model = Ghost.Collections.posts.models[id];
	}
});