Ghost.Models._Post = Backbone.Model.extend({
	initialize: function() {
		this.set({id: Ghost.Collections.posts.the_id});
		Ghost.Collections.posts.the_id++;
	}
});