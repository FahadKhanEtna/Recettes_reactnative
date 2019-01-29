## INSTALLATION

---

## Api

1. Ouvrir votre terminal.
2. Aller dans le dossier recettes_reactnative/api.
3. Faire "npm install express".
4. Faire "npm install mysql".
5. Faire "npm install body-parser".

---

## Mysql

1. Lancer wamp.
2. Aller sur http://localhost/phpmyadmin/.
3. Créer une nouvelle table.
4. Importer le fichier recettes_reactnative/données/fablife.sql
5. Ouvrir le fichier recettes_reactnative/api/api.js.
6. Remplacer les données de la ligne 16 à 20 par vos informations.

---

## application

1. Ouvrir votre termianl.
2. Aller dans recettes_reactnative/application.
3. Faire "npm install".

---

## ngrok

1. Lancer l'application recettes_reactnative/ngrok/ngrok.exe (une fois lancer, ne plus fermer ce terminal durant toute l'utilisation de l'application).
2. Faire "ngrok http 8080", cette manoeuvre permet de rendre votre votre localhost:8080 public temporairement. Nous aons besoin de rendre notre api qui est lancée sur le port 8080 public pour que l'application puisse y acceder.
3. Ouvrir recettes_reactnative/application/components/api.js.
4. Remplacer la valeur de const Api par l'url généré par ngrok (http://************.ngrok.io")

---

## LANCER L'APPLICATION

---

1. Ouvrir votre terminal.
2. Aller dans recettes_reactnative/application.
3. Faire "npm start".
4. Une page web s'ouvre automatiquement, si ce n'est pas le cas ouvrir la page manuelement "http://localhost:19002/".
5. Lancer l'application sur un émulateur en cliquant sur "run on emulateur" à gauche de la page, ou scanner le QR Code avec votre téléphone.

---

## FONCTIONNEMENT

---

1. La première page affiche tous les menus disponibles(vide au démarrage).
2. Cliquer sur le bouton ajouter un menu.
3. Compléter les différentes étapes de la création du menu.
4. Vous arrivez ensuite une page vous indiquant que votre menu à été ajouté avec succés.
5. Un menu est maintenant disponible sur la page d'accueil.
6. Vous pouvez cliquer sur le bouton "datails" se trouvant a coté du menu pour voir les détails du menu. 