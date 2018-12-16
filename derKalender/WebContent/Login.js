db()

function db(){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onupgradeneeded = function(event){
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("aktuell", {keyPath: "id"});
		ObjectStore.add({id:1, user:NaN, Gruppe: NaN });
		
		var Db = event.target.result;
		var ObjectStore = Db.createObjectStore("User", {keyPath: "username"});
		for (var u in User){
			ObjectStore.add(User[u]);
		}
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("Termin", {keyPath: "TID",autoIncrement: true});
		for (var t in Termine){
			ObjectStore.add(Termine[t]);
		}
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("Gruppe", {keyPath: "GID",autoIncrement: true});
		for (var g in Gruppen){
			ObjectStore.add(Gruppen[g]);        // Datenbank wird erstellt wenn diese noch nicht vorhanden ist
		}
	};
	request.onerror = function(event) {	
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};

	request.onsuccess = function(event){
		Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt.
		//alert("DB erstellt");
	}
}


const User =[	{ username: "Max75", name:"Maxi", nachname:'Fischer', Passwort:"fzrEm7dr", Gruppen: [1], Kinder:["Jan46z"]},
				{ username: "Jan46z", name:"Jan", nachname:'Lauch', Passwort:"jfgJ56gxk", Gruppen: [1, 2], Kinder:[]}
];
const Termine =[{ name: "geburtstag", username: "Jan46z", start: new Date(2018, 10, 12, 0, 0), ende: new Date("October 12, 2018 11:13:00")},
	{ name: "Weinachten", username: "Jan46z", start: new Date(2018, 11, 24, 5, 30), ende: new Date(2018, 11, 26, 8, 30)}
];
const Gruppen =[{ name:"Familie", Mitglieder: ["Max75", "Jan46z"] },
	{ name:"Feunde", Mitglieder: ["Jan46z"] }
];

function loggin(){
	if(validate()){	//überprüfe auf legale Eingaben
		username = document.getElementById("nickname").value;
		passwort = document.getElementById("passwort").value;
		
		request = window.indexedDB.open("Accountdaten",1);	//öffne indexedDB
		request.onerror = function(event) {
			console.log("error: ");
			alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
		};
		request.onupgradeneeded = function(event){		//ohne Datenbank auch nicht eingeloggt
			db();
		};
		request.onsuccess = function(event){
			Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt
		
			transaction = Db.transaction(["aktuell","User"], "readwrite");
			objectStore = transaction.objectStore("User");
			request = objectStore.get(username);	//rufe verlangten User auf
		
			request.onsuccess = function(event) {
				if (request.result){
					if(passwort == request.result.Passwort){	//Passwort vergleich
						//alert("erfolgreich eingelogt");
						store = transaction.objectStore("aktuell");
						request = store.put({id:1, user: username, Gruppe: NaN });	//Speicher aktuellen User  für spätere Aufrufe auf anderen Seiten
						request.onsuccess = function(event) {
							window.location.href = "Profilübersicht.html";}	//öffne Startseite
						request.onerror = function(event) {
							alert("Einloggen ist fehlgeschlagen");	//interner Fehler beim speicher des aktuellen User
						}
					}
					else
						alert("Benutzername oder Passwort ist falsch");	// Falsches Passwort
				}
				else
					alert("Benutzername oder Passwort ist falsch");	//kein User mit diesen username vorhanden
			}
			request.onerror = function(event) {	
				alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
			}
		}
	}
}
function validate(){
	form= document.getElementsByTagName("table")[0];
	fail = validateNickname(document.getElementById("nickname").value)
	fail += validatePasswort(document.getElementById("passwort").value)
	if (fail == "") {return true;}
	else{alert(fail); return false}
}

function registriert(){
	if(date()){
		vorname = document.getElementById("vorname").value
		nachname = document.getElementById("nachname").value
		nickname = document.getElementById("nickname").value 
		passwort = document.getElementById("passwort").value
		
		Datensatz={username:nickname, name:vorname, nachname:nachname, Passwort:passwort, Gruppen: [], Kinder:[]}
	
		var request = window.indexedDB.open("Accountdaten",1);	//öffne indexedDB
		request.onerror = function(event) {
			console.log("error: ");
			alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
		};
		
		request.onsuccess = function(event){
			Db = request.result;	// Wenn die Datenbank vorhanden ist wird das hinzugefügt
			transaction = Db.transaction(["aktuell","User"], "readwrite");
			request = transaction.objectStore("User").add(Datensatz);	//Fühge User hinzu
		
			request.onsuccess = function(event) {
				if (request.result){
					//alert("erfolgreich registriert");
					store = transaction.objectStore("aktuell");	//einlogen
					request = store.put({id:1, user: nickname, Gruppe: NaN });	//Speicher aktuellen User  für spätere Aufrufe auf anderen Seiten
					request.onsuccess = function(event) {
						eltern();
					}	
					request.onerror = function(event) {
						alert("einloggen ist fehlgeschlagen");	//interner Fehler beim speicher des aktuellen User
					}
				}
				else{
					alert("registrieren fehlgeschlagen");
				}
			}
			request.onerror = function(event) {	//Es ist bereits ein User mit diesen nickname vorhanden
				alert("Der Nickname "+nickname+" wird bereits als Benutzername verwendet");
			}
		}
	}
}
function eltern(){
	eltern = document.getElementById("eltern").value;
	if(eltern=="") {
		alert("keine Eltern");
		window.location.href = "Profilübersicht.html";}
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
			request = objectStore.get(eltern);	//Fühge User hinzu
			
			request.onsuccess = function(event) {
				if (request.result){
					user= request.result
					user.Kinder = user.Kinder.push(document.getElementById("nickname").value);
					
					updateRequest = objectStore.put(user);
					updateTitleRequest.onsuccess = function() {
						alert("das Kind "+document.getElementById("name").value+" wurfe hinzugefügt");
						window.location.href = "Profilübersicht.html";
					};
				}else{
					alert("Elternteil wurde nicht gefunden");
					window.location.href = "Profilübersicht.html";
				}
			}
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

		// Get the to-do list object that has this title as it's title
		objectStoreRequest = objectStore.get(Id);
		
		objectStoreRequest.onsuccess = function() {
			// Grab the data object returned as the result
			var data = objectStoreRequest.result;
			// Update the notified value in the object to "yes"
			data.schluessel = Wert;
			// Create another request that inserts the item back into the database
			var updateTitleRequest = objectStore.put(data);
			
			// Log the transaction that originated this request
			console.log("The transaction that originated this request is " + updateTitleRequest.transaction);
			// When this new request succeeds, run the displayData() function again to update the display
			updateTitleRequest.onsuccess = function() {
				displayData();
			};
		};
	}
}

function date(){
	fail  = validateVorname( document.getElementById("vorname").value )
	fail += validateNachname( document.getElementById("nachname").value )
	fail += validateNickname( document.getElementById("nickname").value )
	fail += validatePasswort( document.getElementById("passwort").value )
					
	if (fail == ""){
		return true
	}
	else{
		alert(fail); 
		return false
	}
}


function validateVorname(field){
	if (field =="") return "Es wurde kein Vorname eingegeben.\n"
	return""
}
function validateNachname(field){
	if (field =="") return "Es wurde kein Nachname eingegeben.\n"
	return""
}
function validateNickname(field){
	if (field == "") return "Es wurde kein Nickname eingegeben.\n"
	else if(field.length < 5)
		return "Der Nickname muss zwischen 5 und 15 Zeichen haben.\n"
	else if (/[^a-zA-Z0-9_-]/.test(field))
		return "Es dürfen nur die Zeichen a-z, A-Z, 0-9, - und _ verwendet werden.\n"
	return ""
}
function validatePasswort(field){
	if(field=="") return "Es wurde kein Passwort eingegeben.\n"
	else if(field.length < 5) 
		return "Das Passwort muss zwischen 5 und 15 Zeichen haben.\n"
	else if(!/[a-z]/.test(field) || !/[A-Z]/.test(field) || !/[0-9]/.test(field))
		return "Dass Passwort muss mindestens aus je einem Zeichen a-z, A-Z und 0-9 beinhalten.\n"
	return""
}	
