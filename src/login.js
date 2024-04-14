
import { fetchSignIn } from './api/sign_in.js';

export default class Login extends Phaser.Scene {
  constructor() {
    super({ key: "Login" });
  }

  preload() {
    this.load.html("loginForm", "../login.html");
    this.load.image("boton", "./assets/btn.png");
    this.load.image("inicio", "./assets/mapas/inicio.png");
    this.load.image("titulo", "./assets/mapas/titulo.png");
    this.load.image("fondomenu", "./assets/mapas/Purple.png");
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.fondoMenu = this.add
      .image(this.width / 2, this.height / 2, "fondomenu")
      .setOrigin(0.5)
      .setScale(1.3);
    this.imageninicio = this.add
      .image(this.width / 2, this.height / 2, "inicio")
      .setOrigin(0.5)
      .setScale(1.75);

    const htmlString = this.cache.html.get("loginForm");
    const loginDiv = this.add
      .dom(this.width / 2, this.height / 2)
      .createFromHTML(htmlString);
    loginDiv.setInteractive();

    loginDiv.setVisible(true);

    loginDiv.addListener("submit");
    loginDiv.on("submit", async (event) => {
      event.preventDefault();
      const email = loginDiv.getChildByID("email").value;
      const password = loginDiv.getChildByID("password").value;
      const errorMessage = loginDiv.getChildByID('errorMessage');
      errorMessage.textContent = ''
      const result = await fetchSignIn(email,password)
      console.log("mi result is ", result["is_valid"])
      if (result["is_valid"] == true) {
        this.scene.start("Menu", {email})
      }else{
        errorMessage.textContent = 'Inválido usuario o contraseña';
      }
      console.log(`email: ${email}, Password: ${password}`);
    });

    document.getElementById("signupLink").addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        this.scene.start("Signup");
      },
      false
    );
  }
}
