Ghost.converter = new Showdown.converter({ extensions: ['table', 'addghost'] });
var count_words = function() {
	var words = $('#markdown-to-html').text().match(/\S+/g)
	if(words == null) {
		return "No Words";
	}
	else if(words.length == 1) {
		return "1 Word";
	}
	else
	{
		return words.length + " Words";
	}
}
var path_from_title = function() {
	return $('#posts-title').val()
			.replace(/[^a-z0-9\-]/gi, '-')
			.replace( /--+/g, '-' )
			.replace(/^-*/, '')
			.replace(/-*$/, '')
			.toLowerCase() || "post_url_here";
}

if($('#posts-title').length > 0) {
	$('#post-url-path').html(path_from_title());
	$('#posts-title').on('keyup', function(e) {
		$('#post-url-path').html(path_from_title());
	});
}

Ghost.Utils.update_preview();
$('#word-count').html(count_words());
$('#markdown-text').on('keyup', function(e) {
	Ghost.Utils.update_preview();
	$('#word-count').html(count_words());
});
$('#markdown-text').on('click', function(e) {
	Ghost.Utils.update_preview();
	$('#word-count').html(count_words());
});