console.log('hellosa')





window.onload = function() {
	$('#btn').click(function() 
	{
	  console.log('clicked');
	  window.open("https://anddhong.github.io/chromeExt/expose.html");
	});
};

// document.addEventListener('DOMContentLoaded', function() {
//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() {
//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       var f = d.createElement('form');
//       f.action = 'file:///C:/Users/Andrew/Documents/chromeExt/article.html';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);

