# 🔐 Guide de Sécurité - NexusBot

## ⚠️ IMPORTANT : Protection des Secrets

Ce document explique comment sécuriser vos tokens et informations sensibles.

## 📋 Variables d'Environnement

### Configuration Locale

1. **Copiez le fichier exemple** :
   ```bash
   cp .env.example .env
   ```

2. **Remplissez vos informations** dans `.env` :
   ```env
   DISCORD_TOKEN=votre_token_ici
   CLIENT_ID=votre_client_id
   MONGODB_URI=votre_uri_mongodb
   ```

3. **Ne JAMAIS commiter `.env`** - Il est déjà dans `.gitignore`

### Vérification

Avant de push sur GitHub, vérifiez :
```bash
git status
```

Le fichier `.env` ne doit PAS apparaître dans la liste.

## 🔒 GitHub Secrets

Pour les déploiements automatisés (GitHub Actions), utilisez les Secrets GitHub :

1. Allez dans votre repo GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**
4. Ajoutez chaque variable :

| Nom du Secret | Description |
|---------------|-------------|
| `DISCORD_TOKEN` | Token de votre bot Discord |
| `CLIENT_ID` | ID de l'application Discord |
| `MONGODB_URI` | URI de connexion MongoDB |
| `API_SECRET` | Clé secrète pour l'API |

## 🚀 Déploiement Sécurisé

### Railway

1. Connectez votre repo GitHub
2. Dans **Variables**, ajoutez :
   - `DISCORD_TOKEN`
   - `CLIENT_ID`
   - `MONGODB_URI`

### Heroku

```bash
heroku config:set DISCORD_TOKEN=votre_token
heroku config:set CLIENT_ID=votre_client_id
heroku config:set MONGODB_URI=votre_mongodb_uri
```

### VPS (PM2)

Créez un fichier `ecosystem.config.js` :
```javascript
module.exports = {
  apps: [{
    name: 'nexusbot',
    script: 'index.js',
    env: {
      DISCORD_TOKEN: 'votre_token',
      CLIENT_ID: 'votre_client_id',
      MONGODB_URI: 'votre_mongodb_uri'
    }
  }]
}
```

⚠️ **N'ajoutez PAS ce fichier à Git !**

## 🔄 Rotation des Tokens

Si votre token est compromis :

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Sélectionnez votre application → **Bot**
3. Cliquez sur **Reset Token**
4. Mettez à jour votre `.env` et vos secrets de déploiement

## 📁 Structure des Fichiers Sensibles

```
nexusbot/
├── .env                 # ❌ NE PAS COMMITER
├── .env.example         # ✅ Template sans valeurs
├── .gitignore          # ✅ Protège .env
├── bot/
│   ├── .env            # ❌ NE PAS COMMITER
│   └── config.json     # ❌ NE PAS COMMITER (si contient des secrets)
└── SECURITY.md         # ✅ Ce fichier
```

## ✅ Checklist de Sécurité

- [ ] `.env` est dans `.gitignore`
- [ ] Aucun token dans le code source
- [ ] Utilisation de `process.env` pour les secrets
- [ ] Secrets configurés sur la plateforme de déploiement
- [ ] Token régénéré si exposé publiquement

## 🆘 En cas de fuite de Token

1. **Régénérez immédiatement** le token sur Discord Developer Portal
2. **Vérifiez les logs** de votre bot pour détecter une utilisation malveillante
3. **Mettez à jour** tous vos déploiements avec le nouveau token
4. **Auditez** votre historique Git : `git log --all --full-history -- "**/.*env*"`

## 📞 Support

Si vous avez des questions sur la sécurité, ouvrez une issue privée ou contactez-nous.
