const db = require("croxydb");
const {EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, PermissionsBitField} = require("discord.js");

module.exports = {
name: "başvur",
description: "Başvurma komutu",
options: [
  {
    name:"mesaj",
    description:"Bir embed mesaj gir.",
    type:3,
    required:true
  },
   {
    name:"buton",
    description:"Bir buton mesajı gir.",
    type:3,
    required:true
  }
],
run: async (client, interaction) => {

  const mesaj = interaction.options.getString('mesaj')
  const buton = interaction.options.getString('buton')
let kanal = db.fetch(`basvurukanal_${interaction.guild.id}`)
  const ayarli = new EmbedBuilder()
  .setColor("Red")
  .setDescription("Başvuru kanalı ayarlanmamış.")
if (!kanal) return interaction.reply({embeds: [ayarli], ephemeral: true})
let log = db.fetch(`basvurulog_${interaction.guild.id}`)
const ayarli1 = new EmbedBuilder()
  .setColor("Red")
  .setDescription("Başvuru log kanalı ayarlanmamış.")
if (!log) return interaction.reply({embeds: [ayarli1], ephemeral: true})
let rol = db.fetch(`basvururol_${interaction.guild.id}`)
const ayarli3 = new EmbedBuilder()
  .setColor("Red")
  .setDescription("Başvuru rolü ayarlanmamış.")
if (!rol) return interaction.reply({embeds: [ayarli3], ephemeral: true})

  const menu = new EmbedBuilder()
  .setTitle("Başvuru Formu")
  .setDescription(`${mesaj}`)
  .setColor(0x0099FF)

  const row = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId('başvuru')
  .setLabel(`${buton}`)
  .setStyle(ButtonStyle.Success),
  
  );
  interaction.reply({
    embeds: [menu], components: [row]
  });

}
};
