//einfügen("Termin",	{name: "Geburtstag", username: "Jan46z", start: new Date(2019, 1, 5, 8, 30), ende: new Date(2019, 1, 7, 9, 30) });	
//einfügen("Gruppe",	{name: "AG", Mitglieder: ["lol"]});

Profil()
function Profil(){
	request = window.indexedDB.open("Accountdaten",1);	//öffne indexedDB
	request.onerror = function(event) {
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt
	
		transaction = Db.transaction(["aktuell","User"], "readwrite");
		objectStore = transaction.objectStore("User");
		store = transaction.objectStore("aktuell");
		request = store.get(1);	//eingeloggten User
	
		request.onsuccess = function(event) {
			if (request.result){
				user = request.result.user;	//username des eingeloggten User
				document.getElementById('Mitglieder').getElementsByTagName('a')[0].innerHTML = user;	//trage Namen ein
			}
		}
		request.onerror = function(event) {	
			alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
		}
	}
}

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
//			alert("Der "+store+" Datensatz wurde hinzugefügt.");
		};
		request.onerror = function(event) {
			alert("Der "+store+" Datensatz wurde NICHT hinzugefügt.");
		}
	}
}

function dbAendern(Id, Wert){	
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};

	request.onsuccess = function(event){
		db = request.result;
		objectStore = db.transaction(['User'], "readwrite").objectStore('User');

		objectStoreRequest = objectStore.get(Id);	//nehme Datensatz
		
		objectStoreRequest.onsuccess = function() {
			var data = objectStoreRequest.result;
			gr = data.Gruppen;
			liste = [Wert]
			for(x in gr){
				liste.push(gr[x])
			}
			
			data.Gruppen = liste	//ändere den Wert
			updateTitleRequest = objectStore.put(data);	//trage Werte ein
			updateTitleRequest.onsuccess = function() {
//				alert("geändert");
			};
		};
	}
}

function erstellGruppe(){
	name= document.getElementById('name').value;
	
	Gruppe= []
	Mitglieder= document.getElementById('Mitglieder').getElementsByTagName('a');
	for(x=0; x <Mitglieder.length; x++){
		Gruppe.push(Mitglieder[x].innerHTML);
	}
	
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {	
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt.
		store = Db.transaction(["Gruppe"], "readwrite").objectStore("Gruppe")
		request = store.add({name: name, Mitglieder: Gruppe});
		
		request.onsuccess = function(event) {
			request = store.count();
			request.onsuccess = function() {
				id = request.result;
				for(x=0; x <Gruppe.length; x++){
					user= Gruppe[x]
					dbAendern(user, id)
				}
			}
		};
		request.onerror = function(event) {
			alert("Der "+"Gruppe"+" Datensatz wurde NICHT hinzugefügt.");
		}
	}
	
//	request.onsuccess = function(event){//id identifizieren
//		
//		Db = request.result;	
//		objectStore = Db.transaction(["User"], "readwrite").objectStore("User");
//		
//		request.onsuccess = function(event) {
//			for(x=0; x <Gruppe.length; x++){
//				dbAendern('User', Gruppe[x], Gruppen, GID)
//			}
//		}
//	}
}

function erstellTermin(){
	name= document.getElementById('terminname').value;
	
	aDatum= new Date( document.getElementById('Datum').value);
	aTime = ""+document.getElementById('uhrzeit').value
	aHour = parseInt(aTime[0]+aTime[1])
	aMin = parseInt(aTime[3]+aTime[4])
	aDatum.setHours(aHour)
	aDatum.setMinutes(aMin)
	
	eDatum= new Date(document.getElementById('EndDatum').value);
	eTime = ""+document.getElementById('Enduhrzeit').value
	eHour = parseInt(eTime[0]+eTime[1])
	eMin = parseInt(eTime[3]+eTime[4])
	eDatum.setHours(eHour)
	eDatum.setMinutes(eMin)
	
	
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {	
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		Db = request.result;	
		objectStore = Db.transaction(["aktuell"], "readwrite").objectStore("aktuell");
		request = objectStore.get(1)
		
		request.onsuccess = function(event) {
			if (request.result){
				user = request.result.user
				ID = einfügen("Termin",	{name: name, username: user, start: aDatum, ende: eDatum });
//				alert("Termin erfolgreich erstellt")
			}
		}
	}	
}

function logout(){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		db = request.result;
		objectStore = db.transaction(['aktuell'], "readwrite").objectStore('aktuell');
		objectStoreRequest = objectStore.put({"id":1,"user":NaN,"Gruppe":NaN});
		
		objectStoreRequest.onsuccess = function() {
			window.location.href='Login.html';
		};
	}
}
function link(element){
	element.style.color="#FFEB3B";
}
function linkout(element){
	element.style.color= "black";
}

//nav
function Gruppen(event) {
	var x = document.getElementById('a' +event.id);
	if (x.style.display === "none") {
		x.style.display = "block";

		addGruppen(x);
		event.innerHTML= "Gruppen verstecken v";
	} else {
		x.style.display = "none";
		event.innerHTML= "Gruppen Anzeigen >"
	}
}
function hide(event) {
	var x = document.getElementById('a'+event.id);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

function addGruppen(object){
	links = object.getElementsByTagName('a');
	if(links.length != 0){			//links löschen
			links[0].remove();
	}
	request = window.indexedDB.open("Accountdaten",1);	//öffne indexedDB
	request.onerror = function(event) {
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt
		
		transaction = Db.transaction(["aktuell","User", "Gruppe"], "readwrite");
		Users = transaction.objectStore("User");
		Gruppe = transaction.objectStore("Gruppe");
		store = transaction.objectStore("aktuell");
		request = store.get(1);	//eingeloggten User
	
		request.onsuccess = function(event) {
			if (request.result){
				request = Users.get(request.result.user);	//username des eingeloggten User
				request.onsuccess = function(event) {
					if (request.result){
						x = request.result.Gruppen
						for(i=0; i<x.length; i++){
							addGruppe(object, Gruppe,x[i]); //link erstellen und einfügen 
						}
					}else alert("fehler3");
				}
				request.onerror = function(event) {	
					alert("fehler2");
				}
			}else{alert("fehler1")}
		}
		request.onerror = function(event) {	
			alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
		}
	}
}
function addGruppe(object, Grupp, i){
	alert(i)
	request = Grupp.get(i);	//Gruppen Datensatz
	
	request.onsuccess = function(event) {
		name= request.result.name;	//Name der Gruppe
		
		LinkGruppe = document.createElement("a");
		LinkGruppe.innerHTML = name;
		LinkGruppe.addEventListener('click', function(){	Kalender(i);	});
		object.appendChild(LinkGruppe);
		
		br = document.createElement("br");
		object.appendChild(br);
	}
}

function Kalender(GID){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess = function(event){
		db = request.result;
		objectStore = db.transaction(['aktuell'], "readwrite").objectStore('aktuell');
		objectStoreRequest = objectStore.get(1);
		objectStoreRequest.onsuccess = function() {
			Datensatz = objectStoreRequest.result;
			Datensatz.Gruppe = GID;
			updateRequest = objectStore.put(Datensatz);
			
			updateRequest.onsuccess = function(event) {
				window.location.href = "Kalender.html";
			};
		};
	}
}
