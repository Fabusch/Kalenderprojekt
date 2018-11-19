var request = indexDB.open('Accountdaten',1);		//DatenBamk = request

request.onupgradeneeded=function() {
	console.log('Datenbank angelegt');
	
	var db=this.result;
	if(!db.objectStoreNames.contains('features')) {		
		store=db.createObjectStore('feautures', {		//Tabelle = features
			keypath:'key',
			autoIncrement: true
		});
	}
};


request.onerror = function(event) {
	};
	request.onsuccess = function(event) {
	};
	
	var db;
	var request = indexedDB.open("Accountdaten");
	request.onerror = function(event) {
	  alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event) {
	  db = event.target.result;
	};
	
	db.onerror = function(event) {
		  // Dies dient zur Behandlung von allen Fehlern in der Datenbank!
		  alert("Fehler in der Datenbank behandeln: " + event.target.errorCode);
		};
		
		
		
		
		----------------------------------------------------------------------------------
		
		const Nutzerdaten = [
			  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
			  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
			];
		
		const dbName = "Accountdaten";

		var request = indexedDB.open(dbName, 2);

		request.onerror = function(event) {
		  
		};
		request.onupgradeneeded = function(event) {
		  var db = event.target.result;

		  
		  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" }); // Der Keypath macht das Objekt (die Person) einzigartig damit ist sie sofort zu identifizieren
		  // in meinem Beispiel ist dies die SSN (Sozialversicherungsnummer) 

		 
		  objectStore.createIndex("name", "name", { unique: false }); // Index Erstellen damit nicht 2x der gleiche Name vorhanden sein darf
		  objectStore.createIndex("email", "email", { unique: true }); // Um Nutzer anhand der Email zu identifizieren

		  objectStore.transaction.oncomplete = function(event) { // Dient dazu den ObjektStore erst fertig erstellen zu lassen bevor Daten aufgespielt werden
		    
		    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
		    customerData.forEach(function(customer) {
		      customerObjectStore.add(customer);
		    });
		  };
		  
		  
		  openReq.onblocked = function(event) {
			  // If some other tab is loaded with the database, then it needs to be closed
			  // before we can proceed.
			  alert("Please close all other tabs with this site open!");
			};
			  
			openReq.onupgradeneeded = function(event) {
			  // All other databases have been closed. Set everything up.
			  db.createObjectStore(/* ... */);
			  useDatabase(db);
			};
			  
			openReq.onsuccess = function(event) {
			  var db = event.target.result;
			  useDatabase(db);
			  return;
			};

			openReq.onblocked = function(event) {
				  // If some other tab is loaded with the database, then it needs to be closed
				  // before we can proceed.
				  alert("Please close all other tabs with this site open!");
				};
				  
				openReq.onupgradeneeded = function(event) {
				  // All other databases have been closed. Set everything up.
				  db.createObjectStore(/* ... */);
				  useDatabase(db);
				};
				  
				openReq.onsuccess = function(event) {
				  var db = event.target.result;
				  useDatabase(db);
				  return;
				};

				openReq.onblocked = function(event) {
					
					  alert("Schließen sie alle Tabs damit diese Seite richtig angezeigt werden kann");
					};
					  
					openReq.onupgradeneeded = function(event) {
					  db.createObjectStore(/* ... */);
					  useDatabase(db);
					};
					  
					openReq.onsuccess = function(event) {
					  var db = event.target.result;
					  useDatabase(db);
					  return;
					};
					
					function useDatabase(db) {
						  
						  db.onversionchange = function(event) {
						    db.close();
						    alert("Die Datenbank wurde aktualisiert bitte schließen sie das Fenster um die Änderungen wirksam zu machen");
						  };
		
		
		
		
		