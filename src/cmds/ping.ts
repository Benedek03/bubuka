import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { Command } from '../command.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!').toJSON(),
	async execute(interaction: CommandInteraction) {
		await interaction.reply('Pong!');
	},
} as Command;