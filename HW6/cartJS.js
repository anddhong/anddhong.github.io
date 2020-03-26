
window.onload = function(event) {
	updateCartSize()
	createTable()
	console.log(sessionStorage)
	
	items = JSON.parse(sessionStorage['items'])
	cart = document.getElementById('cart')
	for (var bun of Object.keys(items)) {
		console.log(bun)

		spaceIndex = bun.indexOf(' ')
		var name = bun.slice(0,spaceIndex)
		var frosting = bun.slice(spaceIndex+1)
		var quantity = items[bun]

		var row = cart.insertRow()
		var cleanBun = bun.replace(/ /g,'-')
		row.insertCell(0).innerHTML = quantity
		row.insertCell(1).innerHTML = name
		row.insertCell(2).innerHTML = frosting
		row.insertCell(3).innerHTML = '$3.00'
		var s = '<button class="delete" onclick=deleteItem(\"' + cleanBun + '\")>X</button>'
		console.log(s, typeof(s))

		row.insertCell(4).innerHTML = s.toString()
	}
}

function deleteItem(cleanBun) {
	bun = cleanBun.replace(/-/g,' ')
	var items = JSON.parse(sessionStorage.getItem('items'))
	var q = items[bun]
	var currentSize = sessionStorage.getItem('cartSize')
	sessionStorage.setItem('cartSize',currentSize-q)
	delete items[bun]
	sessionStorage.setItem('items', JSON.stringify(items))
	location.reload()
}

function createTable() {
	var cart = document.createElement("table")
	cart.id = 'cart'
	var headers = ['Quantity','Flavor','Icing','Price','Delete']
	// var row = document.createElement('tr')
	var row = cart.insertRow()

	headers.forEach(header => row.insertCell().innerHTML = header)

	cart.setAttribute('class','cart')

	var tablePlace = document.getElementById('tablePlace')
	tablePlace.appendChild(cart)
}

function updateCartSize() {
	var currentSize = sessionStorage.getItem('cartSize')
	if (currentSize===null) {
		sessionStorage.setItem('cartSize',0)
	}
	document.getElementById("badge").innerHTML = sessionStorage.getItem('cartSize')
}