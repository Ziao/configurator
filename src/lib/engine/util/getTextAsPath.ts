import paper from "paper";

export const getTextAsPath = (text: string) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
      <text x="10" y="40" font-family="Arial" font-size="30" fill="black">${text}</text>
    </svg>`;

    const t = paper.project.importSVG(svgContent);

    console.log(t);
};
