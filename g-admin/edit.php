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
	<script type="text/javascript" src="js/lib/underscore.js"></script>
	<script type="text/javascript" src="js/lib/backbone.js"></script>
	<script type="text/javascript" src="js/lib/showdown.js"></script>
</head>
<body>
<nav id="adminbar">Hi der</nav>
<div id="post-title-holder" class="grid pad-nav">
	<input id="posts-title" class="col-1-1 post-title" value="{{title}}">
	<i class="icon-fullscreen"></i>
	<div id="posts-title-url" class="post-title-url">http://yoursite.com/<b id="post-url-path">post-name</b></div>
</div>
<section id="main-grid" class="the-grid edit">
	<div class="grid full-height pad-top">
		<div id="posts-edit" class="col-1-2 full-height post-edit">
			<div class="content full-height">
				<div class="left">
					<h1 class="cell-name">Markdown</h1>
				</div>
				<span class="right">
					<i id="help" class="icon-question-sign" title="Help"></i>
					<i id="publish" class="icon-eye-open" title="Save and Publish"></i>
					<i id="edit" class="icon-save" title="Save Draft"></i>
				</span>
				<textarea id="markdown-text" class="post-holder markdown" placeholder="Spill your thoughts here...">{{markdown}}</textarea>
			</div>
		</div>
		<div id="posts-view" class="col-1-2 full-height post-view">
			<div class="content full-height">
				<div class="left">
					<h1 class="cell-name">Preview</h1>
				</div>
				<div class="right">
					<h1 id="word-count" class="cell-name"></h1>
				</div>
				<article id="markdown-to-html" class="post-holder"></article>
			</div>
		</div>
	</div>
</section>
<script type="text/javascript" src="js/test.js"></script>
</body>
</html>