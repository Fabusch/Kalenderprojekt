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
			
			function MonatsKalender(Monat, Jahr) {
				var jetzt = new Date();		// aktuelles Datum
				var DieserMonat = jetzt.getMonth() + 1;
				var DiesesJahr = jetzt.getYear() + 1900;
				var DieserTag = jetzt.getDate();
				
				var Zeit = new Date(Jahr, Monat - 1, 1);
				var Start = Zeit.getDay();		//Wochentag des ersten Tags im Monat
				if (Start > 0) {
					Start--;
				} else {
					Start = 6;}
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
					cells.innerHTML = wt;
				
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
						
						cells.title =  y+ '.'+ m+'.'+ Tageszahl;	//Datum vom Montag als titel
						cells.className = 'kw';
						
						if(wt=="Montag"){		//!!!
							cells.colSpan = "7";		//länge der Zelle 
						}
						else{
							//cells.colSpan=		7- Wochentag.position_von(wt);
						}
					}
					Tageszahl++;
				}
			}	
			
			function Monat_wechsel(vor){
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
				MonatsKalender(m, y);
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
				WochenKalender(d, m, y);
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
				var Kopf = Monatsname[Monat-1] + " " + Jahr+ " \n "+ kW+".KW";	//Tabellenüberschrift
				var caption = tabelle.createCaption();
				caption.innerHTML = Kopf;
				
				var zeile = tabelle.insertRow(0);		//Tabellenkopf
				var cells = zeile.insertCell(0);
				cells.innerHTML = "Zeit";
				for (var i = 0; i <= Wochentag.length-1; i++) {		//Wochentag
					var cells = zeile.insertCell(i+1);
					if(Tag > Monatsende(Monat, Jahr)){			//falls Monats wechsel
						Tag = 1;
						Monat++;
						if(Monat >=13){		//falls Jahres wechsel
							Monat=1;
							Jahr++;
						}
					}
					cells.title = Tag+"."+Monat+"."+Jahr;		//datum als Titel
					if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tag == DieserTag)) {		//heute
						cells.className = cells.className + ' heute';
					}
					cells.innerHTML = Wochentag[i];
					Tag++;
				}
				
				for (var i = 0; i <= 23; i++) {		//Tabellenbody
					var zeile = tabelle.insertRow(i+1);
					cells = zeile.insertCell(0);		//Zeit
					if(i<=9)
						cells.innerHTML = "0"+i+":00";
					else
						cells.innerHTML = i+":00";	
					
					for (var j = 0; j <= 6; j++) {		//Zellen der Tage
						cells = zeile.insertCell(j+1);
						cells.innerHTML = ' ';
						var day = tabelle.rows[0].cells[j+1].title;		//datum als classe
						cells.className = cells.className + day;
						if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tag-(7-j) == DieserTag)) {	//heute
							cells.className = cells.className + ' heute';
						}
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
					default:
				}
			}
			function setAnsicht(sicht){
				ansicht = sicht;
				Kalender(ansicht, 'kalender');
			}
