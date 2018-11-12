var request = indexDB.open('Accountdaten',1);

request.onupgradeneeded=function() {
	console.log('Datenbank angelegt');
	
	var db=this.result;
	if(!db.objectStoreNames.contains('features')) {
		store=db.createObjectStore('feautures', {
			keypath:'key',
			autoIncrement:true });
		
			
		}
}
}

 