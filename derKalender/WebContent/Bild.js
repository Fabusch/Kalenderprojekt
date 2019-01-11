var Nutzer;
var GID;
const Bild =[	{ username: "Max75", picture: ""}
			];

function loadall(){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {		//Falls fehler auftretten
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onupgradeneeded = function(event){		//ohne Datenbank auch nicht eingeloggt
		window.indexedDB.deleteDatabase('Accountdaten');
		window.location.href = "Login.html";
	};
	request.onsuccess = function(event){
		Db = request.result;
		transaction = Db.transaction(["aktuell"]);
		ObjectStore = transaction.objectStore("aktuell");
		
		request = ObjectStore.get(1);
		request.onerror = function(event) {		//Falls fehler auftretten
			window.indexedDB.deleteDatabase('Accountdaten');
			window.location.href = "Login.html";
		};
		request.onsuccess = function(event) {
			if (request.result){
				window.Nutzer = request.result.user;	//dieser User hat den Kalender aufgerfen
				GID = request.result.Gruppe; //diese Gruppe soll angezeigt werden
				if(""+Nutzer=="NaN") {
					//alert("Biite erst einloggen");
					window.location.href = "Login.html"
				}
				else if(""+GID=="NaN") {
					GID=0
				}
				loadpicture();
			}else{

			};
		}
	}
}
function picture(){
	 getpicture();
	
}
function loadpicture(){
	// Create/open database
	var request = indexedDB.open("Accountdaten", 1)
	request.onsuccess = function(event){
		db = event.target.result;
		var transaction = db.transaction(["Bild"], "readwrite");
		var objectStore = transaction.objectStore("Bild");

		var request = objectStore.get(window.Nutzer);
		request.onsuccess = function (event) {
			var imgFile = request.result.picture;
			document.getElementById("profilbild").src = imgFile
		};
	}
}
function getpicture(){
	var file = document.getElementById('input').files[0];
	var reader  = new FileReader();
	var obj;
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
        var image = document.createElement("img");
        // the result image data
		image.src = e.target.result;
		obj = image.src;
		addpicture(obj);
		document.getElementById("profilbild").src = image.src;
     }
     // you have to declare the file loading
	 reader.readAsDataURL(file);
}

function addpicture(obj) {
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
 	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // Create/open database
	var request = indexedDB.open("Accountdaten", 1);
	request.onsuccess = function(event){
		// Open a transaction to the database
		var db = event.target.result;
		var transaction = db.transaction(["Bild"], "readwrite");
		// Put the blob into the dabase
		var request = transaction.objectStore("Bild").delete(window.Nutzer);
		var request =transaction.objectStore("Bild").add({username: window.Nutzer, picture: obj});
		request.onerror = function(event){
			alert("Picture could not be added");
		}
		request.onsuccess = function(event){
			loadpicture();
		}		// Retrieve the file that was just stored
	}
}