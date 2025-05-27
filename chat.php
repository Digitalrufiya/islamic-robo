<?php
// chat.php
$api_key = "YOUR_OPENAI_API_KEY_HERE";
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
