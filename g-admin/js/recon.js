Ghost._Recon = Backbone.Model.extend({
	url: '/g-admin/recon/posts.php',
	changed_ids: [],
	initialize: function() {
		Ghost.Collections.posts.on('change:title', function(e) {
			Ghost.recon.add_changed(e.id);
		});
		Ghost.Collections.posts.on('change:tags', function(e) {
			Ghost.recon.add_changed(e.id);
		});
		Ghost.Collections.posts.on('change:date', function(e) {
			Ghost.recon.add_changed(e.id);
		});
		Ghost.Collections.posts.on('change:content', function(e) {
			Ghost.recon.add_changed(e.id);
		});
		Ghost.Collections.posts.on('change:published', function(e) {
			Ghost.recon.add_changed(e.id);
		});
		Ghost.Collections.posts.on('change:featured', function(e) {
			Ghost.recon.add_changed(e.id);
		});
		Ghost.Collections.posts.on('change:owner', function(e) {
			Ghost.recon.add_changed(e.id);
		});
	},
	add_changed: function(id) {
		this.changed_ids.push(id);
		alert(id);
		Ghost.Collections.posts.models[id].save();
	},
});