//einfügen("Termin",	{name: "Geburtstag", username: "Jan46z", start: new Date(2019, 1, 5, 8, 30), ende: new Date(2019, 1, 7, 9, 30) });	
//einfügen("Gruppe",	{name: "AG", Mitglieder: ["lol"]});

function einfügen(store, Werte){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {	
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt.
		request = Db.transaction([store], "readwrite")
			.objectStore(store)
			.add(Werte);
		
		request.onsuccess = function(event) {
			alert("Der "+store+" Datensatz wurde hinzugefügt.");
		};
		request.onerror = function(event) {
			alert("Der "+store+" Datensatz wurde NICHT hinzugefügt.");
		}
	}
}

function dbAendern(store, Id, schluessel, Wert){	//schluessel bleib noch undefined
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};

	request.onsuccess = function(event){
		db = request.result;
		objectStore = db.transaction([store], "readwrite").objectStore(store);

		// Get the to-do list object that has this title as it's title
		objectStoreRequest = objectStore.get(Id);
		objectStoreRequest.onsuccess = function() {
			// Grab the data object returned as the result
			var data = objectStoreRequest.result;
			// Update the notified value in the object to "yes"
			data.schluessel = Wert;
			// Create another request that inserts the item back into the database
			var updateTitleRequest = objectStore.put(data);
			
			// Log the transaction that originated this request
			console.log("The transaction that originated this request is " + updateTitleRequest.transaction);
			// When this new request succeeds, run the displayData() function again to update the display
			updateTitleRequest.onsuccess = function() {
				displayData();
			};
		};
	}
}