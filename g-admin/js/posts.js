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
		/*Ghost.Collections.posts.fetch({
			success: function(data){
				Ghost.Collections.posts.the_id = data.length; 
				Ghost.Collections.posts.trigger('update_posts');
			}});*/
		// !Debug
		var post = new Ghost.Models._Post({
			title: "Two.post",
			tags: ["new", "hot", "sexy"],
			date: "12/3/1996",
			view: 3123,
			content: "The view of the Earth from the Moon fascinated me—a small disk, 240,000 miles away. It was hard to think that that little thing held so many problems, so many frustrations. Raging nationalistic interests, famines, wars, pestilence don't show from that distance.", 
			published: true, 
			featured: true
		});
		Ghost.Collections.posts.add(post);

		var post_one = new Ghost.Models._Post({
			title: "One.post",
			tags: ["new", "hot", "sexy"],
			date: "12/3/1996",
			view: 3123,
			content: "From this day forward, **Flight** Control will be known by two words: ‘Tough’ and ‘Competent.’ Tough means we are forever accountable for what we do or what we fail to do. We will never again compromise our responsibilities. Every time we walk into Mission Control we will know what we stand for. Competent means we will never take anything for granted. We will never be found short in our knowledge and in our skills. Mission Control will be perfect. When you leave this meeting today you will go to your office and the first thing you will do there is to write ‘Tough and Competent’ on your blackboards. It will never be erased. Each day when you enter the room these words will remind you of the price paid by Grissom, White, and Chaffee. These words are the price of admission to the ranks of Mission Control.", 
			published: false, 
			featured: false
		});
		Ghost.Collections.posts.add(post_one);
		// !Debug

		Ghost.routers = new Ghost._Routers;

		Ghost.recon = new Ghost._Recon();

		Backbone.history.start();
	}
}