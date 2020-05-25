/* mbed Microcontroller Library
 * Copyright (c) 2019 ARM Limited
 * SPDX-License-Identifier: Apache-2.0
 */

#include "mbed.h"
#include "platform/mbed_thread.h"

#define MVT         1
#define DIRN        2
#define FRN         3
#define MVT_CAM     4
#define FRN_CAM     5
#define DIR_CAM     6

//DigitalOut led(LED1);
Serial ser(USBTX, USBRX);
I2CSlave slave(p9, p10);

PwmOut vitesse(p22);
PwmOut frein(p24);
DigitalOut sens(p29);

int internadress = 0x08;
int raspaddr = 0x05;

int main()
{       
    ser.baud(9600);
    slave.frequency(100000);
    slave.address(internadress);
    vitesse.period(0.0001);
    frein.period(0.0001);
    vitesse.write(0);
    
    ser.printf("init\n");
    
    int cmdid;
    int cmd = 0;
    
    //timer.reset();
    while (true) {
        if(slave.receive() == 3)
        {
            ser.printf("ok\n");
            cmdid = slave.read();
            cmd = slave.read();            
    
            //ser.printf("read\n");
            ser.printf("id : %d\n", cmdid);
            ser.printf("cmd recue : %d\n", cmd);
            ser.printf("%f\n", cmd * 234.6 * 6.28/60 * 0.0145);

            //vitesse.write(cmd * 2.346 * 6.28/60 * 0.0145);
            
            switch (cmdid)
            {
                case MVT:
                    ser.printf("MVT\n");
                    ser.printf("vitesse : %f\n", cmd*2.346*6.28/60 * 0.0145);
                    vitesse.write(cmd*2.346*6.28/60 * 0.0145);
                    //frein.write(cmd/10.0);
                break;
                
                case DIRN:
                    ser.printf("DIRN\n");
                    if(sens.read() == 0){
                        sens.write(1);
                        slave.write(0x01);
                    }
                    else 
                    {
                        sens.write(0);
                        slave.write(0x00);
                    }
                break;
                case FRN:
                    ser.printf("FRN\n");
                    frein.write(cmd*2.346*6.28/60 * 0.0145);
                break;
                /*case MVT_CAM:
                    ser.printf("MVT_CAM\n");
                break;
                case FRN_CAM:
                    ser.printf("FRN_CAM\n");
                break;
                case DIR_CAM:
                    ser.printf("DIR_CAM\n");
                break;
                */
                default:
                break;
            }
        }
        //vitesse.write(cmd*2.346*6.28/60 * 0.0145);
        slave.write(0x79);     
    }
}
