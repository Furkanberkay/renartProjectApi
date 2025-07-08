<?php
function getGoldPrice() {
    $apiKey = 'YOUR_API_KEY'; // https://www.goldapi.io adresinden alınır

    $url = "https://www.goldapi.io/api/XAU/USD";
    $headers = [
        "x-access-token: $apiKey",
        "Content-Type: application/json"
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);

    return $data['price'] ?? 70; // fallback default value
}
