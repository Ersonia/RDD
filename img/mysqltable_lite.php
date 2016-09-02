<?php
$Globe="";
class MySQLTable
{
  var $Name;
  var $HostName;
  var $BaseName;
  var $UserName;
  var $AdminMode;
  var $Password;
  var $LinkId;
  var $Size;
  var $Fields=array();
  var $Data=array();
  var $Types=array();
  var $Flags=array();
  var $Lengths=array();
  var $LookupList=array();

function MySQLTable($BaseName,$TableName,$HostName='localhost',$UserName='',$Password='',$query)
{
 #phpinfo();
 //if ($BaseName=="eud") echo "eud found:";
 global $REQUEST_URI;
 global $ADMIN;
	$DATABASE="DSS";
	$TABLENAME="";
	$USERNAME="root";
	$PASSWORD="tellnet6";
	$HOSTNAME="localhost";
 if (ereg("ADMIN=ON",$REQUEST_URI) || $ADMIN=="ON")  $this->AdminMode=true;
 if ($BaseName=="") $BaseName=$DATABASE;
 if ($TableName=='') $TableName=$TABLENAME;
 $HostName=$HOSTNAME;
 $UserName=$USERNAME;
 $Password=$PASSWORD;
 #print "document.writeln('|$BaseName|$TableName|$HostName|$UserName|$Password|')";
 $this->Name=$TableName;
 # read Fields
 $mylink=mysql_connect($HostName,$UserName,$Password) or die ("Could not connect to sql server");
 mysql_select_db($BaseName,$mylink) or die ("Could not locate database: $BaseName");
 #$query="select * from $TableName";
 $this->Database=$BaseName;
 $this->HostName=$HostName;
 $this->UserName=$UserName;
 $this->Password=$Password;
 $this->LinkId=$mylink;

 $result=mysql_query($query,$mylink) or die(mysql_error());
 $this->Size=mysql_num_rows($result);
 
 $table_def = mysql_query("SHOW FIELDS FROM $TableName",$mylink);
 /*for($i=0;$i<mysql_num_rows($table_def);$i++)
 {
 	print "$i:<BR>";
	$row_table_def = mysql_fetch_array($table_def);
 	#foreach ($row_table_def as $anItem)
	{
		print "Def:".$row_table_def[1]."<BR>";
	}
 }*/
 
 $field_index=0;
 while ($field_index<mysql_num_fields($result))
 {
   $this->Fields[$field_index]=mysql_field_name($result,$field_index);
   #$this->Types[$this->Fields[$field_index]]=mysql_field_type($result,$field_index);   
   $table_defs_array=mysql_fetch_array($table_def);
   $this->Types[$this->Fields[$field_index]]=$table_defs_array[1];   
   $this->Flags[$this->Fields[$field_index]]=mysql_field_flags($result,$field_index);   
   $this->Lengths[$this->Fields[$field_index]]=mysql_field_len($result,$field_index);   
   $field_index++;
 }
 $row_index=0;
 while ($row=mysql_fetch_array($result,MYSQL_ASSOC))
 {
    $this->Data[$row_index]=$row;
	$row_index++;
 }
 
 # read Data 
}# end of MySQLTable constructor

}# end of MySQLTable class


?>
