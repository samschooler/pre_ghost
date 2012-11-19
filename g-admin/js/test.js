var converter = new Showdown.converter();
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

$('#markdown-to-html').html(converter.makeHtml(document.getElementById("markdown-text").value));
$('#word-count').html(count_words());
$('#markdown-text').on('keyup', function(e) {
	$('#markdown-to-html').html(converter.makeHtml(document.getElementById("markdown-text").value));
	$('#word-count').html(count_words());
});