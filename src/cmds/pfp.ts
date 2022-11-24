import { SlashCommandBuilder, CommandInteraction, User } from 'discord.js';
import { Command } from '../command.js';

export default {
	data: new SlashCommandBuilder()
		.setName('pfp')
		.setDescription('Replies with the profile picture of the user.')
		.addUserOption(o =>
			o.setName('user')
				.setDescription('Specify the user you want to see the profile picture of.')
                .setRequired(true)
		).toJSON(),
	async execute(interaction: CommandInteraction) {
		let u = interaction.options.getUser('user') as User;
        await interaction.reply(u.displayAvatarURL());
	},
} as Command;