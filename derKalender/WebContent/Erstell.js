einfügen("Termin",	{name: "Geburtstag", username: "Jan46z", start: new Date(2019, 1, 5, 8, 30), ende: new Date(2019, 1, 7, 9, 30) });	
einfügen("Gruppe",	{name: "AG", Mitglieder: ["Lili"]});

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
			//alert("Der "+store+" Datensatz wurde hinzugefügt.");
		};
		request.onerror = function(event) {
			//alert("Der "+store+" Datensatz wurde NICHT hinzugefügt.!!!!!!");
		}
	}
}