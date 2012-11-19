<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

	<title>Ghost</title>

	<link rel="stylesheet" type="text/css" href="css/simplegrid.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.css">

	<link rel="stylesheet" type="text/css" href="css/style.css">

	<script type="text/javascript" src="js/lib/zepto.js"></script>
	<script type="text/javascript" src="js/lib/handlebars.js"></script>
	<script type="text/javascript" src="js/lib/showdown.js"></script>
	<script type="text/javascript" src="js/lib/underscore.js"></script>
	<script type="text/javascript" src="js/lib/backbone.js"></script>

	<script type="text/javascript" src="js/posts.js"></script>
	<script type="text/javascript" src="js/models.js"></script>
	<script type="text/javascript" src="js/collections.js"></script>
	<script type="text/javascript" src="js/views.js"></script>
	<script type="text/javascript" src="js/templates.js"></script>
	<script id="t-posts" type="text/x-handlebars-template">
		<nav id="adminbar">Hi der</nav>
		<section id="main-grid" class="the-grid full-height">
			<div class="grid full-height pad-nav">
				<div id="posts-list" class="col-1-2 post-list">
				</div>
				<div id="posts-view" class="col-1-2 post-view full-height">
				</div>
			</div>
		</section>
	</script>
	<script id="t-posts-list" type="text/x-handlebars-template">
		<div class="content">
			<div class="left">
				<h1 class="cell-name">Posts</h1>
			</div>
			<span class="right">
				<i class="icon-search" title="Search"></i>
			</span>
			<!--{{#posts}}-->
			<div class="{{#active}}active {{/active}}post-meta" id="post-{{id}}">
				<div  class="left">
					<h2 class="title">{{title}}</h2>
					<span class="tags">{{#tags}} {{.}}, {{/tags}}</span>
					<div class="status {{^published}}draft {{/published}}{{#published}}published {{/published}}{{#featured}}featured {{/featured}}"></div>
				</div>
				<div  class="right">
					<span class="date">{{date}}</span>
					<div class="views">{{views}}</div>
				</div>
				<div class="cl"></div>
			</div>
			<!--{{/posts}}-->
		</div>
	</script>
	<script id="t-posts-view" type="text/x-handlebars-template">
		<div class="content full-height {{#posts}}{{#active}}{{^published}}draft {{/published}}{{#published}}published {{/published}}{{#featured}}featured {{/featured}}{{/active}}{{/posts}}">
			<div class="left">
				<h1 class="cell-name"></h1>
			</div>
			<span class="right">
			{{#posts}}{{#active}}
				<i id="delete" class="icon-trash" title="Delete"></i>
				<i id="feature" class="icon-bolt" title="{{#featured}}Unfeature{{/featured}}{{^featured}}Feature{{/featured}}"></i>
				<i id="publish" class="icon-eye-{{#published}}close{{/published}}{{^published}}open{{/published}}" title="{{#published}}Unpublish{{/published}}{{^published}}Publish{{/published}}"></i>
				<i id="edit" class="icon-pencil" title="Edit"></i>
			{{/active}}{{/posts}}
			</span>
			<article class="post-holder">
			{{#posts}}
				{{#active}}
					{{content}}
				{{/active}}
			{{/posts}}
			</article>
		</div>
	</script>
</head>
<body>
<script type="text/javascript">if(!$)$=Zepto;$(Ghost.init);</script>
</body>
</html>