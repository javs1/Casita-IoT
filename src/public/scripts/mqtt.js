const mqtt = require("express");
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
    client.subscribe("/SEIoT/TX_Pilin", (err) => {
      if (!err) {
        client.publish("presence", "Hello mqtt");
      }
    });
  });
  
  client.on("message", (topic, message) => {
    // message is Buffer
    var jotason = JSON.parse(message);
    console.log("Hora: " + jotason.Hora);
    console.log("Fecha: " + jotason.Fecha);
    console.log("Agua: " + jotason.Agua);
    console.log("Puerta: " + jotason.Puerta);
    console.log("Movimiento: " + jotason.Movimiento);
    console.log("Luz: " + jotason.Luz);
    console.log("Ventana: " + jotason.Ventana);
//client.end();
  });