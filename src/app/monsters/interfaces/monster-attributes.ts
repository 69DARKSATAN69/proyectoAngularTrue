//esta es una pequeña interfaz hecha para la directiva monster-background, que utiliza estos dos atributos para cambiar de fondo a ciertos
//elementos.
//puesto que no se utiliza para nada de webservices, no creí necesario crear una clase DTO para utilizarla en ella.
export interface MonsterAttributes {
game:string;
type:string;

}

//ejemplo:
// "game": "XV",
// "type": "Beast",
