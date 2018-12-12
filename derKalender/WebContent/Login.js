db()

function db(){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onupgradeneeded = function(event){
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("aktuell", {keyPath: "id"});
		ObjectStore.add({id:"1", user:"NaN", Gruppe: "NaN" });
		
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
		alert("DB erstellt");
	}
}

function validate(form){
	fail = validateNickname(form.nickname.value)
	fail += validatePasswort(form.passwort.value)
	if (fail == "") {return true;}
	else{alert(fail); return false}
	
	function validateNickname(field){
		if (field == "") return "Es wurde kein Nickname eingegeben.\n"
		else if(field.length < 5)
			return "Der Nickname muss zwischen 5 und 15 Zeichen haben.\n"
		else if (/[^a-zA-Z0-9_-]/.test(field))
			return "Es dürfen nur die Zeichen a-z, A-Z, 0-9, - und _ verwendet werden.\n"
		return ""
	}
	
	function validatePasswort(field){
		if(field=="") 
			return "Es wurde kein Passwort eingegeben.\n"
		else if(field.length < 5) 
			return "Das Passwort muss zwischen 5 und 15 Zeichen haben.\n"
		else if(!/[a-z]/.test(field) || !/[A-Z]/.test(field) || !/[0-9]/.test(field))
			return "Dass Passwort muss mindestens aus je einem Zeichen a-z, A-Z und 0-9 beinhalten.\n"
		return""
	}
}

function init() {
	var buttonEins = document.getElementById('Registrierungsseite');
	buttonEins.addEventListener('click', fensterOeffnen)
}
function fensterOeffnen() {
	window.open('Registrierung.html');
}
window.addEventListener('DOMContentLoaded', init);


const User =[	{ username: "Max75", name:"Maxi", Passwort:"fzrEm7dr", Gruppen: ["1"]},
	{ username: "Jan46z", name:"Jan", Passwort:"jfgJ56gxk", Gruppen: ["1","2"]}
];
const Termine =[{ name: "Ostern", username: "Jan46z", start: new Date(2018, 10, 12, 0, 0), ende: new Date("October 12, 2018 11:13:00")},
	{ name: "Weinachten", username: "Jan46z", start: new Date(2018, 11, 24, 5, 30), ende: new Date(2018, 11, 26, 8, 30)}
];
const Gruppen =[{ name:"Familie", Mitglieder: ["Max75", "Jan46z"] },
	{ name:"Feunde", Mitglieder: ["Jan46z"] }
];

function check(){
//	if(valiadte()){
		login("Max75","fzrEm7dr");
//	}
}

function login(username, passwort){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onupgradeneeded = function(event){
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("aktuell", {keyPath: "id"});
		ObjectStore.add({id:"1", user:"NaN", Gruppe: "NaN" });
		
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
		alert("DB bereits erstellt");
		
		transaction = Db.transaction(["aktuell","User"]);
		store = transaction.objectStore("aktuell");
		objectStore = transaction.objectStore("User");
		//aktuell = store.get(1);		// der datensatz mit der entsprechenden GID
		request = objectStore.get(username);
		
		request.onsuccess = function(event) {
			if (request.result){
				if(passwort == request.result.Passwort){	//username der Gruppenmitglieder
					alert("erfolgreich eingelogt");
					//window.location.href='Eventübersicht.html'
				}
				else
					alert("Passwort ist falsch "+ passwort+" != "+ request.result.Passwort);
			}
		}
		request.onerror = function(event) {
			alert("username oder Passwort ist falsch");
		}
	}
}


