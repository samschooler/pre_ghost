Ghost.Collections._Posts = Backbone.Collection.extend({
	url: '/g-admin/recon/?posts',
	active: 0,
	the_id: 0,
	comparator: function(post) {
		return post.get("id");
	},
	set_active: function(index){
		this.active = index;
		this.trigger("update_posts");
	},
	get_active: function(){
		return this.active;
	},
	get_active_model: function(){
		return Ghost.Collections.posts.at(this.active);
	},
	get_index: function(id) {
		var i = 0, l = Ghost.Collections.posts.models.length;
		for (; i < l; i++) if (Ghost.Collections.posts.models[i].id == id) return i;
			return 0;
	},
	new: function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy; 
		var id = this.the_id;
		Ghost.Collections.posts.add(new Ghost.Models._Post({
			id: this.the_id,
			title: "",
			tags: [],
			date: today,
			views: 0,
			content: "", 
			published: false, 
			featured: false,
			active: true
		}));
		this.the_id++;
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