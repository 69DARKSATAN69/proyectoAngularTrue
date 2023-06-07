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