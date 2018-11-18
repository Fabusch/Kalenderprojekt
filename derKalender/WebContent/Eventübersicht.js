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

 