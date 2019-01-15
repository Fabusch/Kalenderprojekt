function background(bild){
	switch(bild){
		case 1:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131014_133001.jpg')";
			break;
		case 2:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131015_104048.jpg')";
			break;
		case 3:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131018_121613.jpg')";
			break;
		case 4:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131018_123317.jpg')";
			break;
		case 5:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131019_054735.jpg')";
			break;
		case 6:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131019_061059.jpg')";
			break;
		case 7:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/10_Tansania_20131025_180933.jpg')";
			break;
		case 8:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150130_110901.jpg')";
			break;
		case 9:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150130_111014.jpg')";
			break;
		case 10:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150408_112423.jpg')";
			break;
		case 11:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150424_193728.jpg')";
			break;
		case 12:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150424_194602.jpg')";
			break;
		case 13:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_110726_Richtone(HDR).jpg')";
			break;
		case 14:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_112047_Richtone(HDR).jpg')";
			break;
		case 15:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150524_113024_Richtone(HDR).jpg')";
			break;
		case 16:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150615_120601.jpg')";
			break;
		case 17:
			document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150722_120621.jpg')";
			break;
	}
}

function init() {
	var buttonEins = document.getElementById('eins');
	buttonEins.addEventListener('click', fensterOeffnen);
}

function fensterOeffnen() {
	window.location.href='GruppenErstellung.html'
}
window.addEventListener('DOMContentLoaded', init);


function init1() {
	var buttonEins = document.getElementById('zwei');
	buttonEins.addEventListener('click', fensterOeffnen2);
}

function fensterOeffnen2() {
	window.location.href='TerminErstellung.html'
}
window.addEventListener('DOMContentLoaded', init1);

function link(element){
	element.style.color="#FFEB3B";
}
function linkout(element){
	element.style.color= "black";
}

//nav-teil
function Gruppen(event) {
	x = document.getElementById('a' +event.id);
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
			window.Nutzer = request.result.username;
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

function usertermine(){
	var request = window.indexedDB.open("Accountdaten",1);
	var termine = []
	//var teilnehmer = []
	request.onerror = function(event) {
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess= function(event){
		var db = event.target.result;
		var transaction = db.transaction(['Termin'], "readonly");
		var objectStore = transaction.objectStore('Termin');
	        objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if(cursor) {
					if(cursor.value.username == window.Nutzer)
					{	
						console.log(cursor.value.TID);
						termine.push(cursor.value);
					}
					cursor.continue();
				}
				else{
					console.log("hhha")
				    sorttermine(termine);
				}
		   };	
	};
}

function swap(array,j){
	var help1 = array[j];
	var help2 = array[j + 1];
	array[j] = help2;
	array[j + 1] = help1;
	return array;
}

function sorttermine(appointments){
	var tosort = appointments;
	//bubblesort for sorting ineffective but easy
	for (var i = 0; i < tosort.length; i++) {
		for(var j=0; j < tosort.length - 1; j++){
			if (tosort[j].start.getTime() <  tosort[j+1].start.getTime()){
				tosort = swap(tosort,j)
			}
		}
	}
	if(tosort.length<=3){
		profilkalender(tosort);
	}
	if(appointments.length>3){
		tosort = tosort.slice(tosort.length-3);
		profilkalender(tosort);
	}
}
function profilkalender(todisplay){
	var i = 0;
	todisplay.forEach(function(termin){
		var Kalender = document.getElementById("kalender").firstElementChild;
		var rows = Array.from(Kalender.rows);
		rows = rows.slice(1);
		var cells = Array.from(rows[i].cells);
		cells[0].innerHTML = termin.name;
		cells[1].innerHTML = termin.start.getDate()+'.'+(termin.start.getMonth()+1)+'.'+termin.start.getFullYear();
		var stundennull= ''
		var minutennull = ''
		if(termin.start.getHours()<10){
			stundennull = '0';
		}
		if(termin.start.getMinutes()<10){
			minutennull = '0';
		}
		cells[2].innerHTML = stundennull+termin.start.getHours()+':'+minutennull+termin.start.getMinutes()+' Uhr';
		i = i+1;
	})
}
