import { MonsterInterface } from "../interfaces/monster-interface";

export class MonsterDTO implements MonsterInterface {
    name = '';
    image = '';
    moneyDrop = 0;
    game = '';
    drops = [];
    type = '';
    id = 0;
    
    }

    //este comentario queda aqui como ejemplo de esta clase DTO.
// "name": "Wyvern",
// "image": "https://static.wikia.nocookie.net/finalfantasy/images/d/d5/Wyvern_FFXV.png/revision/latest?cb=20170907222453",
// "moneyDrop": "7290",
// "game": "XV",
// "drops": [
//   "Sapphire Bracelet"
// ],
// "type": "Beast",
// "id": 2