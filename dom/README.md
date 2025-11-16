# DOM Utilities Library (TypeScript)

A comprehensive, type-safe DOM manipulation library for modern web applications.

## 📦 Installation

```bash
npm install @yourorg/dom-utils
```

## 🚀 Features

- **Full TypeScript support** with proper DOM types
- **Tree-shakeable** - import only what you need
- **Zero dependencies** (except @protolabo/zenjs for utilities)
- **Comprehensive** - 100+ element creation functions
- **Spatial positioning** - Advanced element positioning utilities
- **Well-documented** - Full JSDoc comments

## 📚 API Reference

### DOM Parsing & Type Checking (`dom-parse`)

```typescript
import { isElement, isHTMLElement, htmlToElement } from '@yourorg/dom-utils';

// Type checking with type guards
if (isHTMLElement(el)) {
    // TypeScript knows el is HTMLElement here
    el.classList.add('active');
}

// Check specific element types
if (isHTMLElement(el, 'button')) {
    // TypeScript knows el is a button
    el.disabled = true;
}

// Convert HTML string to elements
const div = htmlToElement('<div>Hello</div>');
const nodes = htmlToElements('<p>One</p><p>Two</p>');
```

### DOM Querying (`dom-query`)

```typescript
import { 
    getElement, 
    getElements, 
    findAncestor,
    getPreviousElementSibling 
} from '@yourorg/dom-utils';

// Optimized selectors (uses getElementById for #id, getElementsByClassName for .class)
const header = getElement('#header');
const buttons = getElements('.btn');

// Find ancestors with predicate
const form = findAncestor(input, (el) => el.tagName === 'FORM');

// Navigate siblings
const prev = getPreviousElementSibling(el);
const next = getNextElementSibling(el, (el) => !el.classList.contains('hidden'));
```

### DOM Manipulation (`element-manip`)

```typescript
import { addAttributes, changeSelectedValue } from '@yourorg/dom-utils';

// Add attributes to element
addAttributes(button, {
    class: 'btn btn-primary',
    disabled: true,
    'data-action': 'submit',
    style: 'color: blue;'
});

// Change select value
const select = document.querySelector('select');
changeSelectedValue(select, 'option-2');
```

### Element Creation (`dom-create`)

```typescript
import { 
    createDiv, 
    createButton, 
    createInput,
    createTable,
    createTableRow,
    createTableCell 
} from '@yourorg/dom-utils';

// Create elements with attributes and content
const button = createButton(
    { class: 'btn', type: 'submit' },
    ['Click Me']
);

const input = createInput({
    type: 'email',
    name: 'email',
    placeholder: 'Enter email',
    required: true
});

// Create complex structures
const row = createTableRow(null, [
    createTableCell(null, ['Name']),
    createTableCell(null, ['Age']),
    createTableCell(null, ['Email'])
]);
```

### Viewport & Positioning (`dom-view`)

```typescript
import { 
    isInViewport,
    getClosest,
    getElementTop,
    getVisibleElement 
} from '@yourorg/dom-utils';

// Check if element is visible in viewport
if (isInViewport(element)) {
    console.log('Element is visible');
}

// Get closest element in a direction
const above = getElementTop(current, container);
const right = getElementRight(current, container);

// Navigate with keyboard (useful for spatial navigation)
const next = getClosest(current, 'down', container);

// Filter with predicates (new in TypeScript version!)
const visibleAbove = getElementTop(
    current, 
    container, 
    true, 
    (el) => !el.classList.contains('hidden')
);
```

### Node Removal (`dom-remove`)

```typescript
import { removeChildren } from '@yourorg/dom-utils';

// Remove all children
removeChildren(container);

// Remove children matching predicate
removeChildren(container, (node) => {
    return node.nodeType === Node.TEXT_NODE;
});
```

## 🎯 Real-World Examples

### Creating a Form

```typescript
import { 
    createForm, 
    createDiv, 
    createLabel, 
    createInput,
    createButton 
} from '@yourorg/dom-utils';

const form = createForm({ action: '/submit', method: 'post' }, [
    createDiv({ class: 'form-group' }, [
        createLabel({ for: 'email' }, ['Email']),
        createInput({ 
            id: 'email', 
            type: 'email', 
            name: 'email',
            required: true 
        })
    ]),
    createDiv({ class: 'form-group' }, [
        createLabel({ for: 'password' }, ['Password']),
        createInput({ 
            id: 'password', 
            type: 'password', 
            name: 'password',
            required: true 
        })
    ]),
    createButton({ type: 'submit', class: 'btn-primary' }, ['Login'])
]);

document.body.appendChild(form);
```

### Keyboard Navigation Grid

```typescript
import { getClosest, isHTMLElement } from '@yourorg/dom-utils';

function setupGridNavigation(container: HTMLElement) {
    let currentCell: HTMLElement | null = null;

    container.addEventListener('keydown', (e) => {
        if (!currentCell) return;

        let direction: 'up' | 'down' | 'left' | 'right' | null = null;

        switch (e.key) {
            case 'ArrowUp': direction = 'up'; break;
            case 'ArrowDown': direction = 'down'; break;
            case 'ArrowLeft': direction = 'left'; break;
            case 'ArrowRight': direction = 'right'; break;
        }

        if (direction) {
            e.preventDefault();
            const next = getClosest(currentCell, direction, container);
            if (next && isHTMLElement(next)) {
                currentCell.classList.remove('active');
                next.classList.add('active');
                currentCell = next;
            }
        }
    });
}
```

### Dynamic Table Creation

```typescript
import { 
    createTable, 
    createTableHeader,
    createTableBody,
    createTableRow,
    createTableHeaderCell,
    createTableCell 
} from '@yourorg/dom-utils';

interface User {
    name: string;
    email: string;
    age: number;
}

function createUserTable(users: User[]): HTMLTableElement {
    const thead = createTableHeader(null, [
        createTableRow(null, [
            createTableHeaderCell(null, ['Name']),
            createTableHeaderCell(null, ['Email']),
            createTableHeaderCell(null, ['Age'])
        ])
    ]);

    const tbody = createTableBody(
        null,
        users.map(user =>
            createTableRow(null, [
                createTableCell(null, [user.name]),
                createTableCell(null, [user.email]),
                createTableCell(null, [user.age.toString()])
            ])
        )
    );

    return createTable({ class: 'user-table' }, [thead, tbody])!;
}
```

## 🔄 Migration from JavaScript

The TypeScript version maintains API compatibility with improvements:

```typescript
// Before (JavaScript) - hardcoded class filtering
getElementTop(source, container);

// After (TypeScript) - flexible predicate filtering
getElementTop(source, container, true, (el) => 
    !el.classList.contains('hidden')
);
```

### Key Improvements

1. **Type Safety**: All functions properly typed
2. **Flexible Filtering**: Predicates instead of hardcoded checks
3. **Missing Functions**: Added utility functions (isHidden, pixelToNumber, etc.)
4. **Better Precision**: Epsilon tolerance for floating-point comparisons
5. **Consistent API**: Unified optional parameters

## ⚠️ Breaking Changes

### 1. Positioning Functions Accept Predicates

```typescript
// Old: Hardcoded badge filtering
getElementTop(source, container);

// New: Custom filtering with predicates
getElementTop(source, container, true, (el) => 
    !el.hasAttribute('data-skip')
);
```

### 2. Import Paths

```typescript
// Before
import { getElement } from './dom-query.js';

// After
import { getElement } from '@yourorg/dom-utils';
```

## 🐛 Fixed Issues

| Issue | Severity | Status |
|-------|----------|--------|
| Missing imports (isHidden, pixelToNumber, etc.) | 🔴 Critical | ✅ Fixed |
| Hardcoded class checks ("badge") | 🟡 Medium | ✅ Fixed |
| Floating-point precision issues | 🟡 Medium | ✅ Fixed |
| Missing null checks | 🟢 Low | ✅ Fixed |

## 📊 Comparison with Similar Libraries

| Feature | This Library | jQuery | cash.js |
|---------|-------------|--------|---------|
| TypeScript Native | ✅ | ❌ | ⚠️ Types |
| Element Creation | ✅ 100+ | ⚠️ Basic | ⚠️ Basic |
| Spatial Navigation | ✅ | ❌ | ❌ |
| Bundle Size | ~20KB | ~90KB | ~6KB |
| Tree Shakeable | ✅ | ❌ | ✅ |
| Modern Browsers Only | ✅ | ❌ | ✅ |

## 💡 Tips

1. **Use type guards** for safer code:
   ```typescript
   if (isHTMLElement(el, 'button')) {
       // TypeScript knows el is HTMLButtonElement
   }
   ```

2. **Leverage tree-shaking**:
   ```typescript
   import { createDiv } from '@yourorg/dom-utils/dom-create';
   ```

3. **Use predicates for flexible filtering**:
   ```typescript
   const next = getElementTop(current, container, true, (el) => 
       el.hasAttribute('data-focusable')
   );
   ```

4. **Combine utilities**:
   ```typescript
   const form = findAncestor(input, (el) => isHTMLElement(el, 'form'));
   ```

## 🤝 Contributing

Contributions welcome! Please ensure:

1. All functions have proper TypeScript types
2. JSDoc comments are complete
3. Tests are added for new functionality
4. Follow existing code style

## 📄 License

MIT License

## 🔗 Related

- [@protolabo/zenjs](https://www.npmjs.com/package/@protolabo/zenjs) - Core utilities
- [DOM API](https://developer.mozilla.org/en-US/docs/Web/API) - MDN reference

---

**Note**: This TypeScript version includes all the element creation functions from the original (~100+ functions). See `dom-create.ts` for the complete list or the pattern for adding more.
