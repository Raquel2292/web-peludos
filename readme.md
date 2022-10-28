# Peludos
## La  web para tu mascosta



## Descripción
Peludos es una web donde encontraras los mejores productos para tu mascota y los más valorados, también podrás subir tus productos favoritos.


## Histroias de Usuarios.

homepage: como usuario, quiero ver una vista previa de productos y poder buscar un el producto para mi mascota o ir a mi perfil desde la página de inicio.

sign up: Como usuario, quiero ver una página de bienvenida que me brinde la opción de iniciar sesión como usuario existente o registrarme con una nueva cuenta.

login: Como usuario, quiero ver una página de bienvenida que me brinde la opción de iniciar sesión como usuario existente.

logout - Como usuario, quiero ver una página  que me brinde la opción de cerrar sesión como usuario existente.

product-create-form - Como usuario, quiero poder  crear mi producto y poder subirlo a la web.

user-profile - Como usuario quiero comprobar la información de mi perfil y poder editarla.

## Rutas Backend

-GET/
auth/signup
auth/signup.hbs

-GET 
auth/login
auth/login.hb

-GET
auth/logout
redirec "/"

-GET
"/"
render "index"

-GET
/create-product
render products/create-product.hbs

-GET
/:animal/list
render "products/products.hbs

-GET
/:productId/edit
render products/edit-product.hbs

-GET
/:productId/comments
render products/comments.hb

-GET
"/
render profile/profile.hbs

-GET
edit-profile
render profile/edit-profile.hbs

-GET
/:userId/edit
render profile/edit

-GET
"/"
render "auth/login.hbs

##POST

-POST
/signup
render auth/signup.hbs

-POST
/:productId/edit
redirect /products/" + animal + "/list"

-POST
/:productId/comments
redirect /products/

-POST
/:productId/delete
redirect /products/

-POST
/:userId/edit
redirect /profile

-POST
/:userId/delete
redirect "/"

## MODELOS

-productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    productType: String,
    animal: String,
    comments:[String],
   cover: String, //imagen cloudinary
})

-userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      
     
      
    },
 favorites:[
      {
        type: Schema.Types.ObjectId,
        ref: "Products"

      }
    ],
      
   

    role:{
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },
    photo: String,
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Products"
    }]
    
    ## BACKLOG

-FAVORITOS
-RESTRINGIR PERMISOS AL QUE NO ESTA LOGADO.

## LINKS

https://github.com/Raquel2292/web-peludos.git