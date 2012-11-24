var Ghost = {
	Models:      {},
	Templates:   {},
	Collections: {},
	Views:       {},
	Utils:       {},

	_loadTemplates: function () {
		$('script[type="text/x-handlebars-template"]').each(function () {
			Ghost.Templates[this.id] = Handlebars.compile(this.innerHTML);
		});
		Handlebars.registerHelper('parse_tags', function(tags) {
			var p_tags = tags[0];
			for (var i = 1; i < tags.length; i++) {
				var p_tags = p_tags + ", " + tags[i];
			};
			return p_tags;
		});
		Handlebars.registerHelper('is_active', function(id, options) {
			if(Ghost.Collections.posts.active == id) {
		        return options.fn(this);
		    } else {
		        return options.inverse(this);
		    }
		});
	},
	init: function(){
		Ghost._loadTemplates();
		Ghost.converter = new Showdown.converter({ extensions: ['table'] });
		
		Ghost.Collections.posts = new Ghost.Collections._Posts();
		Ghost.Collections.posts.fetch({
			success: function(data){
				Ghost.Collections.posts.the_id = data.length; 
				Ghost.Collections.posts.trigger('update_posts');
			}});
		// !Debug

		// !Debug

		Ghost.routers = new Ghost._Routers;

		Ghost.recon = new Ghost._Recon();

		Backbone.history.start();
	}
}