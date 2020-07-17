function openPage() {
	var newWindow = window.open("https://anddhong.github.io/chromeExt/expose.html");
	var url = window.location.href;
	newWindow.url = url;
}

$(window).on('load', function() {
	$('#btn1').click(function () {openPage()});
 });
