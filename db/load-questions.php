<?php

require_once('../include/config.php');

// deal with Mac line endings
ini_set('auto_detect_line_endings',TRUE);

$counter = 0;
$connect = mysqli_connect("127.0.0.1:3306", "root", "calvorm123", "exams");
// $result = mysqli_query($connect, "INSERT INTO exam1 (question,image, answer) VALUES ('Using the methods of sections, calculate the force in member DF and select the clower answer below to represent that force.','Q10.png','C');");
if ($connect == false) {
  echo "DID not work";
}
// echo($connect);
$result = mysqli_query($connect,"SELECT * FROM exam1");
// echo $result


$exam_questions_file = MEDIA_PATH . EXAM_QUESTIONS_FILE;
$exam_answers_file = MEDIA_PATH . EXAM_ANSWERS_FILE;
$games_questions_file = MEDIA_PATH . GAMES_QUESTIONS_FILE;
$games_answers_file = MEDIA_PATH . GAMES_ANSWERS_FILE;

$questionsJSON = '{"exam": {"pos": 0, "questions": [';


while($row = $result->fetch_assoc()){
    $counter++;
    $questionsJSON .= '{"id": ' . $row['question_id'] . ',';
    $questionsJSON .= '"text": "' . preg_replace('/[[:^print:]]/', '', $row['question']) . '",';

    if($row['image'] !== 'NULL'){
      $questionsJSON .= '"image": "' . $row['image'] . '",';
    }
    else{
      $questionsJSON .= '"image": "' . '""' . '",';
    }
    $questionsJSON .= '"correct": "' . $row['answer'] . '",';
    $questionsJSON .= '"answers": [';
    $sql = "SELECT * FROM answers1 WHERE question_id = " .  $row['question_id'];
    $answers = mysqli_query($connect,$sql);

    while($ans = $answers->fetch_assoc()){
      $questionsJSON .= '"' . $ans['answer'] . '",';
    }
    $questionsJSON = rtrim($questionsJSON, ',');
    $questionsJSON .= ']},';


}
$questionsJSON = rtrim($questionsJSON, ',');
$questionsJSON .= '], "total":' . $counter . '},';

// working with the exam files
// if (($exam_handle = fopen($exam_questions_file, "r")) !== FALSE) {
//
//     while (($data = fgetcsv($exam_handle, 1000, ",")) !== FALSE) {
//         $totalWords = count($data);
//         // echo "<p> $data[0]: $data[1] </p>";
//         $counter++;
//
//         if ($data[0] !== '') {
//             $questionsJSON .= '{"id": ' . $data[0] . ',';
//             $questionsJSON .= '"text": "' . preg_replace('/[[:^print:]]/', '', $data[1]) . '",';
//             $questionsJSON .= '"image": "' . $data[2] . '",';
//             $questionsJSON .= '"correct": "' . $data[3] . '",';
//             $questionsJSON .= '"answers": [';
//
//             if (($answerHandle = fopen($exam_answers_file, "r")) !== FALSE) {
//
//                 while (($answerData = fgetcsv($answerHandle, 1000, ",")) !== FALSE) {
//                     if ($answerData[0] == $data[0]) {
//                         $questionsJSON .= '"' . $answerData[1] . '",';
//                     }
//                 }
//
//                 $questionsJSON = rtrim($questionsJSON, ',');
//                 $questionsJSON .= ']},';
//                 fclose($answerHandle);
//             }
//         }
//     }
//
//     $questionsJSON = rtrim($questionsJSON, ',');
//     $questionsJSON .= '], "total":' . $counter . '},';
//
//     fclose($exam_handle);
// }

$questionsJSON .= '"games": {"pos": 0, "questions": [';
$counter = 0;

// working with the games files
if (($exam_handle = fopen($games_questions_file, "r")) !== FALSE) {

    while (($data = fgetcsv($exam_handle, 1000, ",")) !== FALSE) {
        $totalWords = count($data);
        // echo "<p> $data[0]: $data[1] </p>";
        $counter++;

        if ($data[0] !== '') {
            $questionsJSON .= '{"id": ' . $data[0] . ',';
            $questionsJSON .= '"text": "' . $data[1] . '",';
            $questionsJSON .= '"image": "' . $data[2] . '",';
            $questionsJSON .= '"answers": [';

            if (($answerHandle = fopen($games_answers_file, "r")) !== FALSE) {

                while (($answerData = fgetcsv($answerHandle, 1000, ",")) !== FALSE) {
                    if ($answerData[0] == $data[0]) {
                        $questionsJSON .= '"' . $answerData[1] . '",';
                    }
                }

                $questionsJSON = rtrim($questionsJSON, ',');
                $questionsJSON .= ']},';
                fclose($answerHandle);
            }
        }
    }

    $questionsJSON = rtrim($questionsJSON, ',');
    $questionsJSON .= '], "total":' . $counter . '}}';

    fclose($exam_handle);
}

// echo "<br><b>Total processed: " . $counter . "</b><br>";
echo $questionsJSON;

?>
