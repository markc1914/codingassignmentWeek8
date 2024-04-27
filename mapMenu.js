// define map

class GameMap {
  constructor(name, teamSize) {
    this.name = name;
    this.teamSize = teamSize;
  }

  displayMap() {
    return `Map name is: ${this.name} and team size is ${this.teamSize}`;
  }

}

// define moshpit as a collection of maps and game mode
class MoshPit {
  constructor(name, mapList) {
    this.name = name;
    this.gameMode = '';
    this.mapList = mapList;
  }

  #mapsInUse = [];
  gameModes = ['Team Deathmatch', 'Domination', 'Hardpoint', 'Get The Tags'];



  listAllAvailableMaps() {
    console.log(this.mapList);
    console.log (this.mapList.length);
    let mapPrompt = '';
    for(let index = 0 ; index < this.mapList.length; index++){
      let gameMap = this.mapList[index];
      console.log("Game map is" + gameMap.name);
      mapPrompt = mapPrompt + index + ') ' + gameMap.name; + ' \n'; 
    }
    console.log(mapPrompt);
    return mapPrompt;
  }

  listAllAvailableModes() {
    let modeNamesString = '';
    for (let index = 0; index < this.gameModes.length; index++){
      modeNamesString += index + ')' + this.gameModes[index] + '\n'; 
    }
    return modeNamesString;
  }

  listAllMapsInUse() {
    let mapNames = ''
    for(let index = 0 ; index < this.#mapsInUse.length; index++){
      let gameMap = this.#mapsInUse[index];
      mapNames += index + ") "+ gameMap.name + ", ";
    }
    return mapNames;
  }

  /**
   * 
   * @param {number} number - the game mode selected by number 
   * @returns - the game mode as text
   */
  controlGameMode() {
    let number = prompt(`Please select a Game mode
      ${this.listAllAvailableModes()}`);
    if (number > - 1 && number < this.gameModes.length) {
      return this.gameModes[number];
    }
    return this.gameModes[0];
  }

  /**
   * Adds a map to a moshpit if not already there
   * @param {GameMap} gameMap - the game Map to add 
   */
  addMapToMoshpit() {
    let mapText = this.listAllAvailableMaps();
    console.log ("Map text is :::" + mapText);
    let index = prompt(`Enter the number of the map you wish to add
        ${mapText}`);
    if (index > -1 && index < this.mapList.length && !(this.#mapsInUse.includes(this.mapList[index]))) {
      this.#mapsInUse.push(this.mapList[index]);
    }
  }

  /**
   * 
   * @param {number} mapNumber - the number of the map to remove 
   */
  removeMapFromMoshpit() {
    let index = prompt(`Enter the index of the map that you wish to remove:  
      ${this.listAllMapsInUse()}`);
    if (index > -1 && index < this.#mapsInUse.length) {
      this.#mapsInUse.splice(index, 1);
    }
  }

}

class Menu {

  constructor(mapList) {
    this.moshpit = null;
    this.mapList = mapList;
  }


  start() { // entry point to application
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case '1':
          this.createMoshpit();
          break;
        case '2':
          this.editMoshpit();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert('Goodbye!');
  }

  showMainMenuOptions() {
    return prompt(`
        0) exit
        1) create a new Moshpit
        2) edit the existing Moshpit
				`);
  }

  showMoshpitMenuOptions() {
    return prompt(`
    0) exit
    1) Add a map
    2) Remove a map
    3) Display all Maps in Moshpit
    4) Change game mode
_________________________
  Moshpit: ${this.moshpit.name} - Game Mode: ${this.moshpit.gameMode}`);
  }

  createMoshpit() {
      let name = prompt('Please name your Moshpit');
      this.moshpit = new MoshPit(name, this.mapList);
  }

  editMoshpit() {
    if (this.moshpit instanceof MoshPit) {
      let editOp = this.showMoshpitMenuOptions();
      switch (editOp) {
        case '1':
          this.moshpit.addMapToMoshpit();
          break;
        case '2':
          this.moshpit.removeMapFromMoshpit();
          break;
        case '3':
          console.log(this.moshpit.listAllMapsInUse());
          break;
        case '4' :
          let gameMode = this.moshpit.controlGameMode();
          console.log("Game Mode is now " + gameMode);
          this.moshpit.gameMode = gameMode;
          break;
      }
    } else {
      alert('Mosshpit is null');
    }
  }
}

let mapList = [
  new GameMap("Das Haus",6),
  new GameMap("Rust",6),
  new GameMap("Shipment",6),
  new GameMap("Stash House")
]
let menu = new Menu(mapList);
console.log("Menu map list is " + menu.mapList);
menu.start();