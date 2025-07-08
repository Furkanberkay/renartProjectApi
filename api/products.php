<?php
header('Content-Type: application/json');

// 1. products.json'u oku
$productsJson = file_get_contents(__DIR__ . '/../data/products.json');
$products = json_decode($productsJson, true);

// 2. gold price al
require_once(__DIR__ . '/../config/gold_price.php');
$goldPrice = getGoldPrice();

// 3. ürünler için fiyat hesapla
foreach ($products as &$product) {
    $score = $product['popularityScore'];
    $weight = $product['weight'];
    $product['price'] = round(($score + 1) * $weight * $goldPrice, 2);
}

// 4. çıktı ver
echo json_encode($products);
