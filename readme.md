## **LTI Modular DAQ & Flight Computer**
<img width="772" height="445" alt="image" src="https://github.com/user-attachments/assets/cd0a3869-c8fc-4ef5-9cdb-99c6fdc7421b" />

This is a teensy 4.1 based analog data acquisition system and flight computer.

It consists of 5 PCBs:

**Heisenberg (Mainboard)**

The Heisenberg board carries the Teensy 4.1 and all the modules, mounts to the chassis, and has the servo/aux connector. It provides the same pinout to each of the two modules so they are interchangeable.
<img width="975" height="499" alt="image" src="https://github.com/user-attachments/assets/16c16d5b-fabd-4975-b413-39ed68dca25b" />
<img width="906" height="504" alt="image" src="https://github.com/user-attachments/assets/35639977-25bc-4709-9e90-abeb607d266b" />



**Fring/Schrader (Flight/Ground Power Modules, these will most likely be two different PCBs)**

These boards convert input voltage, either from battery during flight use or power over ethernet for ground use, into the necessary voltages for the rest of the system. They also handle the ethernet input to the Teensy 4.1, and allow the Teensy 4.1 to independently enable/disable each voltage output.
<img width="845" height="222" alt="image" src="https://github.com/user-attachments/assets/6674b70a-e00c-4941-a908-ac4d32adb5d2" />
<img width="831" height="194" alt="image" src="https://github.com/user-attachments/assets/6ae2a45f-98b3-499a-8995-d87da682a709" />




**Goodman (ADC Module)**
This board carries the HiLetgo ADS1256 board, along with analog circuitry and a sensor connector, for use with analog sensors such as Pressure Transducers, Thermocouples, and Load Cells. A future development will be to create a fully SRAD ADC module instead of relying on the COTS ADS1256 board.

**Pinkman (Flight Sensor/Telemetry Module)**
This board contains flight sensors (IMU and barometric), a GPS receiver, and a 433 MHz LoRa radio for telemetry in flight.
<img width="910" height="400" alt="image" src="https://github.com/user-attachments/assets/8ab68ed2-8afe-46c4-a88b-1f044002fa3c" />
<img width="885" height="403" alt="image" src="https://github.com/user-attachments/assets/29929d5e-8f0c-472b-a31c-0b0bdcd9373f" />



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


**The primary goals of this project are:**

* Emulate the EE design, collaboration, integration, and test processes used in the aerospace industry to provide a valuable learning experience for members
* Increase the sampling speed of the DAQ system
* Increase the expandability of the DAQ system
* Move ADCs closer to sensors to decrease analog wire length for less noise
* Improve power filtering for ADCs and load cells
* Record fast analog data in flight
* Transmit flight data to ground via telemetry at the highest speed possible
* Create a platform that can be expanded and upgraded by future students




## Copyright

Copyright © 2026 Knights Experimental Rocketry (KXR). All Rights Reserved.

No permission is granted to reproduce, modify, distribute, manufacture from,
or commercially use the contents of this repository without written
authorization from KXR.
