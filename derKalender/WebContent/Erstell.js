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

		objectStoreRequest = objectStore.get(Id);	//nehme Datensatz
		
		objectStoreRequest.onsuccess = function() {
			var data = objectStoreRequest.result;
			data.schluessel = Wert;	//ändere den Wert
			
			var updateTitleRequest = objectStore.put(data);	//trage Werte ein
			
			console.log("The transaction that originated this request is " + updateTitleRequest.transaction);
			updateTitleRequest.onsuccess = function() {
				alert("geändert");
			};
		};
	}
}

function erstellGruppe(){
	name= document.getElementById('name').value;
	
	Gruppe= []
	Mitglieder= document.getElementById('mitglieder').getElementsByTagName('li');
	for(x=0; x <Mitglieder.length; x++){
		Gruppe.push(Mitglieder[x].innerHTML);
	}
	
	einfügen("Gruppe",	{name: name, Mitglieder: Gruppe}); //Gruppe erstellen
	
//	var request = window.indexedDB.open("Accountdaten",1);
//	request.onerror = function(event) {	
//		console.log("error: ");
//		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
//	};
//	request.onsuccess = function(event){//id identifizieren
//		Db = request.result;	
//		objectStore = Db.transaction(["User"], "readwrite").objectStore("User");
//		
//		request.onsuccess = function(event) {
//			if (request.result){
//				//
//				id = objectStore.getKey( Schlüssel );
//			}
//		}
//	}
//	for(x=0; x <Gruppe.length; x++){
//		dbAendern('User', Gruppe[x], Gruppen, 'id')
//	}
}

function erstellTermin(){
	name= document.getElementById('terminname').value;
	
	aDatum= new Date( document.getElementById('Datum').value);
	//aDatum.setTime (document.getElementById('uhrzeit').time);
	
	eDatum= new Date(document.getElementById('EndDatum').value);
	//eTime= document.getElementById('Enduhrzeit').time;
	
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {	
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){//id identifizieren
		Db = request.result;	
		objectStore = Db.transaction(["aktuell"], "readwrite").objectStore("aktuell");
		request = objectStore.get(1)
		
		request.onsuccess = function(event) {
			if (request.result){
				user = request.result.user
				einfügen("Termin",	{name: name, username: user, start: aDatum, ende: eDatum });
				
				alert("Termin erfolgreich erstellt")
			}
		}
	}	
}


