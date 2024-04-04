import { createBoxComponent } from "../../lib/wyrm/component/createBoxComponent.ts";
import { createProject } from "../../lib/wyrm/project/project.ts";

const caveBox = createBoxComponent({
    name: "Cave Box",
    params: {
        width: 80,
        depth: 40,
        height: 40,
    },
});

export const wyrmspan = createProject({
    name: "WyrmSpan",
    description: "Inlays for the Wyrmspan game box",
    sheetWidth: 300,
    components: [caveBox],
});
