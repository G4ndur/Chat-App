
<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <?php echo $_SERVER['HTTP_USER_AGENT'] ?>

 <?php
 if (strpos($_SERVER['HTTP_USER_AGENT'], 'Firefox') !== FALSE) {
     ?>
     <h3>strpos() must have returned non-false</h3>
     <p>You are using Firefox</p>
     <?php
 } else {
     ?>
     <h3>strpos() must have returned false</h3>
     <p>You are not using Firefox</p>
     <?php
 }
 ?>
 </body>
</html>