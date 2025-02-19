
Touchpoint provides two typography elements, BaseText and SmallText, to provide consistent styling and theme integration for text within Custom Components.

* **BaseText** - Primary text component in Touchpoint, used for main content, titles, and important information. 
* **SmallText** - Styling for secondary and supporting information in your interface. It uses reduced size and opacity to create visual hierarchy with BaseText.

## Import and Basic Usage

You can import the typography elements from touchpoint once the package has been installed or made available in your project.

### Import using `<script>`

Import the elements via `html` from Touchpoint. Useful when adding touchpoint to your project via `<script>`:

```javascript
<script src="https://unpkg.com/@nlxai/touchpoint-ui/lib/index.umd.js"></script>
<script>
  const { html } = nlxai.touchpointUi;
  const showHtmlTextUsageExample = () => {
    return html`
      <BaseText>PRIMARY_INFORMATION</BaseText>
      <SmallText>secondary_information</SmallText>
    `; 
  };
</script>
```

### Import using `import`

Import the elements to your project using import statements

```javascript
import { BaseText, SmallText } from '@nlxai/touchpoint-ui';

<BaseText>PRIMARY_INFORMATION</BaseText>
<SmallText>secondary_information</SmallText>
```

## Related Components
- [CustomCardRow](/touchpoint-CustomCards) for text layout
- [TextButton](/touchpoint-Buttons) for interactive text