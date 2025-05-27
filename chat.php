<?php
// chat.php
$api_key = "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";
$input = json_decode(file_get_contents("php://input"), true);
$question = $input["question"] ?? "";

$data = [
  "model" => "gpt-3.5-turbo",
  "messages" => [["role" => "user", "content" => $question]],
  "temperature" => 0.7
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Bearer $api_key"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
$response = curl_exec($ch);
curl_close($ch);

$output = json_decode($response, true);
echo $output["choices"][0]["message"]["content"] ?? "Error: No response";
?>
