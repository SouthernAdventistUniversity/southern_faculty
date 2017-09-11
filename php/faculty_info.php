<?php 
    require_once('simple_html_dom.php');
    $teacher = urlencode($_GET['teacher']);
    $html = file_get_html("https://myaccess.southern.edu/apps/CourseSchedule/Default.aspx?Term=F17&Title=&Page=4&pSort=CourseName&dSort=Ascending&Teacher=$teacher&Departments=Any&Credits=&MeetingDays=&MeetingStart=&GeneralEd=&Writing=&ServiceLearning=&CourseSubLevel=&Location=&HideFull=&XList=false&c=1"); 
    //print $html;
    $table = $html->find('.dataTable', 0);

    $count = -1;
    $labels = [];
    $data = [];

    foreach($table -> find('tr') as $tr) {
        if($count > -1) {
            $index = 0;
            foreach($tr -> find('td') as $td) {
                $text = trim($td -> plaintext);
                $important = trim(explode('  ', $text)[0]);
                $data[$count][$labels[$index]] = $important;
                $index++;
            }  
        }
        else {
            foreach($tr -> find('th') as $th) {
                array_push($labels, trim($th -> plaintext));
            }
        }
        $count++;
    }

    print json_encode($data);
?>