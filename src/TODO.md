## Todo
- [x] OR add parts yourself as needed, but then the order matters (how does a wall know that there is a top part?)
- [x] Implement grids for features
- [x] Grid spacing
- [ ] Implement inlay textile cover thingy
- [ ] Implement lid textile sandwich thingy
- [ ] Scale canvas height automatically based on packed parts
- [ ] See if we can still move to a single object for project definition, dependencies can be resolved during render (such as slots, thicknesses, etc)
- [x] confirm that drawslots work well with dividers (they dont)
- [x] fix rounding of drawslots, dont rely on node index
- [x] fix positioning of drawlots when placed on a grid
- [x] cardassist should take bottom grid into account and produce multiple parts
- [ ] parts for textile (one piece that unfolds or individual pieces)
  - One piece = harder to insert BUT may play nicer with cardassist.
  - Also how do we attach it to the box?
- [ ] Different materials per component? Or is the textile for a specific component itself a component? And then it is generated based on the component it is meant for?
- [ ] Arbitrary slot positions (dont forget card assist)
- [ ] Find a way to engrave things like the inner lid onto the lid, the grid onto the bottom, etc (onRender callback (array)? As a hook to add more shit to groups?)
- [ ] Graphics that can do images
- [ ] Come up with a nice way to be able to remove components from the box, when they cover the whole thing
- [ ] Box height should INCLUDE the lid -> make a util function to generate box dimensions, including specifying inside or outside measurements (calculateBoxDimension(w,d,h,thickness,includeLid,inside=false))
- [ ] Split up createBoxComponent.ts
- [x] Alignment for graphics, refactor center
- [x] Min 3 slots on walls for stability
- [ ] punchSlotsNew rename and take slotConfig param
- [ ] allow any graphic to be masked with a param
- [ ] figure out a way to NOT need a lid when a box will have a stack on top, the dividers currently reach the box height -> then again, if we go with the silicone feet route, it doesnt matter
- [ ] Allow selecting which components and even parts you want to render -> also then pack everything again
- [ ] Use packer2, and spit out multiple svg files when things don't fit, also use proper sheet height
- [ ] Faux leather pull tabs -> cut a small hole in the walls for a rivet?

## Component types
- [x] Box

## Feature types
- [x] Graphic
- [x] Drawslot
- [ ] Text (wont do, export with figma)
- [x] Inner walls on a grid
- [ ] Hinges?

## Project ideas
- [ ] Modular desk organizer
- [ ] Modular storage box
- [ ] Art frame
- [ ] Drawer inlays
