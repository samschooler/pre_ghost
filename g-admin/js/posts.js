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
		Handlebars.registerHelper('title', function(title) {
			if(title.toLowerCase() == "untitled")
				return "";
			else
				return title;
		});
		Handlebars.registerHelper('get_views', function(views) {
			if(views <= 0)
				return "No Views";
			else if(views == 1)
				return "1 view";
			else if(views >= 1000 && views <= 999999)
				return Math.floor(views / 1000 * 10)/10 + "k";
			else if(views >= 1000000 && views <= 999999999)
				return Math.floor(views / 1000000000 * 10)/10 + "mil.";
			else if(views >= 1000000000 && views <= 999999999999)
				return Math.floor(views / 1000000000 * 10)/10 + "bil.";
			else if(views >= 1000000000000 && views <= 999999999999999)
				return Math.floor(views / 1000000000000 * 10)/10 + "tril.";
			else if(views >= 1000000000000000)
				return "&infin;";
			else
				return views;
		});
		Handlebars.registerHelper('title_val', function(title) {
			if(title.toLowerCase() == "")
				return "Untitled";
			else
				return title;
		});
		Handlebars.registerHelper('is_active', function(id, options) {
			if(Ghost.Collections.posts.active == Ghost.Collections.posts.get_index(id)) {
		        return options.fn(this);
		    } else {
		        return options.inverse(this);
		    }
		});
	},
	init: function(){
		Ghost._loadTemplates();
		Ghost.converter = new Showdown.converter({ extensions: ['table', 'addghost'] });
		
		Ghost.Collections.posts = new Ghost.Collections._Posts();
		/*Ghost.Collections.posts.fetch({
			success: function(data){
				Ghost.Collections.posts.the_id = data.length; 
				Ghost.Collections.posts.trigger('update_posts');
			}});*/
		// !Debug
		var post = new Ghost.Models._Post({
			id: 324235,
			title: "Two.post",
			tags: ["cats", "puppies", "projects"],
			date: "12/3/1996",
			views: 1000000000000000,
			content: "The view of the Earth from the Moon fascinated me—a small disk, 240,000 miles away. It was hard to think that that little thing held so many problems, so many frustrations. Raging nationalistic interests, famines, wars, pestilence don't show from that distance.", 
			published: true, 
			featured: true
		});
		Ghost.Collections.posts.add(post);

		var post_one = new Ghost.Models._Post({
			id: 142432,
			title: "Zne.post",
			tags: ["projects", "cool", "awesome"],
			date: "12/3/1997",
			views: 4343,
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