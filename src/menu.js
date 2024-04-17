import { getCurrentWorld } from './api/get_current_world.js';
import { LevelWorld} from './config/util.js';
export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }

    init(data) {
       this.world = LevelWorld[1]
       this.coins = 10
       this.hearts = 5
       this.contadorSegundos = 1
       this.email =data.email
    }

    preload() {
        this.load.image('boton', './assets/btn.png');
        this.load.image('inicio', './assets/mapas/inicio.png');
        this.load.image('titulo', './assets/mapas/titulo.png');
        this.load.image('fondomenu', './assets/mapas/Purple.png');
    }

    create() {
        console.log("mundo menu:" ,this.world)
        getCurrentWorld(this.email).then(result => {
          
            if (result && result['points'][0]) {
                console.log(' result is  ', result['points'][0] );
                this.world = LevelWorld[result['points'][0]['level'] || 0];
                this.coins = result['points'][0]['coins']   || 0;
                this.hearts = result['points'][0]['hearts'] || 0;
                this.contadorSegundos = result['points'][0]['time']  || 0;
            }
        })
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.fondoMenu = this.add.image(this.width / 2, this.height / 2, 'fondomenu').setOrigin(0.5).setScale(1.3);
        this.imageninicio = this.add.image(this.width / 2, this.height / 2, 'inicio').setOrigin(0.5).setScale(1.75);
        this.titulo = this.add.image(this.width / 2, this.height / 6, 'titulo').setOrigin(0.5);
        this.boton = this.add.image(this.width / 2, this.height / 1.75, 'boton').setInteractive().setScale(0.5);
        this.boton.on('pointerdown', () => this.scene.start(this.world, 
            { vida: this.hearts, puntos: this.coins, contadorSegundos: this.contadorSegundos, email:this.email }));
    }

}