import { type FC, isValidElement } from "react";

import { PageContent } from "../components/PageContent";
import iconsContent from "./03-05-touchpoint-Icons.md?raw";
import type { Icon } from "@nlxai/touchpoint-ui/src/components/ui/Icons";
import { Icons } from "@nlxai/touchpoint-ui";

interface PathProps {
  d: string;
}

interface SvgChild {
  props: PathProps;
}


/**
 * Generates an HTML table of icons.
 * 
 * SVG structure
 * -------------
 * <svg viewbox> = the dimensions of the SVG
 * <path(s)> = The 'drawings' that make up the icon (can have multiple paths)
 * 
 * This function extracts the paths from each of the icons and reconstructs the SVG with consistent dimensions.
 * 
 * @description
 * It processes each icon by:
 * 1. Extracting SVG paths from the icon component (getPathsFromIcon)
 * 2. Reconstructing the SVG with consistent dimensions (createSvgElement)
 * 3. Creating a table row with the icon name and visual preview (createTableRow)
 * 
 * @param {Record<string, Icon>} icons - A record where keys are icon names and values are Icon components
 * @returns {string} An HTML string containing a table with icon previews
 **/
const generateIconTable = (icons: Record<string, Icon>): string => {
  const skipEntries = ['iconSvgProps', 'Icon', 'IconProps'];

  const createTableHeader = () : string => `
<table>
<thead>
  <tr>
    <th>Icon Name</th>
    <th>Preview</th>
  </tr>
</thead>
<tbody>`;

  const createTableFooter = (): string => `
</tbody>
</table>`;

  const createSvgElement = (paths: string[]): string =>
    `<svg viewBox="0 0 24 24" width="24" height="24">${paths.join('\n')}</svg>`;

  const createTableRow = (name: string, svgElement: string): string => `
  <tr>
    <td>${name}</td>
    <td>${svgElement}</td>
  </tr>`;

  const createPath = (d: string): string =>
    `<path d="${d}" fill="currentColor"/>`;


  const getPathsFromIcon = (IconComponent: Icon): string[] => {
    const rendered = IconComponent({});
    if (!isValidElement(rendered)) {
      return [];
    }

    const children = rendered.props.children;
    const isString = (c : any) : boolean => typeof (c as SvgChild)?.props?.d === 'string'

    // Handle single path
    const isSinglePath: boolean = !Array.isArray(children) && children?.props?.d;
    if (isSinglePath && isString(children)) {
      return [createPath((children as SvgChild).props.d)];
    }
    
    // Handle multiple paths
    if (Array.isArray(children)) {
      return children
        .filter((child): child is SvgChild => isString(child))
        .map(child => createPath(child.props.d));
    }
    
    return [];
  };

  const rows = Object.entries(icons)
    .filter(([name]) => !skipEntries.includes(name))
    .reduce((acc, [name, IconComponent]) => {
      const paths = getPathsFromIcon(IconComponent);
      if (paths.length > 0) {
        const svgElement = createSvgElement(paths);
        return acc + createTableRow(name, svgElement);
      }
      return acc;
    }, '');

  return createTableHeader() + rows + createTableFooter();
};

export const content = `${iconsContent}
## Icon Gallery
${generateIconTable(Icons)}`;

export const navGroup: string = "Touchpoint components";

export const title: string = "Icons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
