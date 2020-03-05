

function openModal() {
	var modal = document.getElementById("modal")
	modal.style.display = "block";
}

function closeModal() {
	var modal = document.getElementById("modal")
	modal.style.display = "none"
}

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