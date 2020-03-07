
// Opens popup box
function openModal() {
	var modal = document.getElementById("modal")
	modal.style.display = "block";
}

// Closes popup box
function closeModal() {
	var modal = document.getElementById("modal")
	modal.style.display = "none"
}

// Updates badge and exits modal app
function addToCart() {
	var modal = document.getElementById("modal")
	modal.style.display = "none"
	var badge = document.getElementById("badge")
	badge.innerHTML = parseInt(badge.innerHTML) + 1
}

// Clicking outside also closes mode
window.onclick = function(event) {
	var modal = document.getElementById("modal")
	if (event.target == modal) {
		modal.style.display = "none";
	}
}