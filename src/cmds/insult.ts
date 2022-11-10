import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { Command } from '../command.js';
import generate from '../generate.js';

export default {
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Replies with an insult!').toJSON(),
	async execute(interaction: CommandInteraction) {
		await interaction.reply(generate());
	},
} as Command;