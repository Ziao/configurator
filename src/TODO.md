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
- [ ] cardassist should take bottom grid into account and produce multiple parts
- [ ] parts for textile (one piece that unfolds or individual pieces)
  - One piece = harder to insert BUT may play nicer with cardassist.
  - Also how do we attach it to the box?
- [ ] Different materials per component? Or is the textile for a specific component itself a component? And then it is generated based on the component it is meant for?
- [ ] Arbitrary slot positions (dont forget card assist)
- [ ] Find a way to engrave things like the inner lid onto the lid, the grid onto the bottom, etc (onRender callback (array)? As a hook to add more shit to groups?)
- [ ] Graphics that can do images

## Component types
- [x] Box

## Feature types
- [x] Graphic
- [x] Drawslot
- [ ] Text
- [x] Inner walls on a grid
- [ ] Hinges?

## Project ideas
- [ ] Modular desk organizer
- [ ] Modular storage box
- [ ] Art frame
