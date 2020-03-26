
// Opens popup box
function openModal(flavor) {
	var modal = document.getElementById("modal")
	modal.style.display = "block";
	sessionStorage.setItem("flavor", flavor)
}

// Closes popup box
function closeModal() {
	var modal = document.getElementById("modal")
	modal.style.display = "none"
}

// Updates badge and exits modal app
function addToCart() {
	document.getElementById("modal").style.display = "none"
	var items = sessionStorage.getItem('items')
	if (items===null) {
		items = {}
	} else {
		items = JSON.parse(items)
	}
	var name = sessionStorage.getItem('flavor')
	var quantity = document.getElementById("quantity")
	quantity = quantity.options[quantity.selectedIndex].value
	var icing = document.getElementById("icing")

	var bun = name + ' ' + icing.options[icing.selectedIndex].text

	var currentNum = 0
	if (items[bun]!=null) {
		currentNum = items[bun]
	}
	items[bun] = parseInt(quantity) + parseInt(currentNum)
	sessionStorage.setItem('items',JSON.stringify(items))

	sessionStorage.setItem('cartSize', parseInt(sessionStorage.getItem('cartSize')) + parseInt(quantity))
	updateCartSize()
	console.log(sessionStorage)
}

window.onload = function() {
	updateCartSize()
}

function updateCartSize() {
	var currentSize = sessionStorage.getItem('cartSize')
	if (currentSize===null) {
		sessionStorage.setItem('cartSize',0)
	}
	document.getElementById("badge").innerHTML = sessionStorage.getItem('cartSize')
}

// Clicking outside also closes mode
window.onclick = function(event) {
	var modal = document.getElementById("modal")
	if (event.target == modal) {
		modal.style.display = "none";
	}
}