<?php

include 'h5ai.php';

$Scanfolder = new H5AI($_GET['filePrompt']);

$array = array();

$fullPath = $_GET['filePrompt'];

$Scanfolder->getFiles($array,$Scanfolder->getPath());

$Scanfolder->printTree($Scanfolder->getTree(), $fullPath);

?>