
function validate(form){
	fail  = validateVorname(form.vorname.value)
	fail += validateNachname(form.nachname.value)
	fail += validateNickname(form.nickname.value)
	fail += validatePasswort(form.passwort.value)
	if (fail == "") return true
	else{alert(fail); return false}
	
	function validateVorname(field){
		if (field =="") return "Es wurde kein Vorname eingegeben.\n"
		return""
	}
	
	function validateNachname(field){
		if(field == "") return "Es wurde kein Nachname eingegeben.\n"
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
}
