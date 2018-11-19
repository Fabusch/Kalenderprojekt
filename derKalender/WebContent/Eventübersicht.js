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
	  // Do something with request.errorCode!
	};
	request.onsuccess = function(event) {
	  // Do something with request.result!
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
		
		const customerData = [
			  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
			  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
			];
		
		const dbName = "the_name";

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
		};
		
		
		
		
		