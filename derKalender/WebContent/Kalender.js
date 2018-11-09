var tag = new Date();
var d = tag.getDate();
var m = tag.getMonth() + 1;
var y = tag.getYear() + 1900;
			
var ansicht = 1;
			
Monatsname = new Array("Januar", "Februar", "März", "April", "Mai", "Juni","Juli", "August", "September", "Oktober", "November", "Dezember");
Wochentag = new Array("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag");
Gruppenmitglieder =new Array("Person 1","Person 2","Person 3","Person 4","Person 5","Person 6","Person 7");
			
function background(id){
	if(document.getElementById(id).innerHTML=="Neptune")
		document.getElementById('kalender').style.backgroundImage = "url('img/Neptune.png')";
	else if(document.getElementById(id).innerHTML=="Star-Wars Clone")
		document.getElementById('kalender').style.backgroundImage = "url('img/Star-Wars_Clone.jpg')";
}
function Monatsende(Monat, Jahr){
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
	Kalender(ansicht, 'kalender');
}
			
function Kalender(sicht, kalender){
	switch (sicht){
		case 1:
			WochenKalender(d, m, y, kalender);
			break;
		case 2:
			MonatsKalender(m, y, kalender);
			break;
		case 3:
			//JahresKalender(y, kalender);
			break;
		}
	}
function MonatsKalender(Monat, Jahr) {
	var jetzt = new Date();		// aktuelles Datum
	var DieserMonat = jetzt.getMonth() + 1;
	var DiesesJahr = jetzt.getYear() + 1900;
	var DieserTag = jetzt.getDate();
	var Wochentagab = new Array("Mo","Di","Mi","DO","Fr","Sa","So");	//abkürzungen für die Wochentage
	
	var Zeit = new Date(Jahr, Monat - 1, 1);
	var Start = Zeit.getDay();		//Wochentag des ersten Tags im Monat
	if (Start > 0) {
		Start--;
	} else {
		Start = 6;
	}
	//Stop
	var ende = 31;
	if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11) --ende; // April(4), Juni(6), September(9), November(11) 30 Tage
	if (Monat == 2) {	//Februar(2)
		ende = ende - 3;
		if (Jahr % 4 == 0) ende++;		//Schaltjahren
		if (Jahr % 100 == 0) ende--;
		if (Jahr % 400 == 0) ende++;
	}
	
	var tabelle = document.getElementById('kalender');
	if(tabelle.rows.length >0){		//Tabellen inhalt löschen
		for(var i = 0; 0 != tabelle.rows.length; i++){
			tabelle.deleteRow(0);
		}
	}
	var Kopf = Monatsname[Monat-1] + " " + Jahr;	//Tabellenüberschrift
	var caption = tabelle.createCaption();
	caption.innerHTML = Kopf;
	
	var zeile = tabelle.insertRow(0);		//Tabellenkopf
	zeile.className = 'thead';
	var cell = zeile.insertCell(0);
	cell.innerHTML = "Datum";
	var cell = zeile.insertCell(1);
	cell.innerHTML = "Wochentag";
	for (var i = 0; i <= Gruppenmitglieder.length-1; i++) {		//Eine Spallte für jedes Gruppenmitglied
		var cell = zeile.insertCell(i+2);
		cell.innerHTML = Gruppenmitglieder[i];
	}
	var cell = zeile.insertCell(2+ Gruppenmitglieder.length);
	cell.innerHTML = "KW";
	
	var Tageszahl = 1;				//Tabellenbody
	for (var i = 0; i < ende; i++) {		//bis Monatsende
		var zeile = tabelle.insertRow(i+1);
		
		zeile.className = 'kalendertag';	
		cells = zeile.insertCell(0);
		cells.innerHTML = Tageszahl;	//Datum
		
		cells = zeile.insertCell(1);
		var wt= Wochentag[(Start+Tageszahl-1)%7];		//Wochentag
		var wtab= Wochentagab[(Start+Tageszahl-1)%7];
		cells.innerHTML = wtab;
		cells.title = wt;
		
		if (wt=="Samstag" || wt=="Sonntag")		//wochenende hervorheben 
			zeile.className = zeile.className +' wochenende';
		if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag))	//heute hervorheben 
			zeile.className = zeile.className + ' heute';
		
		for (var j = 0; j <= Gruppenmitglieder.length -1; j++) {		//Zellen der Gruppenmitglieder
			cells = zeile.insertCell(j+2);
			cells.innerHTML = ' ';
		}
		if (wt=="Montag"||Tageszahl==1){		//Kalender Woche ergänzen
			var date = new Date(y,m-1,Tageszahl);		//der Tag
			var currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);		//KalenderWoche berechnen
			var yearOfThursday = currentThursday.getFullYear();
			var firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(3-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);
			
			cells = zeile.insertCell(Gruppenmitglieder.length +2);
			var kW = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
			cells.innerHTML = kW;			//Kalender Woche
			
			cells.title = Tageszahl + '.'+ Monat+'.'+ y;	//Datum vom Montag als titel
			cells.className = 'kw';
			cells.addEventListener('click', function(){
														var datum = this.title;
														click_wechsel( 1, datum);
													});
			
			if(wt=="Montag")
				cells.rowSpan = 7;		//länge der Zelle
			else
				cells.rowSpan = 7 - Wochentag.indexOf(wt);	// länge bis Sonntag
		}
		Tageszahl++;
	}
}
function WochenKalender(Tag, Monat, Jahr) {
	var jetzt = new Date();		// aktuelles Datum
	var DieserMonat = jetzt.getMonth() + 1;
	var DiesesJahr = jetzt.getYear() + 1900;
	var DieserTag = jetzt.getDate();
	
	var date = new Date(Jahr,Monat-1,Tag);		//der Tag
	var currentThursday = new Date(date.getTime() +(3-((date.getDay()+6) % 7)) * 86400000);
	var yearOfThursday = currentThursday.getFullYear();
	var firstThursday = new Date(new Date(yearOfThursday,0,4).getTime() +(3-((new Date(yearOfThursday,0,4).getDay()+6) % 7)) * 86400000);
	
	var kW = Math.floor(1 + 0.5 + (currentThursday.getTime() - firstThursday.getTime()) / 86400000/7);
	
	var Zeit = new Date(Jahr, Monat-1, Tag);
	var Start = Zeit.getDay();		//Wochentag
	if (Start > 0) 
		Start--;
	else 
		Start = 6;
	Tag = Tag-Start;	//Tag soll ein Montag sein
	if(Tag <=0){
		Monat--;
		if(Monat <=0){
			Monat=12;
			Jahr--;
		}
		Tag = Monatsende(Monat, Jahr)+Tag;
	}
	var tabelle = document.getElementById('kalender');
	
	if(tabelle.rows.length >0){		//Tabellen inhalt löschen
		for(var i = 0; 0 != tabelle.rows.length; i++){
			tabelle.deleteRow(0);
		}
	}
	var Kopf = Monatsname[Monat-1] + " " + Jahr+ " \n "+ kW+".KW";	//Tabellenüberschrift		//!!!
	var caption = tabelle.createCaption();
	caption.innerHTML = Kopf;
	
	var zeile = tabelle.insertRow(0);		//Tabellenkopf
	var cells = zeile.insertCell(0);
	cells.innerHTML = "Zeit";
	
	var zeile1 = tabelle.insertRow(1);		//Datums zeile
	var cells1 = zeile1.insertCell(0);
	cells.innerHTML = " ";
	for (var i = 0; i <= 7-1; i++) {		//Wochentag
		var cells = zeile.insertCell(i+1);
		if(Tag > Monatsende(Monat, Jahr)){			//falls Monats wechsel
			Tag = 1;
			Monat++;
			if(Monat >=13){		//falls Jahres wechsel
				Monat=1;
				Jahr++;
			}
		}
		cells.innerHTML = Wochentag[i];
		
		cells1 = zeile1.insertCell(i+1);
		
		var tag = Tag;
		var monat = Monat;
		if (tag<=9)
			tag = "0"+tag;
		if (monat<=9)
			monat= "0"+ monat;
		cells1.innerHTML = tag+"."+monat+"."+Jahr;	//datum
		
		if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tag == DieserTag)){ 		//heute
			cells.className = cells.className + ' heute';
			cells1.className = cells1.className + ' heute';
		}
		
		Tag++;
	}
	
	for (var i = 0; i <= 23; i++) {		//Tabellenbody
		var zeile = tabelle.insertRow(i+2);
		cells = zeile.insertCell(0);		//Zeit
		if(i<=9)
			cells.innerHTML = "0"+i+":00";
		else
			cells.innerHTML = i+":00";	
					
		for (var j = 0; j <= 6; j++) {		//Zellen der Tage
			cells = zeile.insertCell(j+1);
			cells.innerHTML = ' ';
			var day = tabelle.rows[1].cells[j+1].innerHTML;		//datum als classe
			cells.className = cells.className + day;
			if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tag-(7-j) == DieserTag)) 	//heute
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
}

function wechsel(vor, kalender){
	switch (ansicht){
		case 1:
			Wochen_wechsel(vor);
			break;
		case 2:
			Monats_wechsel(vor);
			break;
		case 3:
			//Jahres_wechsel(vor, kalender);
			break;
	}
	Kalender(ansicht, kalender);
}
function Monats_wechsel(vor){
	if(vor){
		m += 1;
		if(m==13){
			m =1;
			y += 1;
		}
	}
	else{
		m -= 1;
		if(m==0){
			m =12;
			y -= 1;
		}
	}
}			
function Wochen_wechsel(vor){
	if(vor){
		d += 7;
		if(Monatsende( m, y)<d){
			d -= Monatsende( m, y);
			m += 1;
			if(m==13){
				m =1;
				y =y+1;
			}
		}
	}
	else{
		d -= 7;
		if(d<=0){
			m = m-1;
			if(m==0){
				m =12;
				y =y-1;
			}
			d += Monatsende( m, y);
		}
	}
}

function click_wechsel(sicht, datum){
	ansicht = sicht;
	if(datum[2]=='.'){
		d = datum[0]+datum[1];
		if(datum[5]=='.'){
			m = datum[3]+datum[4];
			y = datum[6]+datum[7]+datum[8]+datum[9];
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
	Kalender(sicht, 'kalender');
}
