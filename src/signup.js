export default class Signup extends Phaser.Scene {
    constructor() {
      super({ key: "Signup" });
    }
  
    preload() {
      this.load.html("signupForm", "../signup.html");
      this.load.image("inicio", "./assets/mapas/inicio.png");
      this.load.image("fondomenu", "./assets/mapas/Purple.png");
    }
  
    create() {
      this.width = this.sys.game.config.width;
      this.height = this.sys.game.config.height;
      this.fondoMenu = this.add.image(this.width / 2, this.height / 2, 'fondomenu').setOrigin(0.5).setScale(1.3);
      this.imageninicio = this.add.image(this.width / 2, this.height / 2, 'inicio').setOrigin(0.5).setScale(1.75);

      const htmlString = this.cache.html.get('signupForm');
      const signupDiv = this.add.dom(this.width / 2, this.height / 2).createFromHTML(htmlString);
      signupDiv.setInteractive();

      signupDiv.setVisible(true);

      signupDiv.addListener('submit');
  
      // Escucha el evento 'submit' para manejar el envío del formulario
      signupDiv.on('submit', (event) => {
          event.preventDefault(); // Previene el envío del formulario
          
          // Obtiene los valores de los campos de entrada
          const email = signupDiv.getChildByID('email').value;
          const password = signupDiv.getChildByID('password').value;
       
          // Realiza la lógica de autenticación aquí
          console.log(`email: ${email}, Password: ${password}`);
      });

      document.getElementById("loginLink").addEventListener(
        "click",
        (event) => {
          // Prevenir el comportamiento predeterminado del enlace
          event.preventDefault();
  
          // Cambiar a la escena de registro (signupScene en este ejemplo)
          this.scene.start("Login");
        },
        false
      );
  
    }
  }
  