import { ButtonInteraction, ButtonStyle, ButtonBuilder, ActionRowBuilder } from 'discord.js';
import { Button } from '../button.js';
import generate from '../generate.js';

export default {
	builder: new ButtonBuilder()
	.setCustomId('insult')
	.setLabel('Kérek még!')
	.setStyle(ButtonStyle.Primary),
	async execute(interaction: ButtonInteraction) {
		let r = new ActionRowBuilder<ButtonBuilder>().addComponents(this.builder).toJSON();
		await interaction.reply({content: generate(), components: [ r ]});
	},
} as Button;