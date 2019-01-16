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
		var Db = event.target.result;
		var ObjectStore = Db.createObjectStore("Bild", {keyPath: "username"});
		for (var b in Bild){
			ObjectStore.add(Bild[b]);
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

const Bild = [ { username: "Jan46z", picture: "data:image/png;base64,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" }
			];
const User =[	{ username: "Max75", name:"Maxi", nachname:'Fischer', Passwort:"fzrEm7dr", Gruppen: [2], Kinder:["Jan46z"]},
				{ username: "Jan46z", name:"Jan", nachname:'Lauch', Passwort:"jfgJ56gxk", Gruppen: [1, 2, 3], Kinder:[]},
				{ username: "Freed", name:"Fred", nachname:'Lauch', Passwort:"aA1234", Gruppen: [1], Kinder:[]},
				{ username: "Annas", name:"Anna", nachname:'Lauch', Passwort:"aA1234", Gruppen: [1, 3], Kinder:[]},
				{ username: "Saras", name:"Sara", nachname:'Lauch', Passwort:"aA1234", Gruppen: [1], Kinder:[]},
				{ username: "Pudding", name:"Pudding", nachname:'Müller', Passwort:"aB1234", Gruppen: [2,3], Kinder:[]}
];
const Termine =[{ name: "Geburtstag", username: "Jan46z", start: new Date(2018, 9, 12, 0, 0), ende: new Date("October 12, 2018 11:13:00")},
				{ name: "Weinachten", username: "Jan46z", start: new Date(2018, 11, 24, 5, 30), ende: new Date(2018, 11, 26, 8, 30)}
];
const Gruppen =[{ name:"Familie", Mitglieder: ["Jan46z","Freed", "Annas", "Saras"] },
				{ name:"Feunde", Mitglieder: ["Max75", "Jan46z", "Pudding"] },
				{ name:"Klasse", Mitglieder: ["Jan46z","Annas","Pudding"] }
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
					
					gr = user.Kinder;
					liste = [document.getElementById("nickname").value]
					for(x in gr){
						liste.push(gr[x])
					}
					
					data.Gruppen = liste	//ändere den Wert
					updateTitleRequest = objectStore.put(data);	//trage Werte ein
					updateTitleRequest.onsuccess = function() {
//						alert("geändert");
						window.location.href='Profilübersicht.html';
					};
					
					updateRequest = objectStore.put(user);
					updateRequest.onsuccess = function() {
//						alert("Als Kind hinzugefügt");
						window.location.href = "Profilübersicht.html";
					};
				}else{
					alert("Elternteil wurde nicht gefunden");
					window.location.href = "Profilübersicht.html";
				}
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
//					alert("geändert");
					window.location.href='Profilübersicht.html';
				};
			};
		}
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