const i2c = require('i2c-bus');
 
const MCP9808_ADDR = 0x04;
const rasp = 0x05;
 
const toCelsius = rawData => {
  console.log(rawData & 0x0fff);
  console.log(typeof(rawData & 0x0fff));
  let celsius = (rawData & 0x0fff) / 16;
  if (rawData & 0x1000) {
    celsius -= 256;
  }
  return celsius;
};
 
//const wbuf = Buffer.from([rasp]);
const wbuf = Buffer.from([0x01, 0x32]);
const rbuf = Buffer.alloc(2);

for (var i=0; i<wbuf.length; i++)
{
  console.log(wbuf[i]);
  console.log(typeof(wbuf[i]));
}

/*
console.log ("loop");
while (true)
{
  console.log("launch");
  setTimeout(action, 3000);
  console.log("end launch");
}

function action ()
{*/
  console.log("Envoi");
  i2c.openPromisified(1).
  then(i2c1 => i2c1.i2cWrite(MCP9808_ADDR, wbuf.length, wbuf).
    then(_ => i2c1.i2cRead(MCP9808_ADDR, rbuf.length, rbuf)).
    then(data => console.log(data.buffer.readUInt16BE() & 0x0fff )).
    then(_ => i2c1.close())
  ).catch(console.log);
  console.log("Envoyé");
//}