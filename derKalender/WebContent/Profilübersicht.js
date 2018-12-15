function background(element){
	if(element.innerHTML=="1")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131014_133001.jpg')";
	else if(element.innerHTML=="2")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131015_104048.jpg')";
	else if(element.innerHTML=="3")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131018_121613.jpg')";
	else if(element.innerHTML=="4")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131018_123317.jpg')";
	else if(element.innerHTML=="5")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131019_054735.jpg')";
	else if(element.innerHTML=="6")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131019_061059.jpg')";
	else if(element.innerHTML=="7")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131025_180933.jpg')";
	else if(element.innerHTML=="8")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150130_110901.jpg')";
	else if(element.innerHTML=="9")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150130_111014.jpg')";
	else if(element.innerHTML=="10")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150408_112423.jpg')";
	else if(element.innerHTML=="11")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150424_193728.jpg')";
	else if(element.innerHTML=="12")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150424_194602.jpg')";
	else if(element.innerHTML=="13")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_110726_Richtone(HDR).jpg')";
	else if(element.innerHTML=="14")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_112047_Richtone(HDR).jpg')";
	else if(element.innerHTML=="15")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_113024_Richtone(HDR).jpg')";
	else if(element.innerHTML=="16")
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150615_120601.jpg')";
	else if(element.innerHTML=="17")
document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150722_120621.jpg')";}

function init() {
	var buttonEins = document.getElementById('eins');
	buttonEins.addEventListener('click', fensterOeffnen);
}

function fensterOeffnen() {
	window.open('GruppenErstellung.html');
}
window.addEventListener('DOMContentLoaded', init);


function init1() {
	var buttonEins = document.getElementById('zwei');
	buttonEins.addEventListener('click', fensterOeffnen2);
}

function fensterOeffnen2() {
	window.open('TerminErstellung.html');
}
window.addEventListener('DOMContentLoaded', init1);

function link(element){
	element.style.color="#FFEB3B";
}
function linkout(element){
	element.style.color="#b05bff";
}

//nav-teil
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
		LinkGruppe.id = i
		LinkGruppe.addEventListener('click', function(){	Kalender(this.id);	});
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

Profil()
//addGruppen()
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
				request = objectStore.get(request.result.user);	//username des eingeloggten User
				request.onsuccess = function(event) {
					if (request.result){
						document.getElementById('vorname').innerHTML = request.result.name;	//trage Namen ein
						document.getElementById('nachname').innerHTML = request.result.nachname;
					}
				}
			}
		}
		request.onerror = function(event) {	
			alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
		}
	}
}
