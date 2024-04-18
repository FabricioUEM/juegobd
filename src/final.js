// Importar la función fetchDataBestScore desde el archivo api.js
import { fetchDataBestScore } from "./api/best_scores.js";
import { finalScore } from "./api/final_score.js";
import { pointsCreate } from "./api/points_create.js";
import { completeWithSpaces } from "./config/util.js";
export default class Final extends Phaser.Scene {
  constructor() {
    super({ key: "Final" });
  }

  init(data) {
    this.vida = data.vida;
    this.puntos = data.puntos;
    this.contadorSegundos = data.contadorSegundos;
    this.email = data.email;
  }

  preload() {
    this.leaderboardData = [];
    this.load.image("boton", "./assets/btn.png");
    this.load.image("felicidades", "./assets/mapas/felicidades.png");
    this.load.image("puntuacion", "./assets/mapas/puntuacion.png");
    this.load.image("replay", "./assets/mapas/replay.png");
    this.load.image("fondofin", "./assets/mapas/fin.png");
    this.load.image("front", "./assets/mapas/front2tablaeboard.png");
    this.load.image(
      "itemTemplate",
      "./assets/mapas/itemimagetemplateboard.png"
    );
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    console.log("puntos final:", this.puntos)
    console.log("vida final:", this.vida)
    console.log("contadorSegundos final:", this.contadorSegundos)
    this.score = parseInt(((this.vida * 20) + this.puntos) / (this.contadorSegundos/100)); // Calculamos la puntuación final de la partida
    console.log("score finla: " , this.score)
    finalScore(this.email, this.score)
      .then((result) => {
        console.log("Points created successfully:", result);
        fetchDataBestScore().then((data) => {
          console.log("mejores puntuaciones finales:" , data.best_scores)
          this.leaderboardData = data.best_scores || [];
          this.leaderboardData.map((entry, index) => {
            this.add.image(
              this.width / 2,
              this.height / 2.25 + index * 50,
              "itemTemplate"
            );
            this.add.text(
              this.width / 3.1,
              this.height / 2.35 + index * 50,
              completeWithSpaces(index + 1,5),
              { fontFamily: "Arial", fontSize: 24, color: "#000000" }
            );
            this.add.text(
              this.width / 2.8,
              this.height / 2.35 + index * 50,
             completeWithSpaces(entry.user.email.split("@")[0],28),
              { fontFamily: "Arial", fontSize: 24, color: "#000000" }
            );
            this.add.text(
              this.width / 1.6,
              this.height / 2.35 + index * 50,
              completeWithSpaces(entry.score,20),
              { fontFamily: "Arial", fontSize: 24, color: "#000000" }
            );
       
          });
        });
      })
      .catch((error) => {
        console.error("Error creating point:", error);
      });

  

    this.fondoFin = this.add
      .image(this.width / 2, this.height / 2, "fondofin")
      .setOrigin(0.5)
      .setScale(1.2);
    this.puntuacion = this.add
      .image(this.width / 2.2, this.height / 10, "puntuacion")
      .setOrigin(0.5);
    this.add
      .text(this.width / 1.5, this.height / 10, "" + this.score, {
        font: "60px Consolas",
        fill: "#fff",
      })
      .setOrigin(0.5);
    this.add.image(this.width / 2, this.height / 4, "front").setOrigin(0.5);
    this.boton = this.add
      .image(this.width / 2, this.height / 1.15, "boton")
      .setInteractive();
    this.boton.setScale(0.5);
    this.boton.on("pointerdown", () =>
      this.scene.start("Login", { vida: 0, puntos: 0 })
    ); // Volver a jugar
  }
}
