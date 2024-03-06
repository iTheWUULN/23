const db = require("croxydb");
const {EmbedBuilder,  PermissionsBitField} = require("discord.js");

module.exports = {
name: "başvuru-sistemi-sıfırla",
description: "Başvuru sistemini sıfırlarsın.",
options: [],
run: async (client, interaction) => {
  let kanal = db.fetch(`basvurukanal_${interaction.guild.id}`)
let log = db.fetch(`basvurulog_${interaction.guild.id}`)
  let rol = db.fetch(`basvururol_${interaction.guild.id}`)
  const yetki_yok = new EmbedBuilder()
  .setColor("Red")
  .setDescription("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.")
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki_yok], ephemeral: true })


  const zaten_ayarlı = new EmbedBuilder()
  .setDescription("Başvuru sistemi kanalı ayarlanmamış.")
  .setColor("Red")
  if(!kanal) return interaction.reply({embeds: [zaten_ayarlı], ephemeral: true})
  const zaten_ayarlı1 = new EmbedBuilder()
  .setDescription("Başvuru sistemi log kanalı ayarlanmamış.")
  .setColor("Red")
  if(!log) return interaction.reply({embeds: [zaten_ayarlı1], ephemeral: true})
  const zaten_ayarlı2 = new EmbedBuilder()
  .setDescription("Başvuru sistemi rolü ayarlanmamış.")
  .setColor("Red")
  if(!rol) return interaction.reply({embeds: [zaten_ayarlı2], ephemeral: true})
  

db.delete(`basvurukanal_${interaction.guild.id}`)
db.delete(`basvururol_${interaction.guild.id}`)
db.delete(`basvurulog_${interaction.guild.id}`)

  const sifirlandi = new EmbedBuilder()
  .setColor("Green")
  .setDescription(`Başvuru sistemi başarıyla sıfırlandı`)
  interaction.reply({embeds: [sifirlandi]})

  
}
};

