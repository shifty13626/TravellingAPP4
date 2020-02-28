const i2c = require('i2c-bus');
 
const mbed = 0x18;
const TEMP_REG = 0x05;
 
const toCelsius = rawData => {
  rawData = (rawData >> 8) + ((rawData & 0xff) << 8);
  let celsius = (rawData & 0x0fff) / 16;
  if (rawData & 0x1000) {
    celsius -= 256;
  }
  return celsius;
};
 
i2c.openPromisified(1).
then(i2c1 => i2c1.i2cWrite(mbed, wbuf.length, wbuf).
  then(_ => i2c1.i2cRead(mbed, rbuf.length, rbuf)).
  then(data => console.log(toCelsius(data.buffer.readUInt16BE()))).
  then(_ => i2c1.close())
).catch(console.log);