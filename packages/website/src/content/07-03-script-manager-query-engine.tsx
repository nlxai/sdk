import { type FC } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
At the heart of [@nlxai/voice-plus-web](https://www.npmjs.com/package/@nlxai/voice-plus-web) are Triggers,
which allow users to annotate various interactions on a page with Voice+ capabilities without writing any code.

For most of these, there needs to be a way to specify a particular element of interest on the target webpage 
(as for instance clicking "Buy now" is different from "Log out"). This is where the query engine comes in.

The query engine is responsible for identifying elements of interest. You may think that's a job for 
CSS selectors (and we do support those as well), but they are not ideal since they can become quite brittle 
as the annotated web page changes. It is comparatively easy to break most CSS selectors even when just changing 
simple visual properties like colors or spacing, doubly so when the developer responsible for those changes isn't
keeping in mind that the DOM structure should maintain some sort of backwards compatibility.

## The accessibility tree

Browsers represent the visual UI as a tree structure called the DOM tree, that encode all the relations needed to 
construct all the visual elements needed to render the page. However, for users with disabilities, there is also a parallel
tree that is constructed called the accessibility tree. This tree is used by screen readers and other assistive technologies
to render the page in a way that omits all the visual styling, but perhaps provides better textual labeling for the various
interactive elements on the page. For instance, where your eyes may see an icon of a shopping cart, a screen reader may
just read "Shopping cart".

The accessibility tree provides a good structure to write queries against for the following reasons:

1. There are various legal requirements to provide good accessibility features (such as ADA in the US), so there
   is usually no further work required to annotate a website for compatibility with the Journey Manager. Indeed,
   if elements are difficult to select using the query engine, this is usually an accessibility issue that should be
   addressed promptly to avoid legal risk.

2. The accessibility tree tends to be more stable than the DOM tree. While the DOM tree may change due to visual updates,
   the accessibility tree tends to stay the same as long as the functionality is the same. We support regular expressions in
   our queries and encourage their use to make accessibility based queries robust against minor stylistic changes such as capitalization 
   and white space.

3. Conversely, the DOM tree may stay the same while important features change. Consider the \`.top-menu.right .primary-button\` CSS selector.
   You may have been targeting the "Shopping cart" button that was in the top right of the menubar, however a redesign has actually moved
   the "Sign out" button into the same position. In this case, your journey may keep working without any errors, but provides completely 
   misguided guidance to the user. However, a query for a \`link\` role with the text "Shopping cart" would now fail if there was no longer a shopping cart on the page and you would be alerted to the issue and able to fix the problem.

## Query types

The query engine supports the following types of queries:

### \`Role\`

The role query is used to select elements based on their [WAI-ARIA accessibility role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles). Many [built-in HTML elements have corresponding ARIA roles](https://www.w3.org/TR/html-aria/#docconformance), for instance \`<input type="radio">\` has the role \`radio\`, however other
elements can have a role assigned to them using the \`role\` attribute. For instance, a custom dropdown menu may have the role \`combobox\`.

This is usually paired with a regular expression match on the label of the element. The label is also computed from the accessibility tree. For many elements, their label is simply their text content, but for form elements it could be their matching \`<label>\` element, whereas for still others it can be produced by \`aria-label\`, \`aria-labelledby\` or other attributes.

The role query thus provides a robust way to talk about UI elements and should be strongly preferred in most situations.

~~~json
{
    "name": "Role",
    "target": "button",
    "options": {
        "name": {
            "regexp": "shopping\\w+cart",
            "flags": "i"
        }
    }
}
~~~

### \`LabelText\`

Will search for any element whose accessibility label matches the provided regex. Useful if the target element has no useful ARIA role or the role may change unpredictably.

~~~json
{
    "name": "LabelText",
    "target": {
        "regexp": "shopping\\w+cart",
        "flags": "i"
    } 
}
~~~

### \`PlaceholderText\`

This will search for all elements with a \`placeholder\` attribute and find one that matches the given target.

~~~json
{
    "name": "PlaceholderText",
    "target": "Search"
}
~~~

### \`Text\`

This will search for all elements that have a text node with textContent matching the given target.

~~~json
{
    "name": "Text",
    "target": {
        "regexp": "flight no \\d+",
        "flags": "i"
    } 
}
~~~

### \`DisplayValue\`

Finds the \`input\`, \`textarea\`, or \`select\` element that has the matching display value (that is not the value of the \`value\` attribute, but the text that the user may have entered).

~~~json
{
    "name": "DisplayValue",
    "target": "yo dogg"
}
~~~

### \`AltText\`

Finds the element (normally an \`<img>\`) that has the given alt text. Note that it only supports elements which accept an alt attribute or custom elements (since we don't know if a custom element implements alt or not): \`<img>\`, \`<input>\`, and \`<area>\` (intentionally excluding \`<applet>\` as it's deprecated).

~~~json
{
    "name": "AltText",
    "target": "logo"
}
~~~

### \`Title\`

Returns the element that has the matching title attribute.

Will also find a title element within an SVG.

~~~json
{
    "name": "Title",
    "target": "Some nice tooltip text here"
}
~~~

### \`QuerySelector\`

This is a catch-all query for when none of the above queries are suitable. It will use the provided CSS selector to find elements.

Keep in mind some of the warnings above.

~~~json
{
    "name": "QuerySelector",
    "target": ".top-menu.right .primary-button"
}
~~~

## Other options 

All queries support a \`parent\` option, which will restrict the search to only children of the parent query. This can be useful to disambiguate between multiple elements that match the query.
`;

export const ScriptManagerQueryEngine: FC<unknown> = () => {
  return (
    <>
      <PageTitle
        pretitle="Script manager"
        title="Understanding the query engine"
      />
      <PageContent md={content} />
    </>
  );
};
