import { SlashCommandBuilder, CommandInteraction, ButtonBuilder, ActionRowBuilder } from 'discord.js';
import insult from '../btns/insult.js';
import { Command } from '../command.js';
import generate from '../generate.js';

export default {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Replies with an insult!')
		.addUserOption(o =>
			o.setName('who')
				.setDescription('your mom')
				.setRequired(false)
		).toJSON(),
	async execute(interaction: CommandInteraction) {
		let u = interaction.options.getUser('who');
		let m = u ? `<@${u.id}>! ` : "";
		let r = new ActionRowBuilder<ButtonBuilder>().addComponents(insult.builder).toJSON();
		await interaction.reply({content: m + generate(), components: [ r ]});
	},
} as Command;