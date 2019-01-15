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
	if( !validateName(name) )
		alert("Es wurde kein Name eingegeben.")
	else if( !istGruppe())
		alert("Alleine bist du keine Gruppe")
	else{
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
					alert("Gruppe "+name+" wurde erstellt");
				}
			};
			request.onerror = function(event) {
				alert("Der "+"Gruppe"+" Datensatz wurde NICHT hinzugefügt.");
			}
		}
	}
}
function erstellTermin(){
	name= document.getElementById('terminname').value;
	if(validateName(name)){	// der Termin muss einen Namen
		Gruppe= []
		Mitglieder= document.getElementById('Mitglieder').getElementsByTagName('a');	//Teilnehmer
		for(x=0; x <Mitglieder.length; x++){
			Gruppe.push(Mitglieder[x].innerHTML);
		}
	
		aDatum= new Date( document.getElementById('Datum').value);
		aTime = ""+document.getElementById('uhrzeit').value
		eDatum= new Date(document.getElementById('EndDatum').value);
		eTime = ""+document.getElementById('Enduhrzeit').value
	
		aHour = parseInt(aTime[0]+aTime[1])	 // Zeitpunkt Start
		aMin = parseInt(aTime[3]+aTime[4])
		aDatum.setHours(aHour)
		aDatum.setMinutes(aMin)
	
		eHour = parseInt(eTime[0]+eTime[1])	// Zeitpunkt Ende
		eMin = parseInt(eTime[3]+eTime[4])
		eDatum.setHours(eHour)
		eDatum.setMinutes(eMin)
	
		if( !(""+aDatum =="Invalid Date" && ""+eDatum =="Invalid Date")){
			for(x in Gruppe){
				user=Gruppe[x]
				ID = einfügen("Termin",	{name: name, username: user, start: aDatum, ende: eDatum });
//				alert("Termin erfolgreich erstellt")
			}
		}
		else
			alert ("Bitte trage Datum und Uhrzeit beim Start und End Zeitpunkt ein")
	}else
		alert ("Es wurde kein Name eingegeben.")
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
	brs = object.getElementsByTagName('br');		
	do{				//links löschen
		links[0].remove();
		brs[0].remove();
	}while(0 != links.length);
	
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
	//alert(i)
	var request = Grupp.get(i);	//Gruppen Datensatz
	
	request.onsuccess = function(event) {
		name= request.result.name;	//Name der Gruppe
		
		LinkGruppe = document.createElement("a");
		LinkGruppe.innerHTML = name;
		
		LinkGruppe.addEventListener('click', function(){	Kalender(i);	});
		LinkGruppe.addEventListener('mouseover', function(){	link(this);	});
		LinkGruppe.addEventListener('mouseout', function(){	linkout(this);	});
		
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

function Person(){
	object = document.getElementById("Person");
	name = object.value;
	
	if(name=="") return;
	else{
		var request = window.indexedDB.open("Accountdaten",1);	//öffne indexedDB
		request.onerror = function(event) {
			console.log("error: ");
			alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
		};
		request.onsuccess = function(event){
			Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt
			transaction = Db.transaction(["User"], "readwrite");
			objectStore = transaction.objectStore("User")
			request = objectStore.get(name);	//Fühge User hinzu
			
			request.onsuccess = function(event) {
				if (request.result){
					liste = document.getElementById("Mitglieder");
					LinkGruppe = document.createElement("a");
					
					User =[] 
					Mitglieder= document.getElementById('Mitglieder').getElementsByTagName('a');
					for(x=0; x <Mitglieder.length; x++){
						User.push(Mitglieder[x].innerHTML);
					}
					if( User.indexOf(name) < 0){
						LinkGruppe.innerHTML = name
						liste.appendChild(LinkGruppe);
						
						br = document.createElement("br");
						liste.appendChild(br);
					}
				}
				else
					alert(name +" ist nicht der Bernutzername einer unserer User")
			}
		}
	}	
}


function validateName(field){
	if (field =="") return false
	return true
}
function istGruppe(){
	if ( document.getElementById("Mitglieder").getElementsByTagName("a").length == 1)
		return false 
	return true
}


