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

    // Escucha el evento 'submit' para manejar el envío del formulario
    loginDiv.on("submit", (event) => {
      event.preventDefault(); // Previene el envío del formulario

      // Obtiene los valores de los campos de entrada
      const email = loginDiv.getChildByID("email").value;
      const password = loginDiv.getChildByID("password").value;
      this.scene.start("Menu")
      // Realiza la lógica de autenticación aquí
      console.log(`email: ${email}, Password: ${password}`);
    });

    document.getElementById("signupLink").addEventListener(
      "click",
      (event) => {
        // Prevenir el comportamiento predeterminado del enlace
        event.preventDefault();

        // Cambiar a la escena de registro (signupScene en este ejemplo)
        this.scene.start("Signup");
      },
      false
    );
  }
}
