
const db = require("croxydb");
const {EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
name: "başvuru-sistemi",
description: "Başvuru sistemini ayarlarsın.",
options: [
  {
    name:"kanal",
    description:"Başvuru kanalı ayarlarsın",
    type:7,
    required:true
  },
  {
    name:"log",
    description:"Başvuru log kanal ayarlarsın",
    type:7,
    required:true
  },
  {
    name:"rol",
    description:"Başvuru rolü ayarlarsın",
    type:8,
    required:true
  }
],
run: async (client, interaction) => {

  let channel = db.fetch(`basvurukanal_${interaction.guild.id}`)
let logchannel = db.fetch(`basvurulog_${interaction.guild.id}`)
  let role = db.fetch(`basvururol_${interaction.guild.id}`)
  const yetki_yok = new EmbedBuilder()
  .setColor("Red")
  .setDescription("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_yok], ephemeral: true })

  const kanal = interaction.options.getChannel("kanal")
  const log = interaction.options.getChannel("log")
  const rol = interaction.options.getRole("rol")

  const zaten_ayarlı = new EmbedBuilder()
  .setDescription("Başvuru kanalı zaten ayarlanmış.")
  .setColor("Red")
  if(channel) return interaction.reply({embeds: [zaten_ayarlı], ephemeral: true})
  const zaten_ayarlı1 = new EmbedBuilder()
  .setDescription("Başvuru log kanalı zaten ayarlanmış.")
  .setColor("Red")
  if(logchannel) return interaction.reply({embeds: [zaten_ayarlı1], ephemeral: true})
  const zaten_ayarlı2 = new EmbedBuilder()
  .setDescription("Başvuru rolü zaten ayarlanmış.")
  .setColor("Red")
  if(role) return interaction.reply({embeds: [zaten_ayarlı2], ephemeral: true})
  

db.set(`basvurukanal_${interaction.guild.id}`, kanal.id)
db.set(`basvururol_${interaction.guild.id}`, rol.id)
db.set(`basvurulog_${interaction.guild.id}`, log.id)

  const ayarlandı = new EmbedBuilder()
  .setColor("Green")
  .setDescription(`Başvuru sistemi başarıyla ayarlandı.\n\nBaşvuru Kanalı: ${kanal}\nBaşvuru Rolü: ${rol}\nBaşvuru Log Kanalı: ${log}`)
  interaction.reply({embeds: [ayarlandı]})

  
}
};
