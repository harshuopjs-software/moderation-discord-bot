const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('disablerp')
    .setDescription(`Disables an existent role picker.`)
    .addStringOption((option) => option
      .setName('messageid')
      .setDescription(`The ID of the message that contains the role picker.`)
      .setRequired(true)
    ),
  requiredPerms: ['MANAGE_GUILD'],
  async execute(interaction) {
    const id = interaction.options.getString('messageid');
    let error = 0;
    let menu = await interaction.channel.messages.fetch(id).catch((err) => error = err);
    if (error) {
      return interaction.reply({ content: `Couldn't find any role pickers with the ID of ${'`' + id + '`'}.`, ephemeral: true });
    }
    
    menu.components[0].components[0].setDisabled(true);
    await menu.edit({ embeds: [menu.embeds[0]], components: [menu.components[0]] });
    interaction.reply({ content: `Role picker has been successfully disabled.`, ephemeral: true });
  }
}