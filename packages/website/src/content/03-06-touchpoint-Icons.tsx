import { type FC, isValidElement } from "react";

import { PageContent } from "../components/PageContent";
import iconContent from "./03-06-touchpoint-Icons.md?raw";

import { Icons } from "../../../touchpoint-ui/";
import { type Icon } from "../../../touchpoint-ui/src/components/ui/Icons";



const generateIconTable = (icons: Record<string, Icon>): string => {
  const skipEntries = ['iconSvgProps', 'Icon', 'IconProps'];

  const createTableHeader = () => `
<table>
<thead>
  <tr>
    <th>Icon Name</th>
    <th>Preview</th>
  </tr>
</thead>
<tbody>`;

  const createTableFooter = () => `
</tbody>
</table>`;

  const createSvgElement = (paths: string[]) => 
    `<svg viewBox="0 0 24 24" width="24" height="24">${paths.join('\n')}</svg>`;

  const createTableRow = (name: string, svgElement: string) => `
  <tr>
    <td>${name}</td>
    <td>${svgElement}</td>
  </tr>`;

  const createPath = (d: string) => 
    `<path d="${d}" fill="currentColor"/>`;

  const getPathsFromIcon = (IconComponent: Icon) => {
    const rendered = IconComponent({});
    if (!isValidElement(rendered)) {
      return [];
    }

    const children = rendered.props.children;
    
    // Handle single path
    if (!Array.isArray(children) && children?.props?.d) {
      return [createPath(children.props.d)];
    }
    
    // Handle multiple paths
    if (Array.isArray(children)) {
      return children
        .filter(child => child?.props?.d)
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

export const content = `Touchpoint provides built-in icons that integrate with buttons and custom components. Each icon maintains consistent styling and accessibility features.
## Icon Gallery
${generateIconTable(Icons)}

${iconContent}`;

export const navGroup: string = "Touchpoint components";

export const title: string = "Icons";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
