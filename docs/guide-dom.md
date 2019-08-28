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

>Recommended when using few helpers for **optimal file size**.

```javascript
createUnorderedList({ id: 'listId', class: ['bare-list', 'items'] }, [
    createListItem({ class: 'item' }, "header text"),
    createListItem({ class: 'item' }, [
        createSpan({ class: 'funny-stuff' }, "start with"),
        createStrong({ class: 'funny-stuff' }, "the important stuff"),
        "please",
    ]),
    createListItem({ class: 'item' }, "yet another item")
]);
```

This method uses a dictionnary to map HTML tagName to the helpers. As a result, the code looks more like its HTML counterpart while providing type safety for the elements.

>Recommended when using lots of helpers for **HTML-like appearance**.

```javascript
EL.ul({ id: 'listId', class: 'bare-list items' }, [
    EL.li({ class: 'item' }, "header text"),
    EL.li({ class: 'item' }, [
        EL.span({ class: 'some-class' }, "start with"),
        EL.strong({ class: 'important-class' }, "the important stuff"),
        "please",
    ]),
    EL.li({ class: 'item' }, "yet another item")
]);
```

#### HTML

```html
<ul id="listId" class="bare-list items">
    <li class="item">header text</li>
    <li class="item">
        <span class="some-class">start with</span>
        <strong class="important-class">the important stuff</strong>
        please
    </li>
    <li class="item">yet another item</li>
</ul>
```
