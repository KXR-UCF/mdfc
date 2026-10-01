## **LTI Modular DAQ & Flight Computer**

This is a teensy 4.1 based analog data acquisition system and flight computer.

It consists of 5 PCBs:

** Heisenberg (Mainboard) **
The Heisenberg board carries the Teensy 4.1 and all the modules, mounts to the chassis, and has the servo/aux connector. It provides the same pinout to each of the two modules so they are interchangeable.

** Fring/Schrader (Flight/Ground Power Modules) **
These boards convert input voltage, either from battery during flight use or power over ethernet for ground use, into the necessary voltages for the rest of the system. They also handle the ethernet input to the Teensy 4.1, and allow the Teensy 4.1 to independently enable/disable each voltage output.

** Goodman (ADC Module) **
This board carries the HiLetgo ADS1256 board, along with analog circuitry and a sensor connector, for use with analog sensors such as Pressure Transducers, Thermocouples, and Load Cells. A future development will be to create a fully SRAD ADC module instead of relying on the COTS ADS1256 board.

** Pinkman (Flight Sensor/Telemetry Module) **
This board contains flight sensors (IMU and barometric), a GPS receiver, and a 433 MHz LoRa radio for telemetry in flight.



The Heisenberg board has 2 module slots and 1 power module slot, and its two primary configurations are as follows:

* DAQ/Ground use: 
	Module A: Goodman
	Module B: Goodman
	Power Module: Schrader
PoE powered, 16 channel analog input, no flight sensor/telemetry, no servo output.
* Flight use:
	Module A: Goodman
	Module B: Pinkman
	Power Module: Fring
Battery powered, 8 channel analog input, flight sensors/telemetry, servo output.
