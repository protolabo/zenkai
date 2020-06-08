# DOM user guide

Helpers from the **DOM** library aim to help you:

- create HTML elements
- manipulate HTML elements (attributes, children, position)
- query the DOM
- verify the type of an object
- copy content (to clipboard)

## Create

Helpers of this category allow you to create:

- HTML element with attributes and children
- Document fragment
- Text node

### Example

#### Javascript

This method uses the basic helpers and provide semantic naming to get an idea of what you are creating.

```javascript
createUnorderedList({ id: "listId", class: ["bare-list", "items"] }, [
    createListItem({ class: "item" }, "header text"),
    createListItem({ class: "item" }, [
        createSpan({ class: "some-class" }, "start with"),
        createStrong({ class: "important-class" }, "the important stuff"),
        "please",
    ]),
    createListItem({ class: "item" }, "yet another item")
]);
```
