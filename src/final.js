// Importar la función fetchDataBestScore desde el archivo api.js
import { fetchDataBestScore } from './api/best_scores.js';

export default class Final extends Phaser.Scene {
    constructor() {
        super({ key: 'Final' });
    }

    init(data){
        this.vida = data.vida;
        this.puntos = data.puntos;
    }

    preload() {
        this.leaderboardData =[]
        this.load.image('boton', './assets/btn.png');
        this.load.image('felicidades', './assets/mapas/felicidades.png');
        this.load.image('puntuacion', './assets/mapas/puntuacion.png');
        this.load.image('replay', './assets/mapas/replay.png');
        this.load.image('fondofin', './assets/mapas/fin.png');
        this.load.image('front', './assets/mapas/front2tablaeboard.png');
        this.load.image('itemTemplate', './assets/mapas/itemimagetemplateboard.png');
    }

    create() {
        fetchDataBestScore().then(data => {
            this.leaderboardData = data.best_scores || []
            this.leaderboardData.map((entry, index) => {
                this.add.image(this.width / 2, this.height / 2.25+(index*50), 'itemTemplate');
                this.add.text(this.width / 3.1, this.height / 2.35+(index*50), `${index+1}     ${entry.user.email.split("@")[0]}                                  ${entry.score}`, { fontFamily: 'Arial', fontSize: 24, color: '#000000' });
            });
        })
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.score = (this.vida * 20) + this.puntos; // Calculamos la puntuación final de la partida
        this.fondoFin = this.add.image(this.width / 2, this.height / 2, 'fondofin').setOrigin(0.5).setScale(1.2);
        this.puntuacion = this.add.image(this.width / 2.2, this.height / 10, 'puntuacion').setOrigin(0.5);
        this.add.text(this.width / 1.5, this.height / 10, '' + this.score, { font: '60px Consolas', fill: '#fff' }).setOrigin(0.5);
        this.add.image(this.width / 2, this.height / 4, 'front').setOrigin(0.5);
        this.boton = this.add.image(this.width / 2, this.height / 1.15, 'boton').setInteractive();
        this.boton.setScale(0.5);
        this.boton.on('pointerdown', () =>this.scene.start('Login', { vida: 0, puntos: 0})); // Volver a jugar
    }

}