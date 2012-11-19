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
		
		Ghost.Collections.posts = new Ghost.Collections._Posts();

		var post = new Ghost.Models._Post({
			id: 2,
			title: "Two.post",
			tags: ["new", "hot", "sexy"],
			date: "12/3/96",
			view: 3123,
			content: "<i>Content</i> goes here for article 2.", 
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
			content: "Content goes here for article 1.", 
			published: false, 
			featured: false
		});
		Ghost.Collections.posts.add(post_one);


		Ghost.Views.posts =     new Ghost.Views._Posts().render();
		Ghost.Views.post_list = new Ghost.Views._Posts_List({el: '#posts-list'}).render();
		Ghost.Views.post_view = new Ghost.Views._Posts_View({el: '#posts-view'}).render();
	}
}