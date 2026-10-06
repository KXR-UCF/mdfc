## This is copied from sharepoint, the sharepoint version is the official version

**LTI MDFC Github/Kicad Standards**
https://github.com/KXR-UCF/mdfc 
All MDFC boards will be made in KiCad 10.

# File Naming Convention
Each PCB project and folder should use the existing board name:
heisenberg/
goodman/
pinkman/
fring/
schrader/
Project files should use the same lowercase board name.
For hierarchical schematic sheets, use short descriptive lowercase names separated by hyphens.
Examples:
power
sensors
servo-output
pressure-inputs
radio
gps
power-regulation
Avoid generic names such as sheet1 or schematic2.

# Libraries
Common library: _libraries/  Use for symbols/footprints/3d models shared between multiple MDFC boards. 
Local library: in each project folder such as /heisenberg/heisenberg.kicad_sym Used for all other parts
All library paths must be relative to the project/repository, not specific to your computer. For example (individual libraries):
Symbols:
${KIPRJMOD}/goodman.kicad_sym
Footprints:
${KIPRJMOD}/goodman.pretty
3D models:
${KIPRJMOD}/goodman.3dshapes/part.step
(Shared libraries):
Symbols:
${KIPRJMOD}/../_libraries/mdfc-common.kicad_sym
Footprints:
${KIPRJMOD}/../_libraries/mdfc-common.pretty
3D models:
${KIPRJMOD}/../_libraries/mdfc-common.3dshapes/part.step

# Board Interfaces
The provided templates contain the required board outline, mounting holes, and connectors, do not change any of these without coordinating with the team or your board won’t fit onto the others.

# GITHUB WORKFLOW
Everyone will work directly on main.
1.	Open GitHub Desktop and Fetch/Pull the latest version of main before starting work.
2.	Work only inside your assigned PCB folder unless you are intentionally modifying a shared file.
3.	Make your changes in KiCad and save the project normally.
4.	Before committing, check the Changes tab in GitHub Desktop and make sure only files you intended to modify are being changed.
5.	Commit regularly with a short message describing the actual change.
Examples:
[GOODMAN] Add ADS1256 input stage
[PINKMAN] Add GPS circuitry
[FRING] Route 5V regulator
[HEISENBERG] Add servo output connectors
Avoid commit messages such as:
Update, changes, stuff, final, fixed etc. 
6.	Before pushing, Fetch/Pull again in case someone else has pushed changes since you started.
7.	If there are no conflicts, Push to main.
8.	If Git reports a conflict in a KiCad schematic, PCB, symbol, footprint, or shared library file, do not blindly combine the files. Coordinate with whoever changed the conflicting file before proceeding.
9.	Changes to _libraries/ or any other shared files should be coordinated with the team before editing.

# GENERAL RULE
Pull before starting work, pull again before pushing, commit regularly, and coordinate any change that affects shared files or another MDFC board.

