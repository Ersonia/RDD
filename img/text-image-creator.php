<?php
require("mysqltable_lite.php");
echo "<h2>Dummy Image Creator</h2>";
$TABLE="images";
$query="select * from $TABLE";
$ImageProfiless=new MySQLTable("rdd",$TABLE,'localhost','root','tellnet6',$query);
$RandStart=150;
$Font='./DejaVuSansMono.ttf';
foreach ($ImageProfiless->Data as $anImageProfile)
{
    $ImageFileName=$anImageProfile[IMAGE_PARAM_1];
    if ($anImageProfile[IMAGE_PARAM_2]!="") $ImageFileName=$ImageFileName."_".$anImageProfile[IMAGE_PARAM_2];
    if ($anImageProfile[IMAGE_PARAM_3]!="") $ImageFileName=$ImageFileName."_".$anImageProfile[IMAGE_PARAM_3];
    if ($anImageProfile[IMAGE_PARAM_4]!="") $ImageFileName=$ImageFileName."_".$anImageProfile[IMAGE_PARAM_4];
    $ImageFileName=$ImageFileName."_".$anImageProfile[IMAGE_WIDTH]."x".$anImageProfile[IMAGE_HEIGHT].".".$anImageProfile[IMAGE_TYPE];
    switch ($anImageProfile[IMAGE_ACTION])
    {
        case 'DELETE':
            unlink($ImageFileName);
            break;
        case 'LEAVE':
            if (file_exists($ImageFileName))
                {
                    echo "Image $ImageFileName Not Changed<BR>";
                    echo "<img src='$ImageFileName'><BR><BR>"; 
                }
                else
                {
                    echo "Cannot leave file <b>$ImageFileName</B> it doesn't exist.";
                }
            break;
        default:
    $CurrentImage=imagecreatetruecolor($anImageProfile[IMAGE_WIDTH],$anImageProfile[IMAGE_HEIGHT]);
    //$CurrentImage=imagecreate ( 200 , 200);
    $BackgroundColour = imagecolorallocate($CurrentImage, rand($RandStart,255), rand($RandStart,255), rand($RandStart,255));
    imagefill($CurrentImage, 0, 0, $BackgroundColour);
    $TextColour=imagecolorallocate($CurrentImage, 255, 255, 255);
    $Text= $anImageProfile[IMAGE_PARAM_1]."\n";
    if ($anImageProfile[IMAGE_PARAM_2]!="") $Text.=$anImageProfile[IMAGE_PARAM_2]."\n";
    if ($anImageProfile[IMAGE_PARAM_3]!="") $Text.=$anImageProfile[IMAGE_PARAM_3]."\n";
    if ($anImageProfile[IMAGE_PARAM_4]!="") $Text.=$anImageProfile[IMAGE_PARAM_4]."\n";
    $Text.=$anImageProfile[IMAGE_WIDTH]."x".$anImageProfile[IMAGE_HEIGHT].".".$anImageProfile[IMAGE_TYPE];
    if ($anImageProfile[IMAGE_HEIGHT]<$anImageProfile[IMAGE_WIDTH])
    {
        $FontSize=$anImageProfile[IMAGE_HEIGHT]/15;
    }
    else
    {
        $FontSize=$anImageProfile[IMAGE_WIDTH]/15;        
    }
    Randomize($CurrentImage,$anImageProfile[IMAGE_WIDTH],$anImageProfile[IMAGE_HEIGHT],$RandStart);
    $BoundingBox=imagettftext($CurrentImage,$FontSize,0,10,$FontSize+20,-$TextColour,$Font,$Text);
    if ($anImageProfile[IMAGE_TYPE]=='jpeg')
    {
        $ImageCreated=imagejpeg($CurrentImage,$ImageFileName,30);           
    }
    else
    {
        $ImageCreated=imagepng($CurrentImage,$ImageFileName,0);
    }
    
    if ($ImageCreated) 
    {
        echo "Image $ImageFileName Created<BR>";
        echo "<img src='$ImageFileName'><BR><BR>";   
    }
    else
    {
    echo "Image $ImageFileName Failed to be Created<BR>";
    }
    }//end of switch
}

function Randomize($CurrentImage,$Width,$Height,$RandStart)
{
    $ImageThicknessResult=imagesetthickness ( $CurrentImage , 4);
    for ($j = 0; $j <= 50; $j++)
    {
        $CurrentColour=imagecolorallocate($CurrentImage, rand($RandStart,255), rand($RandStart,255), rand($RandStart,255));
        $ResultOfLineDraw=imageline ( $CurrentImage , rand(-100,$Width+100) , rand(-100,$Height+100)  , rand(-100,$Width+100)  , rand(-100,$Height+100)  , $CurrentColour );
  
    }
    for ($j = 0; $j <= 10; $j++)
    {
    //$ResultOfImageFilter=imagefilter ( $CurrentImage , IMG_FILTER_SELECTIVE_BLUR);
    //$ResultOfImageFilter=imagefilter ( $CurrentImage , IMG_FILTER_GAUSSIAN_BLUR);
    }
}
?>