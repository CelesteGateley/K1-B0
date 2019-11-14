# K1-B0 Discord Bot

This is a small modular discord bot, designed to do a variety of features, from respond to commands to automatically 
give a user a role on joining a voice channel

### Installation

The bot runs using NodeJS, so you will need to install it using 
`sudo apt install nodejs npm`
or download it from: https://nodejs.org/en/

Start by cloning the repo using:\
`git clone https://github.com/Kamg300/K1-B0`
or by downloading a zip.

Next, you need to copy config.json.example to config.json, and then configure that file.
Once that has been configured, run `npm install` to download the dependencies.

### Adding to the Project

Commands and reactions can be added by copying the relevant `template.js.example` file, and removing `.example` from the end.
Once done, the category must be set to one of the folder names, and should be in the respective folder. Categorisation is a bit janky atm, and will be updated in the future.

