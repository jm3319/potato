# bot.py
import os

import discord
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

client = discord.Client()

@client.event
async def on_ready():
    for guild in client.guilds:
        if guild.name == GUILD:
            break

    print(
        f'{client.user} is connected to the following guild:\n'
        f'{guild.name}(id: {guild.id})'
    )

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if "bot" in message.content:
        response = f'F A Q @{message.author.name} !! <:miko3:775758557109944380>'
        await message.channel.send(response)

    if "miko" in message.content:
        response = "nya-hello~ <:nyahello:775770077471178763>"
        await message.channel.send(response)

client.run(TOKEN)