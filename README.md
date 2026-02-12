# NexusBot - Bot Discord Tout-en-Un

![NexusBot Banner](https://img.shields.io/badge/NexusBot-v2.0-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Security](https://img.shields.io/badge/Secrets-Protected-success?style=for-the-badge&logo=github&logoColor=white)

Un bot Discord puissant et complet avec dashboard web intégré. Modération, musique, niveaux, économie, giveaways et bien plus encore !

> 🔐 **Sécurité** : Les tokens et secrets sont protégés via des variables d'environnement. Voir [SECURITY.md](SECURITY.md)

## ✨ Fonctionnalités

- 🛡️ **Modération Avancée** - Auto-mod, anti-spam, anti-raid, warns, bans, kicks, mutes
- 🎵 **Musique HD** - YouTube, Spotify, SoundCloud avec qualité 320kbps
- 📊 **Système de Niveaux** - XP, classements, récompenses de rôles
- 💰 **Économie** - Daily, work, shop, balance
- 🎁 **Giveaways** - Créez des concours facilement
- 🎫 **Tickets** - Système de support complet
- 👋 **Bienvenue** - Messages personnalisables avec embeds
- 📝 **Logs** - Historique complet des événements
- ⚙️ **Dashboard Web** - Interface moderne pour tout configurer

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Un bot Discord créé sur le [Discord Developer Portal](https://discord.com/developers/applications)

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/nexusbot.git
cd nexusbot
```

### 2. Installer les dépendances du Dashboard

```bash
npm install
```

### 3. Lancer le Dashboard

```bash
npm run dev
```

### 4. Build pour production

```bash
npm run build
```

## 🤖 Code du Bot Discord.js

Créez un nouveau dossier `bot/` et ajoutez les fichiers suivants :

### `bot/package.json`

```json
{
  "name": "nexusbot",
  "version": "2.0.0",
  "description": "Bot Discord tout-en-un",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "discord.js": "^14.14.1",
    "@discordjs/voice": "^0.16.1",
    "@discordjs/opus": "^0.9.0",
    "ytdl-core": "^4.11.5",
    "play-dl": "^1.9.7",
    "mongoose": "^8.0.3",
    "dotenv": "^16.3.1",
    "ms": "^2.1.3"
  }
}
```

### `bot/.env`

⚠️ **IMPORTANT : Ne jamais commiter ce fichier !**

Copiez `.env.example` vers `.env` et remplissez avec vos vraies valeurs :

```env
# Récupérez votre token sur https://discord.com/developers/applications
DISCORD_TOKEN=votre_token_discord_ici

# URI de votre base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/nexusbot

# Client ID de votre application Discord
CLIENT_ID=votre_client_id_ici

# ID de votre serveur de développement (optionnel)
GUILD_ID=votre_guild_id
```

📖 Voir [SECURITY.md](SECURITY.md) pour les bonnes pratiques de sécurité.

### `bot/index.js`

```javascript
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const mongoose = require('mongoose');

// Création du client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();

// ============ SCHEMAS MONGOOSE ============

const userSchema = new mongoose.Schema({
  odiscordId: String,
  guildId: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  balance: { type: Number, default: 0 },
  dailyStreak: { type: Number, default: 0 },
  lastDaily: Date,
  lastWork: Date,
  warnings: [{ reason: String, moderator: String, date: Date }],
});

const guildSchema = new mongoose.Schema({
  guildId: String,
  prefix: { type: String, default: '!' },
  welcomeChannel: String,
  welcomeMessage: String,
  leaveChannel: String,
  leaveMessage: String,
  logChannel: String,
  levelUpChannel: String,
  autoMod: {
    antiSpam: { type: Boolean, default: true },
    antiLinks: { type: Boolean, default: false },
    antiInvites: { type: Boolean, default: true },
    maxMentions: { type: Number, default: 5 },
  },
  levelRewards: [{ level: Number, roleId: String }],
});

const giveawaySchema = new mongoose.Schema({
  messageId: String,
  channelId: String,
  guildId: String,
  prize: String,
  winners: Number,
  endTime: Date,
  ended: { type: Boolean, default: false },
  participants: [String],
});

const User = mongoose.model('User', userSchema);
const Guild = mongoose.model('Guild', guildSchema);
const Giveaway = mongoose.model('Giveaway', giveawaySchema);

// ============ COMMANDES ============

const commands = [
  // ===== UTILITAIRES =====
  {
    name: 'help',
    description: 'Affiche la liste des commandes',
    options: [{
      name: 'commande',
      description: 'Commande spécifique',
      type: 3,
      required: false,
    }],
    execute: async (interaction) => {
      const embed = new EmbedBuilder()
        .setTitle('📚 Commandes NexusBot')
        .setColor('#5865F2')
        .addFields(
          { name: '🛡️ Modération', value: '`/ban` `/kick` `/mute` `/warn` `/clear`', inline: true },
          { name: '🎵 Musique', value: '`/play` `/skip` `/stop` `/queue`', inline: true },
          { name: '📊 Niveaux', value: '`/level` `/leaderboard`', inline: true },
          { name: '💰 Économie', value: '`/daily` `/work` `/balance` `/shop`', inline: true },
          { name: '🎁 Giveaways', value: '`/giveaway`', inline: true },
          { name: '⚙️ Utilitaires', value: '`/help` `/serverinfo` `/userinfo`', inline: true },
        )
        .setFooter({ text: 'NexusBot v2.0' });
      await interaction.reply({ embeds: [embed] });
    },
  },
  
  {
    name: 'serverinfo',
    description: 'Affiche les informations du serveur',
    execute: async (interaction) => {
      const { guild } = interaction;
      const embed = new EmbedBuilder()
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL())
        .setColor('#5865F2')
        .addFields(
          { name: '👑 Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
          { name: '👥 Membres', value: `${guild.memberCount}`, inline: true },
          { name: '📅 Créé le', value: guild.createdAt.toLocaleDateString('fr-FR'), inline: true },
          { name: '💬 Salons', value: `${guild.channels.cache.size}`, inline: true },
          { name: '🎭 Rôles', value: `${guild.roles.cache.size}`, inline: true },
          { name: '😀 Emojis', value: `${guild.emojis.cache.size}`, inline: true },
        );
      await interaction.reply({ embeds: [embed] });
    },
  },

  {
    name: 'userinfo',
    description: 'Affiche les informations d\'un utilisateur',
    options: [{
      name: 'utilisateur',
      description: 'L\'utilisateur',
      type: 6,
      required: false,
    }],
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur') || interaction.user;
      const member = await interaction.guild.members.fetch(user.id);
      const embed = new EmbedBuilder()
        .setTitle(user.tag)
        .setThumbnail(user.displayAvatarURL())
        .setColor(member.displayHexColor || '#5865F2')
        .addFields(
          { name: '🆔 ID', value: user.id, inline: true },
          { name: '📅 Compte créé', value: user.createdAt.toLocaleDateString('fr-FR'), inline: true },
          { name: '📥 A rejoint', value: member.joinedAt.toLocaleDateString('fr-FR'), inline: true },
          { name: '🎭 Rôles', value: member.roles.cache.map(r => r.name).slice(0, 10).join(', ') || 'Aucun' },
        );
      await interaction.reply({ embeds: [embed] });
    },
  },

  // ===== MODÉRATION =====
  {
    name: 'ban',
    description: 'Bannit un utilisateur',
    options: [
      { name: 'utilisateur', description: 'L\'utilisateur à bannir', type: 6, required: true },
      { name: 'raison', description: 'Raison du ban', type: 3, required: false },
    ],
    defaultMemberPermissions: PermissionFlagsBits.BanMembers,
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur');
      const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
      
      try {
        await interaction.guild.members.ban(user, { reason });
        const embed = new EmbedBuilder()
          .setTitle('🔨 Utilisateur banni')
          .setColor('#ED4245')
          .addFields(
            { name: 'Utilisateur', value: user.tag, inline: true },
            { name: 'Modérateur', value: interaction.user.tag, inline: true },
            { name: 'Raison', value: reason },
          );
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        await interaction.reply({ content: '❌ Impossible de bannir cet utilisateur.', ephemeral: true });
      }
    },
  },

  {
    name: 'kick',
    description: 'Expulse un utilisateur',
    options: [
      { name: 'utilisateur', description: 'L\'utilisateur à expulser', type: 6, required: true },
      { name: 'raison', description: 'Raison', type: 3, required: false },
    ],
    defaultMemberPermissions: PermissionFlagsBits.KickMembers,
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur');
      const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
      const member = await interaction.guild.members.fetch(user.id);
      
      try {
        await member.kick(reason);
        const embed = new EmbedBuilder()
          .setTitle('👢 Utilisateur expulsé')
          .setColor('#FEE75C')
          .addFields(
            { name: 'Utilisateur', value: user.tag, inline: true },
            { name: 'Modérateur', value: interaction.user.tag, inline: true },
            { name: 'Raison', value: reason },
          );
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        await interaction.reply({ content: '❌ Impossible d\'expulser cet utilisateur.', ephemeral: true });
      }
    },
  },

  {
    name: 'mute',
    description: 'Rend muet un utilisateur',
    options: [
      { name: 'utilisateur', description: 'L\'utilisateur', type: 6, required: true },
      { name: 'durée', description: 'Durée (ex: 10m, 1h, 1d)', type: 3, required: true },
      { name: 'raison', description: 'Raison', type: 3, required: false },
    ],
    defaultMemberPermissions: PermissionFlagsBits.ModerateMembers,
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur');
      const duration = interaction.options.getString('durée');
      const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
      const member = await interaction.guild.members.fetch(user.id);
      
      const ms = require('ms');
      const time = ms(duration);
      
      if (!time || time > 28 * 24 * 60 * 60 * 1000) {
        return interaction.reply({ content: '❌ Durée invalide (max 28 jours)', ephemeral: true });
      }
      
      try {
        await member.timeout(time, reason);
        const embed = new EmbedBuilder()
          .setTitle('🔇 Utilisateur mute')
          .setColor('#FEE75C')
          .addFields(
            { name: 'Utilisateur', value: user.tag, inline: true },
            { name: 'Durée', value: duration, inline: true },
            { name: 'Raison', value: reason },
          );
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        await interaction.reply({ content: '❌ Impossible de mute cet utilisateur.', ephemeral: true });
      }
    },
  },

  {
    name: 'warn',
    description: 'Avertit un utilisateur',
    options: [
      { name: 'utilisateur', description: 'L\'utilisateur', type: 6, required: true },
      { name: 'raison', description: 'Raison', type: 3, required: true },
    ],
    defaultMemberPermissions: PermissionFlagsBits.ModerateMembers,
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur');
      const reason = interaction.options.getString('raison');
      
      await User.findOneAndUpdate(
        { odiscordId: user.id, guildId: interaction.guild.id },
        { 
          $push: { 
            warnings: { 
              reason, 
              moderator: interaction.user.tag, 
              date: new Date() 
            } 
          } 
        },
        { upsert: true }
      );
      
      const embed = new EmbedBuilder()
        .setTitle('⚠️ Avertissement')
        .setColor('#FEE75C')
        .addFields(
          { name: 'Utilisateur', value: user.tag, inline: true },
          { name: 'Modérateur', value: interaction.user.tag, inline: true },
          { name: 'Raison', value: reason },
        );
      await interaction.reply({ embeds: [embed] });
    },
  },

  {
    name: 'clear',
    description: 'Supprime des messages',
    options: [{
      name: 'nombre',
      description: 'Nombre de messages (1-100)',
      type: 4,
      required: true,
      minValue: 1,
      maxValue: 100,
    }],
    defaultMemberPermissions: PermissionFlagsBits.ManageMessages,
    execute: async (interaction) => {
      const amount = interaction.options.getInteger('nombre');
      const deleted = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ 
        content: `🗑️ ${deleted.size} messages supprimés.`, 
        ephemeral: true 
      });
    },
  },

  // ===== NIVEAUX =====
  {
    name: 'level',
    description: 'Affiche votre niveau',
    options: [{
      name: 'utilisateur',
      description: 'L\'utilisateur',
      type: 6,
      required: false,
    }],
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur') || interaction.user;
      let userData = await User.findOne({ odiscordId: user.id, guildId: interaction.guild.id });
      
      if (!userData) {
        userData = { xp: 0, level: 1 };
      }
      
      const xpNeeded = userData.level * 100;
      const progress = Math.floor((userData.xp / xpNeeded) * 20);
      const progressBar = '█'.repeat(progress) + '░'.repeat(20 - progress);
      
      const embed = new EmbedBuilder()
        .setTitle(`📊 Niveau de ${user.username}`)
        .setThumbnail(user.displayAvatarURL())
        .setColor('#5865F2')
        .addFields(
          { name: '⭐ Niveau', value: `${userData.level}`, inline: true },
          { name: '✨ XP', value: `${userData.xp}/${xpNeeded}`, inline: true },
          { name: '📈 Progression', value: `\`${progressBar}\`` },
        );
      await interaction.reply({ embeds: [embed] });
    },
  },

  {
    name: 'leaderboard',
    description: 'Affiche le classement',
    execute: async (interaction) => {
      const users = await User.find({ guildId: interaction.guild.id })
        .sort({ level: -1, xp: -1 })
        .limit(10);
      
      const leaderboard = users.map((u, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
        return `${medal} <@${u.odiscordId}> - Niveau ${u.level} (${u.xp} XP)`;
      }).join('\n');
      
      const embed = new EmbedBuilder()
        .setTitle('🏆 Classement')
        .setColor('#FFD700')
        .setDescription(leaderboard || 'Aucune donnée');
      await interaction.reply({ embeds: [embed] });
    },
  },

  // ===== ÉCONOMIE =====
  {
    name: 'daily',
    description: 'Réclamez votre récompense quotidienne',
    execute: async (interaction) => {
      let userData = await User.findOne({ 
        odiscordId: interaction.user.id, 
        guildId: interaction.guild.id 
      });
      
      if (!userData) {
        userData = new User({
          odiscordId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
      
      const now = new Date();
      const lastDaily = userData.lastDaily ? new Date(userData.lastDaily) : null;
      
      if (lastDaily && now - lastDaily < 24 * 60 * 60 * 1000) {
        const timeLeft = 24 * 60 * 60 * 1000 - (now - lastDaily);
        const hours = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        return interaction.reply({ 
          content: `⏰ Revenez dans ${hours}h ${minutes}m`, 
          ephemeral: true 
        });
      }
      
      const reward = 100 + Math.floor(Math.random() * 100);
      userData.balance += reward;
      userData.lastDaily = now;
      userData.dailyStreak = (lastDaily && now - lastDaily < 48 * 60 * 60 * 1000) 
        ? userData.dailyStreak + 1 
        : 1;
      
      const bonus = userData.dailyStreak * 10;
      userData.balance += bonus;
      await userData.save();
      
      const embed = new EmbedBuilder()
        .setTitle('💰 Récompense quotidienne')
        .setColor('#57F287')
        .setDescription(`Vous avez reçu **${reward + bonus}** coins !`)
        .addFields(
          { name: '🔥 Série', value: `${userData.dailyStreak} jours`, inline: true },
          { name: '💎 Bonus', value: `+${bonus} coins`, inline: true },
          { name: '💵 Solde', value: `${userData.balance} coins`, inline: true },
        );
      await interaction.reply({ embeds: [embed] });
    },
  },

  {
    name: 'balance',
    description: 'Affiche votre solde',
    options: [{
      name: 'utilisateur',
      description: 'L\'utilisateur',
      type: 6,
      required: false,
    }],
    execute: async (interaction) => {
      const user = interaction.options.getUser('utilisateur') || interaction.user;
      const userData = await User.findOne({ 
        odiscordId: user.id, 
        guildId: interaction.guild.id 
      });
      
      const balance = userData?.balance || 0;
      
      const embed = new EmbedBuilder()
        .setTitle(`💰 Solde de ${user.username}`)
        .setThumbnail(user.displayAvatarURL())
        .setColor('#57F287')
        .setDescription(`**${balance.toLocaleString()}** coins`);
      await interaction.reply({ embeds: [embed] });
    },
  },

  {
    name: 'work',
    description: 'Travaillez pour gagner des coins',
    execute: async (interaction) => {
      let userData = await User.findOne({ 
        odiscordId: interaction.user.id, 
        guildId: interaction.guild.id 
      });
      
      if (!userData) {
        userData = new User({
          odiscordId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
      
      const now = new Date();
      const lastWork = userData.lastWork ? new Date(userData.lastWork) : null;
      
      if (lastWork && now - lastWork < 60 * 60 * 1000) {
        const timeLeft = 60 * 60 * 1000 - (now - lastWork);
        const minutes = Math.floor(timeLeft / (60 * 1000));
        return interaction.reply({ 
          content: `⏰ Revenez dans ${minutes} minutes`, 
          ephemeral: true 
        });
      }
      
      const jobs = ['développeur', 'designer', 'streamer', 'musicien', 'artiste'];
      const job = jobs[Math.floor(Math.random() * jobs.length)];
      const earnings = 50 + Math.floor(Math.random() * 150);
      
      userData.balance += earnings;
      userData.lastWork = now;
      await userData.save();
      
      const embed = new EmbedBuilder()
        .setTitle('💼 Travail')
        .setColor('#5865F2')
        .setDescription(`Vous avez travaillé comme **${job}** et gagné **${earnings}** coins !`)
        .addFields({ name: '💵 Nouveau solde', value: `${userData.balance} coins` });
      await interaction.reply({ embeds: [embed] });
    },
  },

  // ===== GIVEAWAYS =====
  {
    name: 'giveaway',
    description: 'Gérer les giveaways',
    options: [
      {
        name: 'start',
        description: 'Démarre un giveaway',
        type: 1,
        options: [
          { name: 'prix', description: 'Le prix à gagner', type: 3, required: true },
          { name: 'durée', description: 'Durée (ex: 1h, 1d)', type: 3, required: true },
          { name: 'gagnants', description: 'Nombre de gagnants', type: 4, required: false },
        ],
      },
      {
        name: 'end',
        description: 'Termine un giveaway',
        type: 1,
        options: [
          { name: 'message_id', description: 'ID du message du giveaway', type: 3, required: true },
        ],
      },
    ],
    defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
    execute: async (interaction) => {
      const subcommand = interaction.options.getSubcommand();
      
      if (subcommand === 'start') {
        const prize = interaction.options.getString('prix');
        const duration = interaction.options.getString('durée');
        const winners = interaction.options.getInteger('gagnants') || 1;
        
        const ms = require('ms');
        const time = ms(duration);
        
        if (!time) {
          return interaction.reply({ content: '❌ Durée invalide', ephemeral: true });
        }
        
        const endTime = new Date(Date.now() + time);
        
        const embed = new EmbedBuilder()
          .setTitle('🎉 GIVEAWAY')
          .setColor('#EB459E')
          .setDescription(`**${prize}**\n\nRéagissez avec 🎉 pour participer !`)
          .addFields(
            { name: '⏰ Fin', value: `<t:${Math.floor(endTime.getTime() / 1000)}:R>`, inline: true },
            { name: '👑 Gagnants', value: `${winners}`, inline: true },
            { name: '🎫 Participants', value: '0', inline: true },
          )
          .setFooter({ text: `Organisé par ${interaction.user.tag}` });
        
        await interaction.reply({ content: '🎉 Giveaway créé !', ephemeral: true });
        const msg = await interaction.channel.send({ embeds: [embed] });
        await msg.react('🎉');
        
        await new Giveaway({
          messageId: msg.id,
          channelId: interaction.channel.id,
          guildId: interaction.guild.id,
          prize,
          winners,
          endTime,
        }).save();
      }
      
      if (subcommand === 'end') {
        const messageId = interaction.options.getString('message_id');
        const giveaway = await Giveaway.findOne({ messageId, ended: false });
        
        if (!giveaway) {
          return interaction.reply({ content: '❌ Giveaway introuvable', ephemeral: true });
        }
        
        const channel = await client.channels.fetch(giveaway.channelId);
        const message = await channel.messages.fetch(giveaway.messageId);
        const reaction = message.reactions.cache.get('🎉');
        const users = await reaction.users.fetch();
        const participants = users.filter(u => !u.bot).map(u => u.id);
        
        if (participants.length === 0) {
          return interaction.reply({ content: '❌ Aucun participant', ephemeral: true });
        }
        
        const winnerIds = [];
        for (let i = 0; i < Math.min(giveaway.winners, participants.length); i++) {
          const winnerId = participants.splice(Math.floor(Math.random() * participants.length), 1)[0];
          winnerIds.push(winnerId);
        }
        
        giveaway.ended = true;
        await giveaway.save();
        
        const winnerMentions = winnerIds.map(id => `<@${id}>`).join(', ');
        await interaction.reply({ 
          content: `🎉 Félicitations ${winnerMentions} ! Vous avez gagné **${giveaway.prize}** !` 
        });
      }
    },
  },

  // ===== FUN =====
  {
    name: '8ball',
    description: 'Posez une question au 8ball',
    options: [{
      name: 'question',
      description: 'Votre question',
      type: 3,
      required: true,
    }],
    execute: async (interaction) => {
      const responses = [
        'Oui, absolument !', 'Non, jamais.', 'Peut-être...', 'C\'est certain !',
        'J\'en doute fort.', 'Les signes pointent vers oui.', 'Demande plus tard.',
        'Concentre-toi et redemande.', 'Sans aucun doute.', 'Mes sources disent non.',
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      const embed = new EmbedBuilder()
        .setTitle('🎱 8Ball')
        .setColor('#9B59B6')
        .addFields(
          { name: '❓ Question', value: interaction.options.getString('question') },
          { name: '🔮 Réponse', value: response },
        );
      await interaction.reply({ embeds: [embed] });
    },
  },
];

// ============ ÉVÉNEMENTS ============

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} est en ligne !`);
  client.user.setActivity('/help | nexusbot.app', { type: 'WATCHING' });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  const command = commands.find(cmd => cmd.name === interaction.commandName);
  if (!command) return;
  
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ 
      content: '❌ Une erreur est survenue.', 
      ephemeral: true 
    });
  }
});

// XP System
client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;
  
  let userData = await User.findOne({ 
    odiscordId: message.author.id, 
    guildId: message.guild.id 
  });
  
  if (!userData) {
    userData = new User({
      odiscordId: message.author.id,
      guildId: message.guild.id,
    });
  }
  
  const xpGain = Math.floor(Math.random() * 10) + 15;
  userData.xp += xpGain;
  
  const xpNeeded = userData.level * 100;
  if (userData.xp >= xpNeeded) {
    userData.level += 1;
    userData.xp = 0;
    
    const embed = new EmbedBuilder()
      .setTitle('🎉 Level Up !')
      .setColor('#FFD700')
      .setDescription(`Félicitations ${message.author} ! Tu es maintenant niveau **${userData.level}** !`);
    message.channel.send({ embeds: [embed] });
  }
  
  await userData.save();
});

// Welcome System
client.on('guildMemberAdd', async (member) => {
  const guildData = await Guild.findOne({ guildId: member.guild.id });
  if (!guildData?.welcomeChannel) return;
  
  const channel = member.guild.channels.cache.get(guildData.welcomeChannel);
  if (!channel) return;
  
  const message = (guildData.welcomeMessage || 'Bienvenue {user} sur {server} !')
    .replace('{user}', member.toString())
    .replace('{server}', member.guild.name)
    .replace('{memberCount}', member.guild.memberCount);
  
  const embed = new EmbedBuilder()
    .setTitle('👋 Bienvenue !')
    .setDescription(message)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor('#57F287');
  
  channel.send({ embeds: [embed] });
});

// ============ DÉMARRAGE ============

async function start() {
  // Connexion à MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error);
  }
  
  // Enregistrement des commandes slash
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  
  try {
    console.log('🔄 Enregistrement des commandes...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands.map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        options: cmd.options,
        default_member_permissions: cmd.defaultMemberPermissions?.toString(),
      })) }
    );
    console.log('✅ Commandes enregistrées !');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
  
  // Connexion à Discord
  await client.login(process.env.DISCORD_TOKEN);
}

start();
```

## 📁 Structure du projet

```
nexusbot/
├── .github/
│   └── workflows/
│       └── deploy.yml      # 🔐 GitHub Actions (utilise les secrets)
├── bot/                    # Code du bot Discord
│   ├── index.js           # Fichier principal du bot
│   ├── package.json       # Dépendances du bot
│   ├── .env.example       # 📋 Template des variables
│   └── .env               # ❌ NE PAS COMMITER (dans .gitignore)
├── src/                    # Code source du dashboard
│   ├── components/        # Composants React
│   ├── pages/             # Pages du dashboard
│   ├── data/              # Données mock
│   ├── types/             # Types TypeScript
│   └── App.tsx            # Composant principal
├── .env.example           # 📋 Template des variables
├── .env                   # ❌ NE PAS COMMITER
├── .gitignore             # 🔐 Protège les fichiers sensibles
├── SECURITY.md            # 📖 Guide de sécurité
├── package.json           # Dépendances du dashboard
└── README.md              # Documentation
```

## 🔧 Configuration du Bot

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application
3. Dans "Bot", créez un bot et copiez le token
4. **Configurez les secrets** (voir ci-dessous)
5. Dans "OAuth2 > URL Generator":
   - Scopes: `bot`, `applications.commands`
   - Permissions: `Administrator` (ou personnalisez)
6. Utilisez l'URL générée pour inviter le bot

### 🔐 Configuration des Secrets

#### En Local
```bash
# Copiez le template
cp bot/.env.example bot/.env

# Éditez avec vos valeurs
nano bot/.env
```

#### Sur GitHub (pour CI/CD)
1. **Settings** → **Secrets and variables** → **Actions**
2. Ajoutez ces secrets :
   - `DISCORD_TOKEN` - Token de votre bot
   - `CLIENT_ID` - ID de l'application
   - `MONGODB_URI` - URI MongoDB

📖 Voir [SECURITY.md](SECURITY.md) pour plus de détails.

## 🌐 Déploiement

### Dashboard (Vercel/Netlify)

```bash
npm run build
# Déployez le dossier dist/
```

### Bot (VPS/Railway/Heroku)

```bash
cd bot
npm install
npm start
```

## 📊 Statistiques en temps réel

Le dashboard affiche :
- Nombre de serveurs
- Nombre d'utilisateurs
- Commandes exécutées
- Uptime et performance
- Graphiques d'activité

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📝 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<p align="center">
  Fait avec ❤️ par l'équipe NexusBot
</p>
