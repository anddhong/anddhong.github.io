console.log('hello')
$(window).on('load', function() {
	console.log('hellos')
	// var url = window.opener.url;
	console.log(url, this.url, window.url)
 });
