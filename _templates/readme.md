## DO NOT EDIT INSIDE THE TEMPLATE FOLDER

If you are starting a new design, copy the entire folder (module template, power module template, or Heisenberg template) to the mdfc/ directory and rename the folder to the name of your new design.

##  The libraries are not set correctly in these templates. 

To fix the libraries, go into the schematic editor, then go to preferences, manage symbol libraries, project specific libraries, and add the MDFC Common library using the path: ${KIPRJMOD}/../_libraries/mdfc-common.kicad_sym

Remove any other project specific libraries and hit save.

Then go to the pcb editor, preferences, manage footprint libraries, project specific libraries, and add the MDFC common library using path: ${KIPRJMOD}/../_libraries/mdfc-common.pretty

Remove any other project specific libraries and hit save. Then go to tools, update footprints from library, and make sure update all footprints on board is selected, and the check boxes for clearance overrides, and 3d models is selected. click update, then close. 

Now all the common libraries should be corrected. Go into the 3d viewer and you should be able to see 3d models for the common components (connectors, teensy 4.1)

Add new libraries inside your project folder for symbols/footprints using the symbol/footprint editors. 
**Make sure these show up as project specific libraries, and use relative references like above, not C:/Users...**

Also add a .3dshapes folder to put all your step files in. 


You are now ready to start working. Remember not to edit any shared components, mounting holes, or board outline, this will prevent your board from correctly working with the others. You can always refer back to the template files to see what the correct spacing is if you accidentally move something. It is recommended that you keep these components locked unless otherwise needed.
