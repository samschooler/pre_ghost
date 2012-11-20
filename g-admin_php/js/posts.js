var b;
var a;

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
	},
	init: function(){
		Ghost._loadTemplates();
		Ghost.converter = new Showdown.converter();
		
		Ghost.Collections.posts = new Ghost.Collections._Posts();

		var post = new Ghost.Models._Post({
			id: 2,
			title: "Two.post",
			tags: ["new", "hot", "sexy"],
			date: "12/3/96",
			view: 3123,
			content: "*Content* goes here for article 2.", 
			published: true, 
			featured: true
		});
		Ghost.Collections.posts.add(post);

		var post_one = new Ghost.Models._Post({
			id: 1,
			title: "One.post",
			tags: ["new", "hot", "sexy"],
			date: "12/3/96",
			view: 3123,
			content: "From this day forward, **Flight** Control will be known by two words: ‘Tough’ and ‘Competent.’ Tough means we are forever accountable for what we do or what we fail to do. We will never again compromise our responsibilities. Every time we walk into Mission Control we will know what we stand for. Competent means we will never take anything for granted. We will never be found short in our knowledge and in our skills. Mission Control will be perfect. When you leave this meeting today you will go to your office and the first thing you will do there is to write ‘Tough and Competent’ on your blackboards. It will never be erased. Each day when you enter the room these words will remind you of the price paid by Grissom, White, and Chaffee. These words are the price of admission to the ranks of Mission Control.", 
			published: false, 
			featured: false
		});
		Ghost.Collections.posts.add(post_one);


		Ghost.Views.posts =     new Ghost.Views._Posts().render();
		Ghost.Views.post_list = new Ghost.Views._Posts_List({el: '#posts-list'}).render();
		Ghost.Views.post_view = new Ghost.Views._Posts_View({el: '#posts-view'}).render();
		Ghost.Utils.update_preview();
	}
}