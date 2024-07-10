const express = require('express');
const app = express();
const port = 3004;

// Middleware pour vérifier l'heure de la requête
const checkBusinessHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const hourOfDay = now.getHours();

  // Vérifier que c'est un jour de semaine (du lundi au vendredi)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Vérifier que l'heure est entre 9h et 17h
    if (hourOfDay >= 9 && hourOfDay < 17) {
      next(); // Heures de travail, continuer
    } else {
      res.send('Désolé, l\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
    }
  } else {
    res.send('Désolé, l\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
};

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static('public'));

// Middleware pour vérifier l'heure de la requête sur toutes les routes
app.use(checkBusinessHours);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
