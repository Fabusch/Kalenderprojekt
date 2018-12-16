

const User =[	{ username: "Max75", name:"Maxi", nachname:'Fischer', Passwort:"fzrEm7dr", Gruppen: [1]},
				{ username: "Jan46z", name:"Jan", nachname:'Lauch', Passwort:"jfgJ56gxk", Gruppen: [1, 2]}
			];
const Termine =[{ name: "Ostern", username: "Jan46z", start: new Date(2018, 10, 12, 0, 0), ende: new Date("October 12, 2018 11:13:00")},
				{ name: "Weinachten", username: "Jan46z", start: new Date(2018, 11, 24, 5, 30), ende: new Date(2018, 11, 26, 8, 30)}
			];
const Gruppen =[{ name:"Familie", Mitglieder: ["Max75", "Jan46z"] },
				{ name:"Feunde", Mitglieder: ["Jan46z"] }
			];

//einfügen("User",	{username: "Lili", name:"lili", Passwort:"123456", Gruppen: [3]});
//einfügen("Termin",	{name: "Geburtstag", username: "Jan46z", start: new Date(2019, 1, 5, 8, 30), ende: new Date(2019, 1, 7, 9, 30) });	
//einfügen("Gruppe",	{name: "AG", Mitglieder: ["Lili"]});

function einfügen(store, Werte){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onupgradeneeded = function(event){
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("aktuell", {keyPath: "id"});
		ObjectStore.add({id:1, user:"Jan46z", Gruppe: 1 });
		
		var Db = event.target.result;
		ObjectStore = Db.createObjectStore("User", {keyPath: "username"});
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
		request = Db.transaction([store], "readwrite")
			.objectStore(store)
			.add(Werte);
		
		request.onsuccess = function(event) {
			//alert("Der "+store+" Datensatz wurde hinzugefügt.");
		};
		request.onerror = function(event) {
			//alert("Der "+store+" Datensatz wurde NICHT hinzugefügt.!!!!!!");
		}
	}
}


var GID;	//diese Gruppe soll angezeigt werden
var Nutzer; //dieser User hat den Kalender aufgerfen


function aktuell(){
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
				Nutzer = request.result.user;	//dieser User hat den Kalender aufgerfen
				GID = request.result.Gruppe; //diese Gruppe soll angezeigt werden
				if(""+Nutzer=="NaN") {
					//alert("Biite erst einloggen");
					window.location.href = "Login.html"
				}
				else if(""+GID=="NaN") {
					//alert("Es wurde kein Kalender ausgewählt");
					window.location.href = "Profilübersicht.html";
				}
				else { //Kalenderr erstellen, nur wenn Nutzer und GID gesetzt sind
					GruppeKalender()
					//navKalender(Nutzer)
				}
			}else{
				alter("Fehler: Datensatz nicht gefunden");
			};
		}
	}
}

function GruppeKalender(){
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {		//Falls fehler auftretten
		console.log("error: ");
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onupgradeneeded = function(event){		//ohne Datenbank auch nicht eingeloggt
		window.location.href = "Login.html";
	};
	request.onsuccess = function(event){
		Db = request.result;
		transaction = Db.transaction(["Gruppe","User"]);
		objectStore = transaction.objectStore("User");
		store = transaction.objectStore("Gruppe");
		if(GID != 0){
			request = store.get(GID);		// der datensatz mit der entsprechenden GID
			request.onerror = function(event) {
				alert("Bitte erst einloggen");
				window.location.href = "Eventübersicht.html";
			}
			request.onsuccess = function(event) {
				if (request.result){
					Gruppenmitglieder = request.result.Mitglieder;	//username der Gruppenmitglieder
					
					Kalender();
					if(ansicht == 2){
						tabelle = document.getElementById('kalender').getElementsByTagName('table')[0];
						
						for (var p=0; p<Gruppenmitglieder.length;p++) {		//Eine Spallte für jedes Gruppenmitglied
							eintragMitglieder(objectStore,p);
							request = objectStore.get(Gruppenmitglieder[p]);
						}
					}
				}else{
					alert("Fehler: Datensatz nicht gefunden");
					Kalender();
					if(ansicht == 2){
						tabelle = document.getElementById('kalender').getElementsByTagName('table')[0];
						
						for (var p=0; p<Gruppenmitglieder.length;p++) {		//Eine Spallte für jedes Gruppenmitglied
							eintragMitglieder(objectStore,p);
							request = objectStore.get(Gruppenmitglieder[p]);
						}
					}
				};
			}
		}
		else{	//GID = 0 nur bei privaten Kalender
			Gruppenmitglieder = [Nutzer];
			Kalender();
			if(ansicht == 2){
				tabelle = document.getElementById('kalender').getElementsByTagName('table')[0];
				
				for (var p=0; p<Gruppenmitglieder.length;p++) {		//Eine Spallte für jedes Gruppenmitglied
					eintragMitglieder(objectStore,p);
					request = objectStore.get(Gruppenmitglieder[p]);
				}
			}
		}
	}
}
function eintragMitglieder(objectStore, p){
	var request = objectStore.get(Gruppenmitglieder[p]);
	request.onsuccess = function(event) {
		if (request.result){		//Gruppenmitglieder werden mit ihren namen(Vorname) in die Tabelle eingetragen
			tabelle = document.getElementById('kalender').getElementsByTagName('table')[0];
			tabelle.rows[0].cells[2+p].innerHTML = request.result.name;
		}else{
			alter("Fehler: Datensatz nicht gefunden");
		};
	};
}


var tag = new Date();	//angezeigtes Datum			
var ansicht = 2;
			
Monatsname = new Array("Januar", "Februar", "März", "April", "Mai", "Juni","Juli", "August", "September", "Oktober", "November", "Dezember");
Wochentag = new Array("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");
Gruppenmitglieder =[];

function hide(event) {
	var x = document.getElementById('a'+event.id);
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}
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
		document.getElementById('kalender').style.backgroundImage = "url('img/Natur/20150722_120621.jpg')";
}
function Monatsende(aDate){
	var Monat = aDate.getMonth() + 1;
	var Jahr = aDate.getYear() + 1900;
	var Monatsende = 31;
	if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11) --Monatsende; // April(4), Juni(6), September(9), November(11) 30 Tage
	if (Monat == 2) {	//Februar(2)
		Monatsende = Monatsende - 3;
		if (Jahr % 4 == 0) Monatsende++;		//Schaltjahren
		if (Jahr % 100 == 0) Monatsende--;
		if (Jahr % 400 == 0) Monatsende++;
	}
	return Monatsende;
}
function setAnsicht(sicht){
	ansicht = sicht;
	GruppeKalender();
}
function setGruppe(ID){
	GID = ID;
	GruppeKalender();
}

function wechsel(vor){
	switch (ansicht){
		case 1:
			Wochen_wechsel(vor);
			break;
		case 2:
			Monats_wechsel(vor);
			break;
		case 3:
			Jahres_wechsel(vor);
			break;
	}
	GruppeKalender();
}
function Jahres_wechsel(vor){
	if(vor){
		tag.setDate(1);
		tag.setMonth(1);
		tag.setYear(tag.getYear()+1901)
	}
	else{
		tag.setDate(1);
		tag.setMonth(1);
		tag.setYear(tag.getYear()+1900-1)
	}
}
function Monats_wechsel(vor){
	if(vor){
		tag.setDate(1);
		tag.setMonth(tag.getMonth() + 1);
	}
	else{
		tag.setDate(1);
		tag.setMonth(tag.getMonth() - 1);
	}
}			
function Wochen_wechsel(vor){
	if(vor)
		tag.setDate(tag.getDate() + 7);
	else
		tag.setDate(tag.getDate() - 7);
}

function click_wechsel(sicht, datum){
	ansicht = sicht;
	if(datum[2]=='.'){
		var d = datum[0]+datum[1];
		if(datum[5]=='.'){
			var m = datum[3]+datum[4];
			var y = datum[6]+datum[7]+datum[8]+datum[9];
		}
		else{
			m = datum[3];
			y = datum[5]+datum[6]+datum[7]+datum[8];
		}
	}
	else{
		d = datum[0];
		if(datum[4]=='.'){
			m = datum[2]+datum[3];
			y = datum[5]+datum[6]+datum[7]+datum[8];
		}
		else{
			m = datum[2];
			y = datum[4]+datum[5]+datum[6]+datum[7];
		}
	}
	d = parseInt(d) ;		//String to Int
	m = parseInt(m) ;
	y = parseInt(y) ;
	tag = new Date(y, m-1 ,d);
	GruppeKalender() ;
}
function link(element){
	element.style.color="#FFEB3B";
}
function linkout(element){
	element.style.color="white";
}

function Kalender(){
	tabellen = document.getElementById('kalender').getElementsByTagName('table');
	if(tabellen.length != 0){			//Tabellen löschen
		do{
			tabellen[0].remove();
		}while(0 != tabellen.length);
	}
	var t1 = document.getElementById('kOverHead').getElementsByTagName("a")[0];		//Überschriften Links
	var t2 = document.getElementById('kOverHead').getElementsByTagName("a")[1];
	switch (ansicht){
		case 1:
			var aDate = new Date(tag.getYear()+1900, tag.getMonth() ,tag.getDate());
			WochenKalender(aDate);
			
			t1.innerHTML = tag.getYear() + 1900;
			t1.style.fontSize = "30px";
			t2.innerHTML = Monatsname[tag.getMonth()];
			t2.style.fontSize = "30px";
			break;
			
		case 2:
			var aDate = new Date(tag.getYear()+1900, tag.getMonth(), 1);
			MonatsKalender(aDate);
			
			t1.innerHTML = tag.getYear() + 1900;
			t1.style.fontSize = "30px";
			t2.innerHTML = '';
			t2.style.fontSize = "0px";
			break;
			
		case 3:
			createyear();
			t1.innerHTML = '';
			t1.style.fontSize = "0px";
			t2.innerHTML = '';
			t2.style.fontSize = "0px";
			break;
	}
//	dieTermine();
}
function WochenKalender(aDate) {
	var jetzt = new Date();		// aktuelles Datum
	var kW = weekofyear(aDate);
	
	var Start = aDate.getDay();		//Wochentag
	if (Start > 0) 
		Start--;
	else 
		Start = 6;
	aDate.setDate(aDate.getDate() -Start);		//mit Montag beginnen
	var table = document.createElement("table");
	
	var Kopf = kW+".KW";	//Tabellenüberschrift
	var caption = table.createCaption();
	caption.innerHTML = Kopf;
	
	var zeile = table.insertRow(0);		//Tabellenkopf
	var cells = zeile.insertCell(0);
	cells.innerHTML = "Zeit";
	
	var zeile1 = table.insertRow(1);		//Datums zeile
	var cells1 = zeile1.insertCell(0);
	cells.innerHTML = " ";
	for (var i = 0; i <= 7-1; i++) {		//Wochentage
		var cells = zeile.insertCell(i+1);
		cells.innerHTML = Wochentag[i];
		
		cells1 = zeile1.insertCell(i+1);
		
		cells1.innerHTML = aDate.getDate()+"."+(aDate.getMonth()+1)+"."+(aDate.getYear() + 1900);	//datum
		
		if ( (aDate.getDate()==jetzt.getDate()) && (aDate.getMonth()==jetzt.getMonth()) && (aDate.getYear()==jetzt.getYear()) ){
			cells.className = cells.className + ' heute';			//makiert
			cells1.className = cells1.className + ' heute';
		}
		aDate.setDate(aDate.getDate() + 1);
	}
	
	for (var i = 0; i <= 23; i++) {		//Tabellenbody
		var zeile = table.insertRow(i+2);
		cells = zeile.insertCell(0);		//Zeit
		if(i<=9)
			cells.innerHTML = "0"+i+":00";
		else
			cells.innerHTML = i+":00";	
					
		for (var j = 0; j <= 6; j++) {		//Zellen der Tage
			cells = zeile.insertCell(j+1);
			cells.innerHTML = ' ';
			var day = table.rows[1].cells[j+1].innerHTML;		//datum als classe
			cells.className = cells.className + day;
			if ((aDate.getMonth()==jetzt.getMonth()) && (aDate.getYear()==jetzt.getYear()) && (aDate.getDate()-(7-j) == jetzt.getDate())) 	//heute
				cells.className = cells.className + ' heute';
			
			if(i>=4 && i<=11)							//tag in drei abschnitte aufteilen
				cells.className = cells.className +' morgen';
			else if(i>=11 && i<=19)
				cells.className = cells.className +' mittag';
			else
				cells.className = cells.className +' nacht';
			if (j>=5) {									//Wochenende hevor heben
				cells.className = cells.className +' wochenende';
			}
		}
	}
	document.getElementById('kalender').appendChild(table);
}
function MonatsKalender(aDate) {
	var jetzt = new Date();		// aktuelles Datum
	var Wochentagab = new Array("Mo","Di","Mi","Do","Fr","Sa","So");	//abkürzungen für die Wochentage
	
	var Start = aDate.getDay();		//Wochentag des ersten Tags im Monat
	if (Start > 0) {
		Start--;
	} else {
		Start = 6;
	}
	var ende = Monatsende(aDate);
	
	var table = document.createElement("table");
	
	//Tabellenüberschrift
	var Kopf = Monatsname[aDate.getMonth()];	
	var caption = table.createCaption();
	caption.innerHTML = Kopf;
	
	//Tabellenkopf
	var zeile = table.insertRow(0);	
	zeile.className = 'thead';
	var cell = zeile.insertCell(0);
	cell.innerHTML = "Datum";
	var cell = zeile.insertCell(1);
	cell.innerHTML = "Wochentag";
	for (var i = 0; i < Gruppenmitglieder.length; i++) {		//Eine Spallte für jedes Gruppenmitglied
		var cell = zeile.insertCell(i+2);
		cell.innerHTML = Gruppenmitglieder[i];
	}
	var cell = zeile.insertCell(2+ Gruppenmitglieder.length);
	cell.innerHTML = "KW";
	
	//Tabellenbody
	for (var i = 0; i < ende; i++) {		//bis Monatsende
		var zeile = table.insertRow(i+1);
		
		Tageszahl =aDate.getDate();
		zeile.className = "Tag";
		zeile.className =zeile.className+" "+ aDate.getDate() +"."+ (aDate.getMonth()+1) +"."+ (aDate.getYear()+1900);
		cells = zeile.insertCell(0);
		cells.innerHTML = Tageszahl;	//Datum
		
		cells = zeile.insertCell(1);
		var wt= Wochentag[(Start+Tageszahl-1)%7];		//Wochentag
		var wtab= Wochentagab[(Start+Tageszahl-1)%7];
		cells.innerHTML = wtab;
		cells.title = wt;
		
		if (wt=="Samstag" || wt=="Sonntag")		//wochenende hervorheben 
			zeile.className = zeile.className +' wochenende';
		for (var j = 0; j <= Gruppenmitglieder.length -1; j++) {		//Zellen der Gruppenmitglieder
			cells = zeile.insertCell(j+2);
			cells.innerHTML = ' ';
		}
		if (wt=="Montag"||Tageszahl==1){		//Kalender Woche ergänzen
			kW = weekofyear(aDate);
			cellskW = zeile.insertCell(Gruppenmitglieder.length +2);
			cellskW.innerHTML = kW;			//Kalender Woche
			
			cellskW.title = aDate.getDate() + '.'+ (aDate.getMonth()+1) +'.'+ (aDate.getYear() + 1900);	//Datum vom Montag als titel
			cellskW.className = 'kw';
			cellskW.addEventListener('click', function(){	click_wechsel( 1, this.title);	});
			cellskW.addEventListener('mouseover', function(){	link(this);	});
			cellskW.addEventListener('mouseout', function(){	linkout(this);	});
			
			cellskW.rowSpan = 7 - Wochentag.indexOf(wt);	// länge der Zelle bis Sonntag
		}
		if ( (aDate.getDate()==jetzt.getDate()) && (aDate.getMonth()==jetzt.getMonth()) && (aDate.getYear()==jetzt.getYear()) ){	//heute hervorheben 
			zeile.className = zeile.className + ' heute';			//makiert den Tag
			cellskW.className= cellskW.className + ' heute';			//makiert die aktuelle Kalenderwoche
		}
		aDate.setDate(aDate.getDate() + 1);
	}
	document.getElementById('kalender').appendChild(table);
}
function createyear(){
	var table = document.createElement("table");
	var caption = table.createCaption();
	caption.innerHTML =  tag.getYear() + 1900;
	var Monat = 1;
		for (i=0; Monat<=12; i++){
			var zeile = table.insertRow(i);
			for (c=0; ((parseInt(document.getElementById('kalender').clientWidth /270 )-1)>c && Monat<=12); c++){
				div = createmonth (Monat-1, (tag.getYear() + 1900));
				var cell = zeile.insertCell(c);
				cell.appendChild(div);
				Monat++;
			}
		}
	document.getElementById('kalender').appendChild(table);
}


function createmonth (month,year) {	//creates a month table	
	//creates new table
	var table = document.createElement("table");
	table.className = 'JA';	//Jahresansicht
    //table.setAttribute("id", table);
    //fills it
    aDate = new Date(year, month, 1);
    maketitle(month,table);
    makedata(aDate,table);
    
    table.style.marginLeft= 0;
    table.style.marginRight= 'auto';
    var div = document.createElement("div");
    div.style.height= '245px';
    div.appendChild(table);
    return div;
    //makedata(aDate,monthtable);
}

//make Header for Month
function maketitle(month,table) {
      //var monthtable = document.getElementById(month);
	  // schreibe Tabellenüberschrift
	  var caption = table.createCaption();
	  caption.innerHTML = Monatsname[month];
	  caption.addEventListener('click', function(){	click_wechsel( 2, (tag.getDate() + '.'+ (month+1) +'.'+ (tag.getYear()+1900)))	});
	  caption.addEventListener('mouseover', function(){	link(this);	});
	  caption.addEventListener('mouseout', function(){	linkout(this);	});
}
function makedata (aDate,table) {
	//var table = document.getElementById(month);	  
	//6 Rows = Max for one Month
	var lastday = false;
	Days = new Array("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So");
	for (var i = 0; i <= 6;i++){
		//insert Row
		var row = table.insertRow();
		//first row
		if (i==0){
			for (var j = 0; j <= 7;j++){
				var cell = row.insertCell();
				if(j==0){
					cell.className = 'week';
					continue;
				}
				else{
					cell.className = 'week';
					cell.innerHTML=Days[j-1];
				}
			}
		}
		else if (i == 1){
			for (var j = 0; j <= 7;j++){
		    	var cell = row.insertCell();
		    	//week
		    	if (j == 0){
		    		
		    		week = weekofyear(aDate);
		    		cell.innerHTML = week;
		    		cell.className = 'week';
		    		cell.addEventListener('click', function(){	click_wechsel( 1, (aDate.getDate() + '.'+ (aDate.getMonth()) +'.'+ (aDate.getYear()+1900)) )	});
		    		cell.addEventListener('mouseover', function(){	link(this);	});
		    		cell.addEventListener('mouseout', function(){	linkout(this);	});
		    	}
		    	//weekday not in month
		    	else if (j<weekday(aDate)){
		    		cell.className = 'notinmonth';
		    	}
		    	else{
		    		cell.innerHTML = aDate.getDate();
		    		if(j==6 || j==7||isholiday(aDate,cell)){
						cell.className = 'holidayorweekend';
						cell.className = cell.className+' '+' Tag';
					}
		    		else{
		    			cell.className = 'calendarday';
		    			cell.className = cell.className+' '+' Tag';
					}
					//Group_Personal 1 = Group 0 = Person
					//addtooltiptermin(Group_Personal,aDate, cell);
		    		aDate.setDate(aDate.getDate() + 1);
		    	}
			}
		}
		
		//Not first Week
		else{
			if (lastday == false){
			    for (var j = 0; j <= 7;j++){
			    	//Erstes Feld = Woche
			    	var cell = row.insertCell();
				    if (j == 0){
						week = weekofyear(aDate);
			    		cell.innerHTML = week;
			    		cell.className = 'week';
			    		cell.addEventListener('click', function(){	click_wechsel( 1, (aDate.getDate() + '.'+ (aDate.getMonth()) +'.'+ (aDate.getYear()+1900)) )	});
			    		cell.addEventListener('mouseover', function(){	link(this);	});
			    		cell.addEventListener('mouseout', function(){	linkout(this);	});
			    	}
					//is it in month
				    else if(aDate.getDate()<=Monatsende(aDate)&& lastday==false){
						cell.innerHTML = aDate.getDate();
			    		if(j==6 || j==7||isholiday(aDate,cell)){
							cell.className = 'holidayorweekend';
			    			cell.className = cell.className+' '+' Tag';
						}
			    		else{
			    			cell.className = 'calendarday';
			    			cell.className = cell.className+' '+' Tag';
						}
			    		if (Monatsende(aDate)==aDate.getDate()){
			    			lastday = true;
						}
						//Group_Personal 1 = Group 0 = Person
						//addtooltiptermin(Group_Personal,aDate, cell);
						aDate.setDate(aDate.getDate() + 1);
			    	
					}
					else{
						cell.className = 'notinmonth';
					}
			    }
			}	
		}
	}
			  
}



function eastern(aDate){
	var K = Math.trunc(aDate.getFullYear() /100);
	var M = 15 + Math.trunc((3*K+3)/4)- Math.trunc((8*K+13)/25);
	var S = 2 - Math.trunc((3*K+3)/4);
	var A = aDate.getFullYear() % 19;
	var D = (19*A+M)%30;
	var R = Math.trunc((D + Math.trunc(A/11) ) /29);
	var OG = 21 + D-R;
	var SZ = 7 - (aDate.getFullYear()+ Math.trunc(aDate.getFullYear()/4)+S)%7;
	var OE = 7 - (OG - SZ) % 7;
	var OS = OG + OE;
	if (OS > 31){
		var easter = new Date(aDate.getFullYear(),3,OS-31);
		return easter;
	}
	else{
		var easter = new Date(aDate.getFullYear(),2,OS);
		return easter;
	}
}
//test if Date = Holiday
function isholiday(aDate,cell){
	//Bundesweit
	//NeuJahr
	var holiday = new Date(aDate.getFullYear(),0,1);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Neujahr',cell);
		return true;
	}
	//Karfreitag
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() - 2);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Karfreitag',cell);
		return true;
	}
	//OsterMontag
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +1);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Ostermontag',cell);
		return true;
	}
	//1.Mai
	holiday = new Date(aDate.getFullYear(),4,1)
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Tag der Arbeit',cell);
		return true;
	}
	
	//Christi Himmelfahrt
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +39);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Christi Himmelfahrt',cell);
		return true;
	}
	//Pfingsten
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +49);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Pfingsten',cell);
		return true;
	}
	//Tag der Deutschen Einheit
	holiday = new Date(aDate.getFullYear(),9,3);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Tag der Deutschen Einheit',cell);
		return true;
	}
	//Erster Weihnachtsfeiertag
	holiday = new Date(aDate.getFullYear(),11,25);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('1. Weihnachtsfeiertag',cell);
		return true;
	}
	//Zweiter Weihnachtsfeiertag
	holiday = new Date(aDate.getFullYear(),11,26);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('2. Weihnachtsfeiertag',cell);
		return true;
	}
	//Laenderspeziefisch
	//Heilige Drei Könige
	holiday = new Date(aDate.getFullYear(),0,6);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Heilige Drei Koenige\nFeiertag in BW,BY,ST',cell);
		return true;
	}
	//Fronleichnam
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +60);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Fronleichnam\nFeiertag in BW,BY,HE,NW,RP,SL',cell);
		return true;
	}
	//Augsburger Hohes Friedensfest
	holiday = new Date(aDate.getFullYear(),7,8);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Augsburger Hohes Friedensfest\nFeiertag nur in Augsburg,Bayern',cell);
		return true;
	}
	//Mariae Himmelfahrt
	holiday = new Date(aDate.getFullYear(),7,15);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Mariae Himmelfahrt\nFeiertag in BY,SL',cell);
		return true;
	}
	//Reformationstag
	holiday = new Date(aDate.getFullYear(),9,31);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Reformationstag\nFeiertag in BB,HB,HH,MV,NI,SN,ST,SH,TH',cell);
		return true;
	}
	//Allerheiligen
	holiday = new Date(aDate.getFullYear(),10,1);
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Allerheiligen\Feiertag in BW,BY,NW,RP,SL',cell);
		return true;
	}
	//Buss und Bettag //Mittwoch vor dem 23 November
	holiday = new Date(aDate.getFullYear(),10,23);
	while(weekday(holiday)!=3){
		holiday.setDate(holiday.getDate()-1);
	}
	if (aDate.valueOf()==holiday.valueOf()){
		addtooltip('Buss und Bettag\n Feiertag in SN',cell);
		return true;
	}
	return false;
}

function weekday(aDate){
	day = (aDate.getDay() +6)%7+1
	return day;
}
//Week of the year
function weekofyear(aDate){
	newyear = new Date(aDate.getFullYear(),0,1);
	weeks = 0;
	while(weekday(newyear)!=4){
		if (weekday(newyear)==7&& newyear.getTime() >= aDate.getTime()){
			oldyear=new Date(aDate.getFullYear()-1,11,31);
			
			return weekofyear(oldyear);
		}
		newyear.setDate(newyear.getDate() + 1);
		//passing sunday
	}
	weeks = 1;
	while(weekday(newyear)!=7){
		//thursday found
		newyear.setDate(newyear.getDate() + 1);
	}	
	while(newyear.getTime() < aDate.getTime()){
		newyear.setDate(newyear.getDate() + 7);
		weeks +=1;
	}
	lastdayofyear = new Date(aDate.getFullYear(),11,31);
	if(weeks == 53 && weekday(lastdayofyear)<4){
		return 1;
	}
	else{
		return weeks;
	}
}
function add_termine(Group_Personal){
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
 	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	var request = window.indexedDB.open("Accountdaten",1);
	request.onerror = function(event) {
		alert("Ihr Browser muss die Datenbank Index unterstützen um die Applikation nutzen zu können");
	};
	request.onsuccess= function(event){
		db = event.target.result;
		var transaction = db.transaction(['Termin'], "readonly");
		var objectStore = transaction.objectStore('Termin');
		objectStore.openCursor().onsuccess = function(event) {
		  var cursor = event.target.result;
		  if(cursor) {
			addtooltiptermin(Group_Personal,cursor.value.start,cursor.value.ende,cursor.value.name,cursor.value.username,cursor.value.GID);
			cursor.continue();
		  } 
		};
	};
}
//Convert monthname to monthnumber
function month_to_number(month){
	switch(month){
		case "Januar":
			return 0;
		case "Februar":
			return 1;
		case "März":
			return 2;
		case "April":
			return 3;
		case "Mai":
			return 4;
		case "Juni":
			return 5;
		case "Juli":
			return 6;
		case "August":
			return 7;
		case "September":
			return 8
		case "Oktober":
			return 9;
		case "November":
			return 10;
		case "Dezember":
			return 11;
	}
	return 0;
}
function addtooltiptermin(Group_Personal,start,ende,name,un,GD){
	//if((Group_Personal == 1 && un == username)||(Group_Personal == 0 && GD == GID)){
		if(ansicht==1){
			var Kalender = document.getElementById('kalender').childNodes[3].rows;
			Woche = Kalender[1].cells;
			kOverHead = document.getElementById('kOverHead');
			for(i=1; i<Woche.length; i+=1) {
				Tag = Woche[i];
				for(j=2; j<Kalender.length; j+=1) {
					Stunde=Kalender[j].cells[0];
					Now = Kalender[j].cells[i];
					DataDate = Tag.innerHTML.split('.');
					DataTime = Stunde.innerHTML.split(":")
					aDate = new Date(DataDate[2],DataDate[1]-1,DataDate[0],DataTime[0],DataTime[1]);
					if(isinrange(start,ende,aDate)){
						Now.innerHTML=name;
					}
				}
			}

			var year = kOverHead.childNodes[1].childNodes[0].data;
			var month = month_to_number(kOverHead.childNodes[6].childNodes[0].data);
		}
		else if(ansicht==2){
			var Kalender = document.getElementById('kalender').childNodes[3];
			kOverHead = document.getElementById('kOverHead');
			var year = kOverHead.childNodes[1].childNodes[0].data;
			var month = month_to_number(Kalender.caption.innerHTML);
			var Wochen = Kalender.rows;
			for(i=1;i<Wochen.length;i+=1){
				var day = Wochen[i].cells[0].innerHTML;
				var aDate = new Date(year,month,day,0,0)
				Now=Wochen[i].cells[2];

				start=new Date(start.getFullYear(),start.getMonth(),start.getDate(),0,0);
				ende=new Date(ende.getFullYear(),ende.getMonth(),ende.getDate(),23,59);

				if(isinrange(start,ende,aDate)){
					Now.innerHTML=name;
				}
			}

		}
		else if(ansicht == 3){
			var Kalender = document.getElementById('kalender').childNodes[3];
			var year = Kalender.caption.innerHTML;
			Kalender = Kalender.rows;
			for(i=0; i<Kalender.length; i+=1) {
				var Monate = Kalender[i].cells;
				for(j=0; j<Monate.length; j+=1) {
					var Monat = Monate[j];
					Monat = Monat.childNodes[0].childNodes[0];
					var month = j+i*Monate.length;
					var Wochen = Monat.rows;
					for(k=1; k<Wochen.length; k+=1){
						var Woche = Wochen[k].cells;
						for(l=1; l<Woche.length; l+=1){
							var day = 0;
							var childs = Woche[l].childElementCount; 
							if(childs > 0){
								day = Woche[l].childNodes[0].innerText;
							}
							else{
								day = Woche[l].innerHTML;
							}
							start=new Date(start.getFullYear(),start.getMonth(),start.getDate(),0,0);
							ende=new Date(ende.getFullYear(),ende.getMonth(),ende.getDate(),23,59);
							
							var aDate = new Date(year,month,day,0,0);
							if(isinrange(start,ende,aDate)){
								addtooltip(name,Woche[l]);
							}
					}	}
				}
			}
		}
	//}
}
function isinrange(start,ende,aDate){
	if ((aDate.getTime() >= start.getTime()) && (aDate.getTime() <= ende.getTime()))
		return true;
	else{
		return false;
	}
}

function addtooltip(text,cell){
	//Hat noch keinen Tooltip
	var childs = cell.childElementCount; 
	if(childs == 0){
		var tooltip = document.createElement("div");
		var span = document.createElement("span");
		tooltip.setAttribute("class","tooltip");
		span.setAttribute("class","tooltiptext");
		tooltip.innerHTML = cell.innerHTML;
		cell.innerHTML = "";
		span.innerText = text;
		tooltip.appendChild(span);
		cell.appendChild(tooltip);
	}
	//hat schon einen
	else{
		var span = cell.childNodes[0].childNodes[1];
		if (span.innerHTML != text){
			span.innerHTML = span.innerHTML + '\n' + text;
		}
	}
}
