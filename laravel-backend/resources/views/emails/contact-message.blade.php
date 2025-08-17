<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nouveau message de contact</title>
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
        .message-content {
            background: white;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border: 1px solid #ddd;
        }
        .subject-badge {
            display: inline-block;
            background: #1E40AF;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin: 10px 0;
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
        <h1>💬 Nouveau message de contact</h1>
        <div class="subject-badge">{{ $contact->subject_label }}</div>
    </div>

    <div class="content">
        <h2>Informations de contact</h2>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Nom</div>
                <div>{{ $contact->name }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Email</div>
                <div>{{ $contact->email }}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Entreprise</div>
                <div>{{ $contact->company }}</div>
            </div>
            @if($contact->phone)
            <div class="info-item">
                <div class="info-label">Téléphone</div>
                <div>{{ $contact->phone }}</div>
            </div>
            @endif
        </div>

        <h2>Message</h2>
        <div class="message-content">
            <p>{{ nl2br(e($contact->message)) }}</p>
        </div>

        <div class="footer">
            <p><strong>Message reçu le:</strong> {{ $contact->created_at->format('d/m/Y à H:i') }}</p>
            <p><strong>Adresse IP:</strong> {{ $contact->ip_address }}</p>
            <p>Répondre dans les 2h ouvrées pour maintenir notre engagement qualité.</p>
        </div>
    </div>
</body>
</html>