function addtooltiptermin(start,ende,name,username,GID){
	if((window.Group_Personal == true && username == window.Nutzer)||(window.Group_Personal == false && GID == window.GID)||(window.Group_Personal == true && userischild(username))){
		if(ansicht==1){
			addtooltip_week(start,ende,name);
		}
		else if(ansicht==2){
			addtooltip_month(start,ende,name);
		}
		else if(ansicht == 3){
			addtooltip_year(start,ende,name);
		}
	}
}

function addtooltip_week(start,ende,name){
	var Kalender = document.getElementById('kalender').childNodes[3].rows;
	var Woche = Kalender[2].cells.slice(1);
	var i = 1;
	kOverHead = document.getElementById('kOverHead');
	Woche.forEach(function(Tag){
		Kalender.forEach(function(row){
			Stunde=row.cells[0];
			Now = row.cells[i];
			DataDate = Tag.innerHTML.split('.');
			DataTime = Stunde.innerHTML.split(":")
			aDate = new Date(DataDate[2],DataDate[1]-1,DataDate[0],DataTime[0],DataTime[1]);
			if(isinrange(start,ende,aDate)){
				Now.innerHTML=name;
			}
			i = i + 1;
		})
		
	})
}

function addtooltip_month(start,ende,name){
	var Kalender = document.getElementById('kalender').childNodes[3];
	kOverHead = document.getElementById('kOverHead');
	var year = kOverHead.childNodes[1].childNodes[0].data;
	var month = month_to_number(Kalender.caption.innerHTML);
	var Wochen = Kalender.rows;
	Wochen.slice(1);
	Wochen.forEach(function(Tag){
		var day = Tag.cells[0].innerHTML;
		var aDate = new Date(year,month,day,0,0)
		var Now=Tag.cells[2];

		start=new Date(start.getFullYear(),start.getMonth(),start.getDate(),0,0);
		ende=new Date(ende.getFullYear(),ende.getMonth(),ende.getDate(),23,59);

		if(isinrange(start,ende,aDate)){
			Now.innerHTML=name;
		}

	})
}
function addtooltip_year(start,ende,name){
	var Kalender = document.getElementById('kalender').childNodes[3];
	var year = Kalender.caption.innerHTML;
	Kalender = Kalender.rows;
	Kalender.forEach(function(Quartal) {
		var Monate = Quartal.cells;
		Monate.forEach(function(Monat){
			Monat = Monat.firstElementChild.firstElementChild;
			var month = j+i*Monate.length;
			var Wochen = Monat.rows;
			Wochen.slice(1);
			Wochen.forEach(function(Woche){
				var Woche = Woche.cells;
				Woche.forEach(function(Tag){
					var childs = Tag.childElementCount; 
					if(childs > 0){
						day = Tag.firstElementChild.innerText;
					}
					else{
						day = Tag.innerHTML;
					}
					start=new Date(start.getFullYear(),start.getMonth(),start.getDate(),0,0);
					ende=new Date(ende.getFullYear(),ende.getMonth(),ende.getDate(),23,59);
					
					var aDate = new Date(year,month,day,0,0);
					if(isinrange(start,ende,aDate)){
						addtooltip(name,Tag);
					}
				}) 
			})
		})
	})
}