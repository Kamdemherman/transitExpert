@@ .. @@
     'from' => [
         'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
         'name' => env('MAIL_FROM_NAME', 'Example'),
     ],
+
+    /*
+    |--------------------------------------------------------------------------
+    | Admin Email Configuration
+    |--------------------------------------------------------------------------
+    |
+    | Email addresses for receiving notifications from the website
+    |
+    */
+
+    'admin_email' => env('ADMIN_EMAIL', 'contact@transitaire-expert.fr'),
+    'admin_name' => env('ADMIN_NAME', 'TransitExpert Admin'),
+    
+    'department_emails' => [
+        'quotes' => env('QUOTES_EMAIL', 'devis@transitaire-expert.fr'),
+        'contact' => env('CONTACT_EMAIL', 'contact@transitaire-expert.fr'),
+        'support' => env('SUPPORT_EMAIL', 'support@transitaire-expert.fr'),
+    ],