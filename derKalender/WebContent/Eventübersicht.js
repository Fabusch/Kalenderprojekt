var request = indexDB.open('Accountdaten',1);

request.onupgradeneeded=function() {
	console.log('Datenbank angelegt');
	
	var db=this.result;
	if(!db.objectStoreNames.contains('features')) {
		store=db.createObjectStore('feautures', {
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