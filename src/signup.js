import { fetchSignUp } from './api/sign_up.js';
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
      signupDiv.on('submit', async (event) => {
          event.preventDefault(); // Previene el envío del formulario
          
          // Obtiene los valores de los campos de entrada
          const email = signupDiv.getChildByID('email').value;
          const password = signupDiv.getChildByID('password').value;
          const confirmPassword = signupDiv.getChildByID("confirm-password").value;
          const errorMessage = signupDiv.getChildByID('errorMessage');
          errorMessage.textContent = '';
          if (password !== confirmPassword) {
            errorMessage.textContent = 'Las contraseñas no coinciden';
            return;
        }
        
        try {
          const result = await fetchSignUp(email, password);
          console.log("Resultado del registro:", result);
          console.log("mensaje resultado; ", result)
          if (result.msg === 'User created successfully') {
              this.scene.start("Login");
          } else {
              errorMessage.textContent = 'Usuario o contraseña inválidos';
          }
      } catch (error) {
        console.error("Error al intentar registrarse:", error);
        errorMessage.textContent = 'Error al intentar registrarse';
      }

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
  