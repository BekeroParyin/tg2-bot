//ape
const Discord = require('Discord.js');
const client = new Discord.Client();
const fs = require('fs');
var user = require('./user.json');
client.on('ready', () => {
	console.log("Connected as " + client.user.tag);
	
	client.user.setActivity("Terrain Gen 2");	
	/*client.guilds.forEach((guild) => {
		console.log(guild.name);
		guild.channels.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
		});
		//Apetexts - 559556458211966978
		//Counting - 630535254284697610
		//Hentart  - 636078003364954122
	});
	*/
});
client.on('message', (rec) => {
	if(rec.author != client.user){
		let id = rec.author.id;
		let xpGain = Math.floor(Math.random()*4)+2;
		if(!user[id]){
			user[id] = {
				xp: 0,
				level: 1,
				gold: 10,
				lastMsg: "",
				artifacts: [],
				character: -1,
			}
		}
		if(user[id].lastMsg != rec.content.toLowerCase()){
			user[id].lastMsg = rec.content.toLowerCase();
			user[id].xp += xpGain;
			if(user[id].xp > user[id].level*300){
				user[id].xp = user[id].xp % (user[id].level*300);
				user[id].level++;
				let goldGain = Math.floor((user[id].level*20)*(1+Math.random()/2));
				user[id].gold += goldGain;
				let lvlUp = new Discord.RichEmbed()
				.setTitle("Level Up!")
				.setColor("rgb(75, 135, 32)")
				.addField(rec.author.username + " levelled up to level " + user[id].level + " and gained "+goldGain+" gold!")
				.setFooter("");
				rec.channel.send(lvlUp);
			}
		}
		if(rec.content.startsWith("!")){
			processCom(rec);
		}
		else{
			switch(rec.content.toLowerCase()){
				case "ur bad":
				case "ur bad lad":
				case "ur a bad ape":
				case "your a bad ape":
				case "you're a bad ape":
				case "you're bad":
				case "you're so bad":
				case "ur so bad":
				case "your bad":
				case "ur not good":
				case "ur a bad ape":
				case "you're a bad ape":
				case "tg2 is bad":
				case "tg2 is a bad game":
				case "bad":
				case "lad that's nasty":
				case "lad that's bad":
				case "lad thats nasty":
				case "lad thats bad":
				case "nasty":
				case "ape":
				case "bad ape": rec.channel.send("no u"); break;
				case "no please": rec.channel.send("ur bad"); break;
				case "h": setTimeout(function(){rec.channel.send("h",{tts:true})},Math.random()*100000);break;
				case "no u": rec.channel.send("no U"); break;
				case "ye": rec.channel.send("s"); break;
				case "ur good": rec.channel.send("thanks"); break;
				case "gnight": rec.channel.send("gnight not recognized. try goodnight you ape"); break;
				case "good night":
				case "goodnight": rec.channel.send("goodnight? i think u mean !game"); break
				//default: rec.channel.send(rec.content + " ape"); break;
			}
		}
		fs.writeFile("./user.json", JSON.stringify(user),(err)=>{if(err){console.log(err)}});
	}
});
function Character(){
	this.name = "";
	this.numPotions = 1;
	this.weapon;
	this.familiar = false;
	this.magic = 0;
	this.strength = 0;
	this.defense = 0;
	this.health = [1,1];
	this.charms = [];
	this.chSpot = [];
	this.lvl = 1;
	this.xp = 0;
	this.chanceToHit = 0;
	this.inventory = [];
	this.effects = [];
	this.blocking = false;
	this.kills = 0;
	this.dmgMultiplier = 1;
	this.dmgAdder = 0;
	this.lifeSteal = 0;
	this.stunChance = 0;
	this.revive = 0;
	this.healPerc = 1;
	this.charisma = 0;
	this.luck = 0;
	this.chanceToFlee = .4;
	this.familiars = [];
}
function Weapon(n,d,c,s,m){
	this.charm = false;
	this.name = n||"";
	this.damage = d||0;
	this.chanceToHit = c||0;
	this.strReq = s||0;
	this.mReq=m||0;
	this.spot = [-1, -1];
}
function Charm(n,d){
	this.charm = true;
	this.name = n||"";
	this.description = d||"";
	this.effect;
	this.spot = [-1, -1];
}
function Monster(n, a, d, h, c){
	this.name = n;
	this.health = [h, h];
	this.stunned = false;
	this.defense = d;
	this.damage = a;
	this.chanceToHit = c;
	this.spot = [-1, -1];
}
function Familiar(){
	this.type = ""
	this.familiar = true;
	this.level = 1;
	this.xp = 0;
	this.owner;
	this.health = [5, 5];
	this.damage = 1;
}
let monsters = [[], [], []];
monsters[0][0] = new Monster("Rabbit", 1, -1, 3, 100);
monsters[0][1] = new Monster("Fox", 2, -1, 4, 100);
monsters[0][2] = new Monster("Chimpanzee", 4, -1, 10, 80);
monsters[0][3] = new Monster("Orangutan", 2, 1, 10, 100);
monsters[0][4] = new Monster("Coyote", 3, -1, 6, 70);
monsters[0][5] = new Monster("Wolf", 4, -1, 7, 70);
monsters[0][6] = new Monster("Madman", 6, 0, 7, 50);
monsters[0][7] = new Monster("Cannibal", 4, 0, 7, 80);
monsters[0][8] = new Monster("Goblin", 7, 0, 8, 65);
monsters[0][9] = new Monster("Glass Golem", 9, 0, 3, 90);
monsters[1][0] = new Monster("Caustic Slime", 100, -5, 10, 1);
monsters[1][1] = new Monster("Bandit", 5, 2, 8, 90);
monsters[1][2] = new Monster("Bear", 8, 1, 10, 70);
monsters[1][3] = new Monster("Brigand", 5, 2, 10, 100);
monsters[1][4] = new Monster("John", 1, 30, 80, 50);
monsters[1][5] = new Monster("Troll", 4, 6, 20, 65);
monsters[1][6] = new Monster("Ogre", 4, 7, 20, 65);
monsters[1][7] = new Monster("Minotaur", 7, 1, 20, 75);
monsters[1][8] = new Monster("Giant", 14, 0, 20, 60);
monsters[1][9] = new Monster("Demon", 10, 3, 25, 80);
monsters[1][10] = new Monster("Big Snail", 18, 15, 5, 70);
monsters[2][0] = new Monster("Drake", 12, 4, 35, 85);
monsters[2][1] = new Monster("Wayward Mage", 18, 1, 20, 100);
monsters[2][2] = new Monster("Dragon", 20, 1, 55, 95);
monsters[2][3] = new Monster("Lost Soul", 15, 30, 20, 100);
monsters[2][4] = new Monster("Ring of Living Fire", 10, 99, 10, 100);
monsters[2][5] = new Monster("Huge Snail", 100, 5, 225, 5);
monsters[2][6] = new Monster("Witch", 10, 5, 30, 100);
for(let i = 0; i < monsters.length; i++){ for(let j = 0; j < monsters[i].length; j++){ monsters[i][j].spot = [i, j]; }};
let weapons = [[],[],[]];
//TIER 0
weapons[0][0] = new Weapon("Shovel", 2, 90, 1,0);
weapons[0][1] = new Weapon("Dagger", 1, 100,0,0);
weapons[0][2] = new Weapon("Halfspear", 3, 70, 1, 0);
weapons[0][3] = new Weapon("Hatchet", 3, 80, 2, 0);
weapons[0][4] = new Weapon("Spear", 4, 70 ,1,0);
weapons[0][5] = new Weapon("Shield", 2, 100, 2, 0);
weapons[0][6] = new Weapon("Club", 7, 55, 3, 0);
weapons[0][7] = new Weapon("Scroll", 3, 95, 0, 2);
weapons[0][8] = new Weapon("Falchion", 4, 85, 2, 0);
//TIER 1
weapons[1][0] = new Weapon("Wand", 5,100,0,3);
weapons[1][1] = new Weapon("Poleax", 5, 85 , 2 , 0);
weapons[1][2] = new Weapon("Sword", 6, 85 , 2 , 0);
weapons[1][3] = new Weapon("Scimitar", 6, 99, 3, 0);
weapons[1][4] = new Weapon("Mace", 8, 75 , 2 , 0);
weapons[1][5] = new Weapon("Halberd", 8, 80, 3, 0);  
weapons[1][6] = new Weapon("Whip", 12, 55, 3, 0); 
//TIER 2
weapons[2][0] = new Weapon("Bloodblade", 12, 85, 2, 2);
weapons[2][1] = new Weapon("Maul", 18, 50, 4, 0);
weapons[2][2] = new Weapon("Staff", 9,100,0,4); 
weapons[2][3] = new Weapon("Spellbook", 75, 15, 0, 6);
weapons[2][4] = new Weapon("Soulspear", 1, 10, 5, 5);
for(let i = 0; i < weapons.length; i++){ for(let j = 0; j < weapons[i].length; j++){ weapons[i][j].spot = [i, j]; }};

let charms = [[], [], []];
charms[0][0] = new Charm("Rabbit's Foot", "15% increased flee chance"); 
charms[0][1] = new Charm("Fox Fur Scarf", "+5 Charisma"); 
charms[0][2] = new Charm("Chimpanzee's Hand", "+6 strength, +1DEF"); 
charms[0][3] = new Charm("Orangutan's Eye", "10% chance to hit, +5 HP, +2 MAGIC" ); 
charms[0][4] = new Charm("Coyote's Tooth", "5% Lifesteal, +4DMG"); 
charms[0][5] = new Charm("Wolf's Eye", "+3 DMG, +2 CHA, +1DEF");  
charms[0][6] = new Charm("Madman's Locket", "+20% DMG, +2 DMG, -15% chance to hit"); 
charms[0][7] = new Charm("Cannibal's Headdress", "20% Lifesteal");
charms[0][8] = new Charm("Glass Shard", "-7 HP, +15% DMG"); 
charms[0][9] = new Charm("Goblin's Earring","+4 gold/kill" ); 
charms[1][0] = new Charm("Acid Vial", "+5 DMG"); 
charms[1][1] = new Charm("Bandit's Buckler", "10% Chance to Block"); //
charms[1][2] = new Charm("Bear Claws", "15% Lifesteal, +1DMG, +1DEF"); //
charms[1][3] = new Charm("Brigand's Dagger", "+15% chance to hit"); 
charms[1][4] = new Charm("Honey Mustard", "Heal 5 HP per turn"); 
charms[1][5] = new Charm("Troll's Club", "+15% DMG"); 
charms[1][6] = new Charm("Ogre's Hide", "Reflect 25% DMG"); 
charms[1][7] = new Charm("Minotaur Pelt", "-3 CHA, +4 DEF, +5% Block Chance"); //
charms[1][8] = new Charm("Giant's Ring", "+11 HP, +2 STR"); 
charms[1][9] = new Charm("Demonic Mask", "Execute enemies below 10% HP. Doesn't Stack"); //
charms[1][10] = new Charm("Venom Vial", "15% chance to stun an enemy"); //
charms[2][0] = new Charm("Silver Scale", "3 DEF, +2 gold/kill"); 
charms[2][1] = new Charm("Cracked Pendant", "25% chance to revive after death. Additive."); //
charms[2][2] = new Charm("Dragon Blood Talisman", "Potions heal for 1.25x. Doesn't stack."); 
charms[2][3] = new Charm("Famulus Ring", "Summon a random enemy (tier-1) as a familiar."); //
charms[2][4] = new Charm("Flame Ring", "+2 DMG, +5% Chance to Hit, +4 Magic, +1 DEF"); 
charms[2][5] = new Charm("Snail Shell Shield", "+5 DEF"); 
charms[1][4].effect = function(d){
	this.defense += 5*d;
}
for(let i = 0; i < charms.length; i++){ for(let j = 0; j < charms[i].length; j++){ charms[i][j].spot = [i, j]; }};
function charmEffects(character, n, d){
	if(n=="Rabbit's Foot"){
		character.fleeChance += .15*d;
	} else if(n == "Fox Fur Scarf"){	
		character.charisma += 5*d;
	} else if(n == "Chimpanzee's Hand"){
		character.strength += 6*d;
		character.defense += d;
	} else if(n == "Orangutan's Eye"){
		character.chanceToHit+=10*d;
		character.health[1] += 4*d;
		character.health[0] += 4*d;
		character.magic += 2*d;
	} else if(n == "Coyote's Tooth"){
		character.lifeSteal += .05*d;
		character.dmgAdder += 4*d;
	} else if(n == "Wolf's Eye"){
		character.charisma += 2*d;
		character.dmgAdder += 3*d;
		character.defense += d;
	} else if(n == "Madman's Locket"){
		character.dmgMultiplier += .2*d;
		character.dmgAdder += 2*d;
		character.chanceToHit -= 15*d;
	} else if(n == "Cannibal's Headdress"){
		character.lifeSteal += .15*d;
	} else if(n == "Goblin's Earring"){
		character.luck += 4*d;
	} else if(n == "Glass Shard"){
		character.health[1] -= 7*d;
		character.health[0] -= 7*d;
		character.dmgMultiplier += .15*d;
	} else if(n == "Giant's Ring"){
		character.health[1] += 11*d;
		character.health[0] += 11*d;
		character.strength += 2*d;
	} else if(n == "Minotaur's Pelt"){ 
		character.charisma -= 3*d;
		character.defense += 3*d;
		character.blockChance += .05*d;
	} else if(n == "Acid Vial"){
		character.dmgAdder += 5*d;
	} else if(n == "Bear Claw"){
		character.lifeSteal += .05*d;
		character.damage+=d;
		character.defense+=d;
	} else if(n == "Brigand's Dagger"){
		character.chanceToHit += 15*d;
		character.defense -= 2*d;
	} else if(n == "Troll's Club"){
		character.dmgMultiplier += .15*d;
	} else if(n == "Silver Scale"){
		character.defense += 3*d;
		character.luck += 2*d;	
	} else if(n == "Flame Ring"){
		character.dmgAdder += 2*d;
		character.chanceToHit += 5*d;
		character.magic += 4*d;
		character.defense += d;
	} else if(n == "Snail Shell Shield"){
		character.defense += 4*d;
	} else if(n == "Cracked Pendant"){
		character.revive += .25*d;
	} else if(n == "Venom Vial"){
		character.stunChance += .15*d;
	} else if(n == "Bandit's Buckler"){
		character.blockChance += .1*d;
	} else if(n == "Famulus Ring"){
		if(d==1){
			let fam = new Familiar();
			let type = Math.random();
			if(type < 1/3){
				fam.role = "Drake";
			} else if(type > 2/3){
				fam.role = "Turtle";
				fam.health[1] += 2; fam.health[0] += 2; fam.defense++;
			} else{
				fam.role = "Lion";
				fam.damage += 2;
			}
			fam.name = character.name + "'s "+fam.role;
			character.familiars[character.familiars.length] = fam;
		}
		else{
			character.familiars.splice(character.familiars.length-1, 1);
		}
	}
	return character;
}
var gameState = {
	players: [],
	haveTurn: [],
	enemy: -1,
	running: false,
}
function processCom(mr){
	let m = mr.content.substring(1);
	let character = user[mr.author.id].character;
	let msg = m.split(" ");
	let f = msg[0].toLowerCase();
	let args = msg.slice(1);
	let allArgs = "";
	for(let a = 0; a < args.length; a++){
		allArgs += args[a].toLowerCase();
		if(a < args.length -1){
			allArgs += " ";
		}
	}
	if(f == "name"){
		switch(args[0]){	
			case "boy": case "male": case "man":case "guy": case "lad": case "dude": case "chad": case "fellow":case "hombre":case "1": mr.channel.send(genName(1)); break;
			case "girl": case "woman": case "stacy": case "female": case "honkerhaver": case "gal": case "dudette": case "babe": case "lady": case "gril": case "grill": case "0":mr.channel.send(genName(0));break;
		}
	}
	else if(f == "gold"){
		mr.channel.send(mr.author.username + " has " + Math.floor(user[mr.author.id].gold) + " gold. ");
	}
	else if(f == "help"){
		mr.channel.send("!gold, !level, !name [gender], !game");
		mr.channel.send("RPG commands: !lvl, !drink, !potions, !stats, !kills, !weapon, !inventory, !sell [item], !attack, !block, !give [player] [item], !equip [item], !flee, !health [enemy/enemyname]");
	}
	else if(f == "level"){
		mr.channel.send(mr.author.username + " is level " + Math.floor(user[mr.author.id].level) + ". " + (user[mr.author.id].level*300-user[mr.author.id].xp) + " xp to level up again.");
	}
	else if(f == "tavern" && gameState.players.indexOf(mr.author.id) == -1 && character!=-1){
		mr.channel.send(character.name + " spends the night resting at a tavern");
		user[mr.author.id].gold -= (15-character.charisma);
		character.health[0] = character.health[1];
	}
	else if(f == "lvl"){
		mr.channel.send(character.name+ " is level " + Math.floor(character.lvl) + ". " + (character.lvl*10-character.xp) + " xp to level up again.");
	}
	else if(f == "sell" && args.length > 0){
		let foundItem = false;
		for(let i = 0; i < character.inventory.length; i++){
			if(character.inventory[i].name.toLowerCase()==args[0].toLowerCase()){
				foundItem = true;
				user[mr.author.id].gold += Math.floor((character.inventory[i].spot[0]+1)*3)+character.charisma;
				character.inventory.splice(i, 1);
				mr.channel.send("Item sold"); i = character.inventory.length;
			}
		}
		if(!foundItem){
			mr.channel.send("Item not found.");
		}
	}
	else if(f == "game" && !gameState.running){
		if(character != -1){
			mr.channel.send("Game is starting. Type !join to join.");
			gameState.running = true;
			if(gameState.players.indexOf(mr.author.id) == -1){
				gameState.players.push(mr.author.id);
			}
		}
		else if(character == -1){
			mr.channel.send("Unable to join game. Try !character.");
		}
	}
	else if(f == "join" && gameState.running && gameState.enemy == -1){
		if(gameState.players.indexOf(mr.author.id) == -1 && character!=-1){
			gameState.players.push(mr.author.id);
			mr.channel.send(mr.author.username + " joined the game.");
		}
		else if(character == -1){
			mr.channel.send("Unable to join game. Try !character.");
		}
		else{
			mr.channel.send("You're already in the game.");
		}
	}
	else if(f == "character"){
		if(character == -1){
			user[mr.author.id].gold--;
			let roles = ["Knight", "Mage", "Rogue", "Peasant"];
			character = new Character();
			character.gender = Math.round(Math.random());
			character.name = genName(character.gender);
			character.role=roles[Math.floor(Math.random()*roles.length)];
			character.health[0] += 4+Math.floor(Math.random()*9);
			switch(character.role){
				case "Knight": character.strength = 2; character.defense = 2; character.weapon = weapons[0][1]; break;
				case "Mage": character.magic = 2; character.weapon = weapons[0][1]; break;
				case "Rogue": character.strength = 1; character.magic = 1; character.chanceToFlee = .65; character.numPotions++; character.weapon = weapons[0][1]; break;
				case "Peasant": character.strength = 3; character.health[0] += 4;character.weapon = weapons[0][0]; break;
			}
			character.health[1] = character.health[0];
			mr.channel.send("You're a " + ((character.gender)? 'male ': 'female ') + character.role + " named " + character.name);
			mr.channel.send("You have " + character.health[0] + "hp and a "+ character.weapon.name);
		}
		else{
			mr.channel.send("You're a " + ((character.gender)? 'male ': 'female ') + character.role + " named " + character.name);
			mr.channel.send("You have " + character.health[0] + "hp and a "+ character.weapon.name);
		}
	}
	if(character != -1){
		if(f=="health"){
			if(gameState.enemy != -1 && (args.length > 0 && args[0].toLowerCase() == gameState.enemy.name.toLowerCase() || args[0] == "enemy")){
				mr.channel.send("The " + gameState.enemy.name + " has " + gameState.enemy.health[0]+" /" + gameState.enemy.health[1]+ " hp.");
			}
			else{
				mr.channel.send(character.name + " has " + character.health[0]+" /" + character.health[1]+ " hp.");
			}
		}
		else if(f=="potions"){
			mr.channel.send(character.name + " has " + character.numPotions+" health potions. You can use !drink to use one.");
		}
		else if(f=="kills"){
			mr.channel.send(character.name + " has " + character.kills+" kills.");
		}
		else if(f=="weapon"){
			mr.channel.send(character.name + " has a " + character.weapon.name + " with " + character.weapon.damage + " damage and " + character.weapon.chanceToHit +"% chance to hit.");
		}
		else if(f=="stats"){
			mr.channel.send(character.name + " has " + character.strength+" strength, " + character.magic + " magic, " + character.defense + " defense  and, " + character.chanceToFlee + " chance to flee.");
		}
		else if(f=="inventory"){
			mr.channel.send("-------------" + character.name + "-------------");
			for(let i = 0; i < character.inventory.length; i++){
				mr.channel.send(character.inventory[i].name);
			}
		}
		else if(f=="remove"){
			for(let i = 0; i < character.charms.length; i++){
				if(character.charms[i].toLowerCase() == allArgs){
					mr.channel.send(character.name + " removed a " + character.charms[i]);
					character = charmEffects(character, character.charms[i], -1);
					character.inventory.push(charms[character.chSpot[i][0]][character.chSpot[i][1]]);
					character.charms.splice(i, 1);
					character.chSpot.splice(i, 1);
					i = character.charms.length;
				}
			}
		}
		else if(f == "charms"){
			for(let i = 0; i < character.charms.length; i++){
				mr.channel.send(character.charms[i] + ":  " + charms[character.chSpot[i][0]][character.chSpot[i][1]].description); 
			}
		}
		else if(f=="equip" && args.length > 0){
			let foundItem = -1;
			let cantEquip = false;
			for(let i = 0; i < character.inventory.length; i++){
				if(character.inventory[i].name.toLowerCase()==allArgs){
					foundItem = i;
					let item = character.inventory[i];
					if(!item.charm){
						if(character.strength >= item.strReq && character.magic >= item.mReq){
							mr.channel.send(character.name + " equipped a "+ item.name); 
							character.inventory.push(character.weapon);
							character.weapon = character.inventory[i];
							cantEquip = false;
							i = character.inventory.length;
						}
						else{
							cantEquip = true;
						}
					}
					else if(character.charms.length < 3){
						cantEquip = false;
						character.charms.push(item.name);
						character.chSpot.push(item.spot);
						console.log(character.charms);
						mr.channel.send(character.name + " is now wearing a "+ item.name); 
						character = charmEffects(character, item.name, 1);
					}
					character.inventory.splice(i, 1);
				}
			}
			if(foundItem == -1){
				mr.channel.send(character.name + " sifts longingly through their bag.");
			}
			if(foundItem && cantEquip){
				mr.channel.send(character.name + " tries to equip a "+ character.inventory[foundItem].name + " but is unable to.");
			}
		}
		else if(f=="give" && args.length == 2){
			if(gameState.running){
				let foundItem = -1;
				if(args[1] != "potion"){
					for(let i = 0; i < character.inventory.length; i++){
						if(character.inventory[i].name.toLowerCase()==args[1].toLowerCase()){
							foundItem = i;
						}
					}
					if(foundItem == -1){
						mr.channel.send(character.name + " sifts longingly through their bag.");
					}
				}
				else{
					if(character.numPotions > 0){
						foundItem = 1;
					}
				}
				if(foundItem != -1){
					for(let i = 0; i < gameState.players.length; i++){
						if(user[gameState.players[i]].character.name.toLowerCase() == args[0].toLowerCase()){
							if(args[1] != "potion"){
								mr.channel.send(character.name + " gives a "+ character.inventory[foundItem].name + " to " + user[gameState.players[i]].character.name);
								user[gameState.players[i]].character.inventory.push(character.inventory[foundItem]);
								character.inventory.splice(foundItem, 1);
							}
							else{
								user[gameState.players[i]].character.numPotions++;
								character.numPotions--;
								mr.channel.send(character.name + " gives a potion to " + user[gameState.players[i]].character.name)
							}
						}
					}
				}
			}
			else{
				mr.channel.send("Start a game first");
			}
		}
		else if(f=="suicide"){
			if(user[mr.author.id].gold > 2){
				user[mr.author.id].gold-=3;
				character = -1;
			}
			else{ mr.channel.send("It costs 3 gold to delete your character. broke ass bitch"); }
		}
	}
	if(gameState.running && gameState.players.indexOf(mr.author.id)!=-1){ //game commands
		if(f=="start" && gameState.enemy == -1){
			let tier = Math.min(2, Math.floor(character.lvl/3))
			if(args[0] == 1 || args[0] == 2 || args[0] == 3){
				tier = args[0]-1;
			}
			for(let i = gameState.players.length-1; i >= 0; i--){
				user[gameState.players[i]].character.effects = [];
			}
			gameState.enemy = monsters[tier][Math.floor(Math.random()*monsters[tier].length)];
			if(gameState.enemy.health[0]==gameState.enemy.health[1]||gameState.enemy.health[0] <= 0){
				gameState.enemy.health[1] *= (1+(.15*(gameState.players.length-1)));
				gameState.enemy.health[1] = Math.round(gameState.enemy.health[1]);
				gameState.enemy.health[0] = gameState.enemy.health[1];
			}
			gameState.haveTurn = gameState.players.slice();
			mr.channel.send("The game is starting.");
			if(Math.random() > .5){
				mr.channel.send("The " + gameState.enemy.name + " will attack first.");
				enemyAttack(mr);
			}
			else{
				mr.channel.send("The players will attack the " +  gameState.enemy.name +" first.");
			}
		}
		if(gameState.haveTurn.indexOf(mr.author.id)!=-1){
			if(f=="flee"){
				if(character.effects.indexOf("taunted")==-1){
					let fleeChance = character.chanceToFlee || .4;
					if(Math.random() > fleeChance){
						mr.channel.send(character.name + " fails to flee.");
					}
					else{
						mr.channel.send(character.name + " flees the battle!");
						gameState.players.splice(gameState.players.indexOf(mr.author.id), 1);
					}
					gameState.haveTurn.splice(gameState.haveTurn.indexOf(mr.author.id), 1);
				}
				else{
					mr.channel.send(character.name + " can not break the witch's spell.");
				}
			}
			else if(f=="pass"){
				gameState.haveTurn.splice(gameState.haveTurn.indexOf(mr.author.id), 1);
			}
			else if(f=="drink" && character!=-1 && character.effects.indexOf("sick") == -1){
				if(character.health[0] < character.health[1] && character.effects.indexOf("sick")==-1){
					if(character.numPotions > 0){
						character.numPotions--;
						let healAmt = 4+Math.floor(Math.random()*(3+character.lvl)) * character.healPerc;
						character.health[0] += 
						character.health[0] = Math.min(character.health[0], character.health[1]);
						mr.channel.send("Potion consumed. " + character.name + " is now at "+character.health[0]+"/"+character.health[1]+" health.");
						gameState.haveTurn.splice(gameState.haveTurn.indexOf(mr.author.id), 1);
					}
					else {
						mr.channel.send(character.name + " looks thirsty.");
					}
				}
				else{
					mr.channel.send(character.name + " can't get the cork out of the potion vial.");
				}
			}
			else if(f=="block"){
				if(character.weapon.name.toLowerCase() == "shield"){
					mr.channel.send(character.name + " raises their shield");
					character.blocking = true;
					character.blockChance += .6;
					gameState.haveTurn.splice(gameState.haveTurn.indexOf(mr.author.id), 1);
				}
			}
			else if(f=="attack"){
				if(character.weapon.name.toLowerCase() == "bloodblade"){
					character.health[0] -= 1;
					if(character.health[0] <= 0){
						mr.channel.send(character.name + " bursts into a mist of blood!");
						user[mr.author.id].character = -1;
						gameState.players.splice(gameState.players.indexOf(mr.author.id), 1);
					}
				}
				let buff = Math.floor(character.strength/2);
				switch(character.weapon.name.toLowerCase()){
					case "scroll": buff = Math.ceil(character.magic/1.5); break;
					case "wand": buff = Math.ceil(character.magic/1.5); break;
					case "staff": buff = Math.ceil(character.magic/1.5); break;
					case "spellbook": buff = Math.ceil(character.magic/1.5); break;
				}
				let dmgDealt = Math.round(character.dmgMultiplier * (character.dmgAdder + Math.max(1,Math.round((.6+(Math.random()/2))*((buff+character.weapon.damage)-gameState.enemy.defense)))));
				if(Math.random()*100 < character.weapon.chanceToHit + character.chanceToHit){
					if(character.effects.indexOf("weak") != -1){
						dmgDealt = Math.ceil(dmgDealt/2);
					}
					if(Math.random() < character.stunChance){
						gameState.enemy.stunned = true;
						mr.channel.send("The " + gameState.enemy.name + " looks stunned!");
					}
					if(character.effects.indexOf("sick") == -1){
						character.health[0] += dmgDealt * character.lifeSteal;
						if(character.charms.indexOf("Honey Mustard") != -1){
							character.health[0]+=5;
						}
						if(character.health[0] > character.health[1]){
							character.health[0] = character.health[1];
						}
					}
					mr.channel.send(character.name + " attacks the " + gameState.enemy.name + " with "+((character.gender)? "his ": "her ")+character.weapon.name + " for " + dmgDealt + " damage!");
					gameState.enemy.health[0] -= dmgDealt;
					if(gameState.enemy.health[0] <= gameState.enemy.health[1]*.1 && character.charms.indexOf("Demonic Mask") != -1){
						mr.channel.send("The " + gameState.enemy.name + " is executed!");
						gameState.enemy.health[0] = 0;
					}
					if(gameState.enemy.health[0] <= 0){
						let didRevive = false;
						if(gameState.enemy.name == "Wayward Mage"){
							if(Math.random() > .3){
								gameState.enemy.health[0] = gameState.enemy.health[1];
								mr.channel.send("From a blue pendant there rises a terrible hiss, and the mage rises.");
								didRevive = true;
							}
						}
						if(!didRevive){
							character.kills++;
							mr.channel.send("The " + gameState.enemy.name + " is struck down!");
							gameState.haveTurn = [];
							if(character.weapon.name.toLowerCase() == "soulspear" && gameState.enemy.spot[0] > 0){
								if(character.weapon.damage < 30 && (gameState.enemy.spot[0] > 1 || character.weapon.chanceToHit <= 85)){
									if(character.weapon.chanceToHit <= 95){
										character.weapon.chanceToHit += 5;
									}
									character.weapon.damage++;
								}
							}
							/*else if(character.weapon.name.toLowerCase() == "spellbook" && gameState.enemy.spot[0] >= 2){
								if(character.weapon.chanceToHit <= 20){
									character.weapon.chanceToHit += 5;
									character.weapon.damage++;
								}
							}*/
							giveLoot(gameState.enemy.health[1], mr);
						}
					}
				}
				else{
					mr.channel.send(character.name + " misses!");
				}
				gameState.haveTurn.splice(gameState.haveTurn.indexOf(mr.author.id), 1);
			}
			if(gameState.haveTurn.length == 0 && gameState.running){
				if(gameState.enemy.stunned){
					mr.channel.send("The " + gameState.enemy.name + " is stunned. It is now the players' turn.");
					gameState.enemy.stunned = false;
				}
				else{
					mr.channel.send("The " + gameState.enemy.name + " attacks.");
					enemyAttack(mr);
					character = user[mr.author.id].character || -1;
				}
			}
		}
	}
	else if(f=="drink"){
		if(character.health[0] < character.health[1]){
			if(character.numPotions > 0){
				character.numPotions--;
				character.health[0] += 3+Math.floor(Math.random()*(4+character.lvl));
				character.health[0] = Math.min(character.health[0], character.health[1]);
				mr.channel.send("Potion consumed. " + character.name + " is now at "+character.health[0]+"/"+character.health[1]+" health.");
				gameState.haveTurn.splice(gameState.haveTurn.indexOf(mr.author.id), 1);
			}
			else {
				mr.channel.send("No potions to drink");
			}
		}
		else{
			mr.channel.send("Already at max health");
		}function Weapon(n,d,c,s,m){
	this.name = n||"";
	this.damage = d||0;
	this.chanceToHit = c||0;
	this.strReq = s||0;
	this.mReq=m||0;
	this.spot = [-1, -1];
}
	}
	user[mr.author.id].character = character;
	fs.writeFile("./user.json", JSON.stringify(user),(err)=>{if(err){console.log(err)}});
}
function enemyAttack(mr){
	if(gameState.players.length <= 0){
		mr.channel.send("The game has ended");
		gameState.players = [];
		gameState.haveTurn = [];
		gameState.enemy = -1;
		gameState.running = false;
	}
	else{
		let id = Math.floor(Math.random() * gameState.players.length);
		let target = user[gameState.players[id]].character;
		let dmgDealt = Math.max(1, Math.round((.6+(Math.random()/2))*((gameState.enemy.damage) - target.defense)));
		if(Math.random()*100 < gameState.enemy.chanceToHit){
			if(target.charms.indexOf("Ogre's Hide") != -1){
				mr.channel.send(target.name + " reflects " + Math.floor(dmgDealt/4) + " damage!");
				gameState.enemy.health[0] -= Math.floor(dmgDealt/4);
			}
			if(Math.random() < target.blockChance){
				dmgDealt = 1;
				mr.channel.send("The blow is blocked!");
			}
			mr.channel.send(target.name + " takes " + dmgDealt + " damage!");
			if(gameState.enemy == "Witch"){
				let ape = Math.random();
				if(ape < .2){
					mr.channel.send(target.name+ " is stunned!");
					target.effects.push("stunned");
				}
				else if(ape < .4){
					mr.channel.send(target.name+ " looks sick!")
					target.effects.push("sick");
				}
				else if(ape < .6){
					mr.channel.send(target.name+ " is taunted and can no longer flee!")
					target.effects.push("taunted");
				}
				else if(ape < .8){
					mr.channel.send(target.name+ " grows pale and weak!")
					target.effects.push("weak");
				}
				else {
					gameState.enemy.health[0] += dmgDealt;
					gameState.enemy.health[0] = Math.min(gameState.enemy.health[0], gameState.enemy.health[1]);
					mr.channel.send("The witch heals herself!")
				}
			}
			else if(gameState.enemy.name == "Drake"){
				if(gameState.enemy.health[0] < gameState.enemy.health[1]){
					mr.channel.send("The drake heals itself!")
					gameState.enemy.health[0] += 4;
					if(gameState.enemy.health[0] > gameState.enemy.health[1]){
						gameState.enemy.health[0] = gameState.enemy.health[1];
					}
				}
			}
			target.health[0] -= dmgDealt;
			if(target.health[0] <= 0){
				if(Math.random() < target.revive){
					target.health[0] = target.health[1];
					mr.channel.send(target.name + " is restored to life after a fatal blow!");
				}
				else{
					mr.channel.send(target.name + " is struck down!");
					target = -1;
				}
			}
			if(gameState.enemy.health[0] <= 0){
				mr.channel.send("The " + gameState.enemy.name + " is struck down!");
				gameState.haveTurn = [];
				giveLoot(gameState.enemy.health[1], mr);
			}
			user[gameState.players[id]].character = target;
			if(target == -1){
				gameState.players.splice(id, 1);
			}
		}
		else{
			mr.channel.send("The " + gameState.enemy.name + " misses.");
		}
	}if(gameState.players.length <= 0){
		mr.channel.send("The game has ended");
		gameState.enemy = -1;
		gameState.players = [];
		gameState.haveTurn = [];
		gameState.running = false;
	}else{
		gameState.haveTurn = gameState.players.slice();
		for(let i = gameState.haveTurn.length-1; i >= 0; i--){
			if(user[gameState.haveTurn[i]].character.blocking){
				user[gameState.haveTurn[i]].character.blocking=false;
				user[gameState.haveTurn[i]].character.blockChance -= .6;
			}
			if(user[gameState.haveTurn[i]].character.effects.indexOf("stunned") != -1){
				user[gameState.haveTurn[i]].character.effects.splice(user[gameState.haveTurn[i]].character.effects.indexOf("stunned"), 1);
				gameState.haveTurn.splice(i, 1);
			}
		}
		mr.channel.send("It is now the players' turn.");
	}
}
function giveLoot(h, mr){
	for(let i = 0; i < monsters.length; i++){
		if(monsters[i].name == gameState.enemy.name){
			monsters[i].health[0] = monsters[i].health[1];
		}
	}
	let exp = Math.pow(((gameState.enemy.spot[0])*3+1),2) + gameState.enemy.spot[1];
	gameState.running = false;
	var id; var chara;
	mr.channel.send("The party gains " + exp + " exp.");
	for(let i = 0; i < gameState.players.length; i++){
		id = gameState.players[i];
		chara = user[id].character;
		chara.xp += Math.floor(exp/gameState.players.length);
		if(!chara.familiar){
			let foundItem = false;
			if(chara.xp >= chara.lvl*10){
				mr.channel.send(chara.name + " levels up!");
				chara.xp = chara.xp % (chara.lvl*10);
				user[id].xp+=30;
				user[id].gold+=3+chara.luck;
				chara.lvl++;
				if(chara.lvl%2 == 0 && (chara.defense < 3 || (chara.role == "Knight" && chara.defense < 6))){
					chara.defense++;
				}
				if(chara.role=="Peasant"){
					chara.health[1]++;
				}
				if(chara.role=="Rogue" && chara.chanceToFlee < 1){
					chara.chanceToFlee += .015;
				}
				if(chara.lvl > 6 && Math.random > .95){
					chara.defense++;
				}
				chara.magic++;
				chara.strength++;
				chara.health[1] += 2+Math.floor(Math.random()*4);
				chara.health[0] = user[id].character.health[1];
			}
			if(Math.random() > .7 || (gameState.enemy.spot[0] == 2 && Math.random() > .5)){
				let reward = weapons[gameState.enemy.spot[0]][Math.floor(Math.random()*(weapons[gameState.enemy.spot[0]].length))];
				mr.channel.send(chara.name + " found a " + reward.name);
				chara.inventory.push(reward);
				foundItem = true;
			}
			if(Math.random() > .5){
				mr.channel.send(chara.name + " found a health potion");
				chara.numPotions++;
				foundItem = true;
			}
			if(Math.random() > .5){
				let charm = charms[gameState.enemy.spot[0]][gameState.enemy.spot[1]]
				mr.channel.send(chara.name + " found a " + charm.name);
				chara.inventory.push(charm);
			}
			if(!foundItem){
				mr.channel.send(chara.name + " finds nothing.");
			}
		}
		else{
			if(chara.xp >= chara.lvl*15){
				if(chara.lvl++%2==0){
					chara.defense++;
				}
				chara.damage++;
				chara.health[1] += 3;
				if(chara.role == "Turtle"){
					chara.health[1]+=3;
				}
				else{
					chara.dmg++;
				}
				if(chara.role == "Lion"){
					chara.dmg++;
				}
				chara.health[0] = chara.health[1]
			}
		}
	}
	gameState.enemy = -1;
	user[id].character = chara;
	gameState.players = [];
	gameState.haveTurn = [];
}
function genName(male){
		var name = "";
		var mBegs = ["Le", "Ke", "Je", "Be", "Me", "Ko", "Ye", "E", "Cy", "Ce", "Ci", "A"];
		var mMids = ["k", "r", "ke", "re", "vin", "t", "s", "d", "v"];
		var mEnds = ["os", "ih", "o", "it", "en", "in", "de", "des", "re", "ro", "ov", "us", "on", "ic", "am"];
		
		var fBegs = [["Su", "A", "E", "O", "Ke","Ti", "Di", "De", "Li", "Ki", "Ve", "Ma", "Ni", "Ari", "So", "Ky"], ["Al", "Ev", "Ky"]];
		var fMids = [["or", "ex", "an"], ["k", "r", "n", "c", "s", "r", "ret", "ken", "y"]];
		var fEnds = ["a", "i", "ei", "is", "ia", "a", "iev", "ana", "in"];
		if(male){
			return "" + mBegs[Math.floor(Math.random() * mBegs.length)] + "" + mMids[Math.floor(Math.random() * mMids.length)] + "" + mEnds[Math.floor(Math.random() * mEnds.length)];
		}
		else{
			var lon = Math.random();
			if(lon > fBegs[0].length/(fBegs[0].length + fBegs[1].length)){ lon = 1; } else { lon = 0; }
			name += fBegs[lon][Math.floor(Math.random() * fBegs[lon].length)];
			lon = (lon+1) % 2;
			name += fMids[lon][Math.floor(Math.random()* fMids[lon].length)];
			lon = 0;
			name += fEnds[lon][Math.floor(Math.random()* fEnds[lon].length)];
			return name;
		}
	}
client.login("NjU4MDQ0NDU3NzAyMTI5NzQ5.Xf6Dig.DpXnYQFHUTlUnQHNv4hsXqGAHUE");