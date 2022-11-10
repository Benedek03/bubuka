import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
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
		let r = u ? `<@${u.id}>! ` : ""; 
		await interaction.reply(r + generate());
	},
} as Command;