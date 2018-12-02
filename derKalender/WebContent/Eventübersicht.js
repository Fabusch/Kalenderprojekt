function background(element){
	if(element.innerHTML=="1")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131014_133001.jpg')";
	else if(element.innerHTML=="2")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131015_104048.jpg')";
	else if(element.innerHTML=="3")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131018_121613.jpg')";
	else if(element.innerHTML=="4")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131018_123317.jpg')";
	else if(element.innerHTML=="5")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131019_054735.jpg')";
	else if(element.innerHTML=="6")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131019_061059.jpg')";
	else if(element.innerHTML=="7")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131025_180933.jpg')";
	else if(element.innerHTML=="8")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150130_110901.jpg')";
	else if(element.innerHTML=="9")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150130_111014.jpg')";
	else if(element.innerHTML=="10")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150408_112423.jpg')";
	else if(element.innerHTML=="11")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150424_193728.jpg')";
	else if(element.innerHTML=="12")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150424_194602.jpg')";
	else if(element.innerHTML=="13")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_110726_Richtone(HDR).jpg')";
	else if(element.innerHTML=="14")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_112047_Richtone(HDR).jpg')";
	else if(element.innerHTML=="15")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_113024_Richtone(HDR).jpg')";
	else if(element.innerHTML=="16")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150615_120601.jpg')";
	else if(element.innerHTML=="17")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150722_120621.jpg')";
}
//
//var request = indexDB.open('Accountdaten',1);		// DatenBank = request
//
//request.onupgradeneeded=function() {
//	console.log('Datenbank angelegt');
//	
//	var db=this.result;
//	if(!db.objectStoreNames.contains('features')) {		
//		store=db.createObjectStore('feautures', {		// Tabelle = features
//			keypath:'key',
//			autoIncrement: true
//		});
//	}
//};
//
//
//request.onerror = function(event) {
//};
//request.onsuccess = function(event) {
//};
//	
//var db;
//var request = indexedDB.open("Accountdaten");
//request.onerror = function(event) {
//	alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
//};
//request.onsuccess = function(event) {
//	db = event.target.result;
//};
//	
//db.onerror = function(event) {
//	// Dies dient zur Behandlung von allen Fehlern in der Datenbank!
//	alert("Fehler in der Datenbank behandeln: " + event.target.errorCode);
//};
//		
//const Nutzerdaten = [
//		{ ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//		{ ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
//	];
//	
//const dbName = "Accountdaten";
//
//var request = indexedDB.open(dbName, 2);
//
//request.onerror = function(event) {
//		  
//};
//request.onupgradeneeded = function(event) {
//	var db = event.target.result;
//  
//	var objectStore = db.createObjectStore("Accountdaten", { keyPath: "ssn" }); // Der Keypath macht das Objekt (die Person) einzigartig damit ist sie sofort zu identifizieren
//	// in meinem Beispiel ist dies die SSN (Sozialversicherungsnummer)
//	
//	objectStore.createIndex("name", "name", { unique: false }); // Index Erstellen damit nicht 2x der gleiche Name vorhanden sein darf
//	objectStore.createIndex("email", "email", { unique: true }); // Um Nutzer anhand der Email zu identifizieren
//
//	objectStore.transaction.oncomplete = function(event) { // Dient dazu den ObjektStore erst fertig erstellen zu lassen bevor Daten aufgespielt werden
//		    
//		var customerObjectStore = db.transaction("Accountdaten", "readwrite").objectStore("Accountdaten");
//		customerData.forEach(function(customer) {
//			customerObjectStore.add(customer);
//		});
//	};
//		  
//		  
//	openReq.onblocked = function(event) {
//		alert("Please close all other tabs with this site open!");
//	};
//			  
//	openReq.onupgradeneeded = function(event) {
//		db.createObjectStore(/* ... */);
//		useDatabase(db);
//	};
//			  
//	openReq.onsuccess = function(event) {
//		var db = event.target.result;
//		useDatabase(db);
//		return;
//	};
//
//	openReq.onblocked = function(event) {
//		alert("Schließen sie alle Seiten und aktualsieren sie die Geöffnete!");
//	};
//				  
//	openReq.onupgradeneeded = function(event) {
//		db.createObjectStore(/* ... */);
//		useDatabase(db);
//	};
//				  
//	openReq.onsuccess = function(event) {
//		var db = event.target.result;
//		useDatabase(db);
//		return;
//	};
//
//	openReq.onblocked = function(event) {		
//		alert("Schließen sie alle Tabs damit diese Seite richtig angezeigt werden kann");
//	};
//					  
//	openReq.onupgradeneeded = function(event) {
//		db.createObjectStore(/* ... */);
//		useDatabase(db);
//	};
//					  
//	openReq.onsuccess = function(event) {
//		var db = event.target.result;
//		useDatabase(db);
//		return;
//	};
//					
//	function useDatabase(db) {
//		db.onversionchange = function(event) {
//			db.close();
//			alert("Die Datenbank wurde aktualisiert bitte schließen sie das Fenster um die Änderungen wirksam zu machen");
//		}
//	};	
//};					  
//						  
//		// In der Datenbank Daten speichern
//		
//var transaction = db.transaction((["Accountdaten"]), "readwrite");  // Da eine Transaktion jetzt vorhanden ist müssen wir den Objektspeicher darauf auffrufen
//transaction.oncomplete = function(event) {
//	alert("Alles erledigt");
//};
//			
//transaction.onerror = function(event) { // Errorbehandlung
//};
//		
//var objectStore = transaction.objectStore("Accountdaten");
//customerData.forEach(function(customer) {
//	var request = objectStore.add(customer); // add. wenn sic noch kein Objekt mit demselben Schlüssen in der DB befindet falls doch put() verwenden.
//	request.onsuccess = function(event) {
//		// Ergebnis die Kunden SSN
//	};
//});
//				
//				
//		// In der Datenbank Daten löschen
//				
//var request = db.transaction(["Accountdaten"], "readwrite")
//      .objectStore("Accountdaten")
//      .delete("444-44-4444");
//request.onsuccess = function(event){};
//
//
//
//		// Daten aus der Datenbank aufrufen
//
//var transaction = db.transaction(["Accountdaten"]);
//var objectStore = transaction.objectStore("Accountdaten");
//var request = objectStore.get("444-44-4444");
//request.onerror = function(event) {
//  
//};
//request.onsuccess = function(event) {
//	alert("Name for SSN 444-44-4444 is " + request.result.name);
//};
//
//
//// ODER SO
//// db.transaction("customers").objectStore("customers").get("444-44-4444").onsuccess
//// = function(event) {
//  // alert("Name for SSN 444-44-4444 is " + event.target.result.name);
//// };
//
//
//// Eingetragene Informationen die in der Datenbank vorhanden sind zu ändern
//// funktioniert so.
//
//var objectStore = db.transaction(["Accountdaten"], "readwrite").objectStore("Accountdaten");
//var request = objectStore.get("444-44-4444");
//request.onerror = function(event) {
// 
//};
//request.onsuccess = function(event) {
//  
//	var data = event.target.result;
//  
//	data.age = 58;
//
//	var requestUpdate = objectStore.put(data);
//	requestUpdate.onerror = function(event) {
//	};
//	requestUpdate.onsuccess = function(event) {
//	};
//};