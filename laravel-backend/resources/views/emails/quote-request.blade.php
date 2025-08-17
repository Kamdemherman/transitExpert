<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nouvelle demande de devis</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #1E40AF;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 8px 8px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .info-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #1E40AF;
        }
        .info-label {
            font-weight: bold;
            color: #1E40AF;
            margin-bottom: 5px;
        }
        .description {
            background: white;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📦 Nouvelle demande de devis</h1>
        <p>Référence: {{ $quote->reference_number }}</p>
    </div>

    <div class="content">
        <h2>Informations client</h2>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Entreprise</div>
                <div>{{ $quote->company }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Email</div>
                <div>{{ $quote->email }}</div>
            </div>
            @if($quote->phone)
            <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div>{{ $quote->phone }}</div>
            </div>
            @endif
            @if($quote->contact_name)
            <div class="info-item">
                <div class="info-label">Contact</div>
                <div>{{ $quote->contact_name }}</div>
            </div>
            @endif
        </div>

        <h2>Détails de l'expédition</h2>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Origine</div>
                <div>{{ $quote->origin }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Destination</div>
                <div>{{ $quote->destination }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Type de marchandise</div>
                <div>{{ $quote->cargo_type_label }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Urgence</div>
                <div>{{ $quote->urgency_label }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Poids</div>
                <div>{{ $quote->weight }} kg</div>
            </div>
            @if($quote->volume)
            <div class="info-item">
                <div class="info-label">Volume</div>
                <div>{{ $quote->volume }} m³</div>
            </div>
            @endif
        </div>

        @if($quote->description)
        <div class="description">
            <div class="info-label">Description</div>
            <p>{{ $quote->description }}</p>
        </div>
        @endif

        <div class="footer">
            <p><strong>Demande reçue le:</strong> {{ $quote->created_at->format('d/m/Y à H:i') }}</p>
            <p>Répondre dans les 2h ouvrées pour maintenir notre engagement qualité.</p>
        </div>
    </div>
</body>
</html>