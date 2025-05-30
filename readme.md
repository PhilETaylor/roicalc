# To use

First, in Hubspot create a new form; you don't need to match the form fields unless you want to use them in automations.

Search for "Additional Site Domains" in the main HubSpot search, this takes you to:

Settings, Account management -> Tracking & Analytics -> Tracing Code -> Reports & Analytics Tracking -> Advanced Tracking -> Additional Site Domains

Add any and all domains you want to use the form on to this list od domains. 

Next,add the following to your HTML Head in WordPress, making sure the path to the JS file is correct:

```html
<script type="module">
    import './path/to/roi-calculator-form.js';
</script>
```

Then anywhere on any page, add the custom element tag, making sure to set your portal ID and form Guid in the attributes:

```html
<roi-calculator-form 
    portal-id="XXXXXX" 
    form-guid="5e1eff2f-86b6-XXXX-XXXX-b68256423b7a"
></roi-calculator-form>
```
