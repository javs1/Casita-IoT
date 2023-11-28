const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");
const Schema = mongoose.Schema;

const MyModel = new Schema({
  hora: { type: String },
  fecha: { type: String },
  agua: { type: String },
  puerta: { type: String },
  movimiento: { type: String },
  luz: { type: String },
  ventana: { type: String },
});

const MyModelModel = mongoose.model("MyModel", MyModel);

const getData = async () => {
  try {
    const documents = await MyModelModel.find();

    // Transforma los documentos a un array de objetos JSON
    const data = documents.map(document => {
      // Filtra las propiedades que no quieres incluir en el JSON si es necesario
      const { _id, __v, ...data } = document.toObject();
      console.log(data);
      return data;
    });

    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

// settings
const path = require('path')
const app = express();
const port = process.env.PORT || 9000;

app.set('views', path.join(__dirname, 'views')); // Ajusta la ruta según tu estructura
app.set('view engine', 'ejs');


// Middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/grafica2', async (req, res) => {
  try {
    const data = await getData();
    res.render('grafica2', { datos: data });
  } catch (error) {
    res.status(500).send('Error interno del servidor');
  }
});

client.on("connect", () => {
  client.subscribe("/SEIoT/Mondongo", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on("message", (topic, message,req, res) => {
  // message is Buffer
  var jotason = JSON.parse(message);
    console.log("Hora: " + jotason.Hora);
    console.log("Fecha: " + jotason.Fecha);
    console.log("Agua: " + jotason.Agua);
    console.log("Puerta: " + jotason.Puerta);
    console.log("Movimiento: " + jotason.Movimiento);
    console.log("Luz: " + jotason.Luz);
    console.log("Ventana: " + jotason.Ventana);
    console.log("\n");

    

    const document = new MyModelModel({
      hora: jotason.Hora,
      fecha: jotason.Fecha,
      agua: jotason.Agua,
      puerta: jotason.Puerta,
      movimiento: jotason.Movimiento,
      luz: jotason.Luz,
      ventana: jotason.Ventana,
    });

    document.save((err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Documento insertado correctamente")
    });
  //client.end();
});


// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
