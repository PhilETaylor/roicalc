# ROI Calculator Form

A customizable web component built with LitElement that provides a form for collecting ROI-related information. This component can be easily embedded in any HTML page.

## Features

- Built with LitElement for optimal performance and compatibility
- Fully customizable through CSS
- Form validation included
- Responsive design
- Easy to integrate into any web project

## Installation

### Option 1: Using npm

```bash
npm install roi-calculator-form
```

Then import it in your JavaScript:

```javascript
import 'roi-calculator-form';
```

### Option 2: Direct import (for this demo)

Include the component directly in your HTML:

```html
<script type="module">
  import './src/roi-calculator-form.js';
</script>
```

## Usage

Once imported, you can use the custom element in your HTML:

```html
<roi-calculator-form></roi-calculator-form>
```

### Listening for form submission

The component dispatches a `form-submitted` event when the form is successfully submitted. You can listen for this event to get the form data:

```javascript
document.querySelector('roi-calculator-form').addEventListener('form-submitted', (e) => {
  console.log('Form data received:', e.detail);
  // Process the form data
});
```

## Form Fields

The form includes the following fields:

1. **Commerce Platform** (dropdown)
   - Options: Shopify Starter, Shopify Basic, Standard Shopify, Shopify Advanced, Shopify Plus, Magento Open Source, Adobe Commerce Cloud, Adobe Commerce On-Prem, BigCommerce, WordPress (WooCommerce), Other

2. **Operational Support Satisfaction** (radio buttons)
   - Options: Very unhappy, Unhappy, Neutral, Happy, Very happy

3. **Backlog Efficiency** (radio buttons)
   - Options: Very unhappy, Unhappy, Neutral, Happy, Very happy

4. **Challenges** (checkboxes, up to 3 selections)
   - Options: Development delays, Performance issues, Integration gaps, Platform limits, Unclear roadmap, Skills gap

5. **Roadmap Clarity** (radio buttons)
   - Options: Yes, Somewhat, No

6. **Contact Details** (text fields)
   - Name
   - Email
   - Job Title
   - Company Name

## Customization

### Styling

The component uses Shadow DOM for encapsulation, but you can customize its appearance by defining CSS custom properties:

```css
roi-calculator-form {
  --roi-form-background: #f9f9f9;
  --roi-form-text-color: #333;
  --roi-form-accent-color: #4CAF50;
}
```

## Development

### Prerequisites

- Node.js and npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running locally

```bash
npm start
```

This will start a development server and open the demo page in your browser.

### Building for production

```bash
npm run build
```

## License

MIT
