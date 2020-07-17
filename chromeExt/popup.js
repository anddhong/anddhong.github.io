function openPage() {
	var newWindow = window.open("https://anddhong.github.io/chromeExt/expose.html");
	var url = window.location.href;
}

$(window).on('load', function() {
	$('#btn1').click(function () {openPage()});
 });
