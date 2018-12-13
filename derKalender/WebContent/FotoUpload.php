<?php
echo "<pre>";
print_r ( $_FILES );
echo "</pre>";
?>

<form name="uploadformular" enctype="multipart/form-data" action="dateiupload.php" method="post">
Datei: <input type="file" name="uploaddatei" size="60" maxlength="255">
<input type="Submit" name="submit" value="Datei hochladen">
</form>


<?php
echo "<pre>";
print_r ($_FILES );
echo "</pre>";
if ( ($_FILES['uploaddatei']['name']  <> "")
{
    // Datei wurde durch HTML-Formular hochgeladen
    // und kann nun weiterverarbeitet werden
}
/* hier kommt nun das Formular */
?>
