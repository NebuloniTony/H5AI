<?php

$extension = substr($_GET['file'], strrpos($_GET['file'], "."));

if ($extension === ".png" || $extension === ".jpeg" || $extension === ".jpg" || $extension === '.ico' || $extension === '.gif' || $extension === '.jfif' && $extension !== '.mp3' && $extension !== '.mp4' ) {
    $src = str_replace(getcwd(), "", $_GET['file']);
    echo "<img src='" . $src . "'>";
    return;
}if ($extension === ".mp3")
{
    $src = str_replace(getcwd(), "", $_GET['file']);
    echo "<audio controls autoload>";
    echo "<source src='".$src."' type='audio/mpeg'>";
    echo "</audio>";
}elseif ($extension === ".mp4")
{
    $src = str_replace(getcwd(), "", $_GET['file']);
    echo "<video controls autoload>";
    echo "<source src='" .$src. "' type='video/mp4'>";
    echo "</video>";
}
 else {
   
    $file_content = file_get_contents($_GET['file']);
    $file_content = nl2br($file_content);
    $file_content = str_replace("   ", "&nbsp;&nbsp;&nbsp;&nbsp;", $file_content);
    echo $file_content;
}


