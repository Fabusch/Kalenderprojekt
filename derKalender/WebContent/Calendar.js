createyear(2018);
//Convert monthname to monthnumber
function month_to_number(month){
	switch(month){
		case "Januar":
			return 1;
		case "Februar":
			return 2;
		case "März":
			return 3;
		case "April":
			return 4;
		case "Mai":
			return 5;
		case "Juni":
			return 6;
		case "Juli":
			return 7;
		case "August":
			return 8;
		case "September":
			return 9
		case "Oktober":
			return 10;
		case "November":
			return 11;
		case "Dezember":
			return 12;
	}
	return 0;
}
//Conver monthnumber to monthname
function number_to_month(number){
	switch(number){
	case 1:
		return "Januar";
	case 2:
		return "Februar";
	case 3:
		return "März";
	case 4:
		return "April"
	case 5:
		return "Mai";
	case 6:
		return "Juni";
	case 7:
		return "Juli";
	case 8:
		return "August";
	case 9:
		return "September";
	case 10:
		return "Oktober";
	case 11:
		return "November";
	case 12:
		return "Dezember";
	}
	return "Error";

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
		var eastern = new Date(aDate.getFullYear(),2,OS);
		return easter;
	}
}
//test if Date = Holiday
function isholiday(aDate){
	//NeuJahr
	var holiday = new Date(aDate.getFullYear(),0,1);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Karfreitag
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() - 2);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//OsterMontag
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +1);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//1.Mai
	holiday = new Date(aDate.getFullYear(),4,1)
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	
	//Christi Himmelfahrt
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +39);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Pfingsten
	holiday = eastern(aDate);
	holiday.setDate(holiday.getDate() +49);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Tag der Deutschen Einheit
	holiday = new Date(aDate.getFullYear(),9,3);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Erster Weihnachtsfeiertag
	holiday = new Date(aDate.getFullYear(),11,25);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	//Zweiter Weihnachtsfeiertag
	holiday = new Date(aDate.getFullYear(),11,26);
	if (aDate.valueOf()==holiday.valueOf()){
		return true;
	}
	return false;
}
//Test if leap year
function isleapyear(year){
	if (year%4 == 0){
		if (year%100 == 0){
			if (year%400 == 0){
				return true;
			}
			return false;
		}
		return true;
	}
	return false;
}

function weekday(aDate){
	day = (aDate.getDay() +6)%7+1
	return day;
}
function daysofmonth(aDate){
	month = number_to_month(aDate.getMonth()+1);
	year = aDate.getFullYear();
	switch(month){
		case "Januar":
			return 31;
		case "Februar":
			if (isleapyear(year)){
				return 29;
			}
			else{
				return 28;
			}
		case "März":
			return 31;
		case "April":
			return 30;
		case "Mai":
			return 31
		case "Juni":
			return 30;
		case "Juli":
			return 31;
		case "August":
			return 31;
		case "September":
			return 30;
		case "Oktober":
			return 31;
		case "November":
			return 30;
		case "Dezember":
			return 31;
		}
	return 0;
	
}
//Week of the year
function lastweekofyear(aDate){
	newyear = new Date(aDate.getFullYear(),0,1);
	lweeks = 0;
	while(weekday(newyear)!=4){
		newyear.setDate(newyear.getDate() + 1);
	}
	while(weekday(newyear)!=7){
		//thursday found
		newyear.setDate(newyear.getDate() + 1);
	}	
	while(newyear.getTime() < aDate.getTime()){
		newyear.setDate(newyear.getDate() + 7);
		lweeks +=1;
	}
	return lweeks;
}
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

//make Header for Month
function maketitle(month,table) {
      //var monthtable = document.getElementById(month);
	  // schreibe Tabellenüberschrift
	  var caption = table.createCaption();
	  caption.innerHTML = month;
}

function makedata (aDate,table) {
	//var table = document.getElementById(month);	  
	//6 Rows = Max for one Month
	var lastday = false;
	for (var i = 0; i <= 5;i++){
		//insert Row
		var row = table.insertRow();
		//first row
		if (i == 0){
			for (var j = 0; j <= 7;j++){
		    	var cell = row.insertCell();
		    	//week
		    	if (j == 0){
		    		
		    		week = weekofyear(aDate);
		    		cell.innerHTML = week;
		    		cell.className = 'week';
		    	}
		    	//weekday not in month
		    	else if (j<weekday(aDate)){
		    		cell.className = 'notinmonth';
		    	}
		    	else{
		    		cell.innerHTML = aDate.getDate();
		    		if(j==6 || j==7||isholiday(aDate)){
						cell.className = 'holidayorweekend';
					}
		    		else{
		    			cell.className = 'calendarday';
		    		}
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
			    	}
					//is it in month
				    else if(aDate.getDate()<=daysofmonth(aDate)&& lastday==false){
				    	cell.innerHTML = aDate.getDate();
			    		if(j==6 || j==7||isholiday(aDate)){
							cell.className = 'holidayorweekend';
						}
			    		else{
			    			cell.className = 'calendarday';
			    		}
			    		if (daysofmonth(aDate)==aDate.getDate()){
			    			lastday = true;
			    		}
			    		aDate.setDate(aDate.getDate() + 1);
			    	
					}
					else{
						cell.className = 'notinmonth'
					}
			    }
			}	
		}
	}
			  
}
//creates a month table	
function createmonth (month,year) {
	//creates new table
	var table = document.createElement("table");
    table.setAttribute("id", table);
    //fills it
    aDate = new Date(year,month_to_number(month)-1,1);
    maketitle(month,table);
    makedata(aDate,table);
    document.body.appendChild(table);
    //makedata(aDate,monthtable);
}
function createyear(year){
	createmonth ("Januar",year);
	createmonth ("Februar",year);
	createmonth ("März",year);
	
	createmonth ("April",year);
	createmonth ("Mai",year);
	createmonth ("Juni",year);
	
	createmonth ("Juli",year);
	createmonth ("August",year);
	createmonth ("September",year);
	
	createmonth ("Oktober",year);
	createmonth ("November",year);
	createmonth ("Dezember",year);
}