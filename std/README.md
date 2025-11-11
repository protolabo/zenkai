# STD - Standard Utility Library (TypeScript)

A comprehensive, type-safe utility library for common programming tasks in TypeScript.

## 📦 Installation

```bash
npm install @zenkai/std
```

## 🚀 Features

- **Full TypeScript support** with strict type checking
- **Tree-shakeable** - import only what you need
- **Cross-environment** - works in Browser and Node.js
- **Well-documented** - comprehensive JSDoc comments
- **Zero dependencies**

## 📚 API Reference

### Array Utilities (`std-array`)

```typescript
import { insert, last, first } from '@zenkai/std';

// Insert item at specific index
insert([1, 2, 3], 1, 99); // [1, 99, 2, 3]

// Get last element
last([1, 2, 3]); // 3

// Get first element
first([1, 2, 3]); // 1
```

### Conversion Utilities (`std-convert`)

```typescript
import { boolToInt, toBoolean } from '@zenkai/std';

// Convert boolean to integer
boolToInt(true);  // 1
boolToInt(false); // 0

// Convert various values to boolean
toBoolean("true");  // true
toBoolean(1);       // true
toBoolean("false"); // false
toBoolean(0);       // false
```

### Date/Time Utilities (`std-datetime`)

```typescript
import { compareTime, formatDate, shortDate, shortDateTime } from '@zenkai/std';

// Compare two times
compareTime("10:30", "09:45");  // 1 (first is later)
compareTime("10:30", "10:30");  // 0 (equal)
compareTime("10:30", "11:00");  // -1 (first is earlier)

// Format dates
const date = new Date(2025, 0, 15, 14, 30, 0);
formatDate(date, 'yyyy-mm-dd hh:MM'); // "2025-01-15 14:30"

// Get short date/datetime strings
shortDate(date);     // "2025-01-15"
shortDateTime(date); // "2025-01-15 14:30"
```

### Logic Utilities (`std-logic`)

```typescript
import { assert, some, all, one, no, lone } from '@zenkai/std';

const numbers = [1, 2, 3, 4, 5];
const isEven = (n: number) => n % 2 === 0;

// Check if at least some values satisfy condition
some(numbers, isEven); // true (2, 4 are even)

// Check if all values satisfy condition
all(numbers, isEven); // false (1, 3, 5 are odd)

// Check if exactly one value satisfies condition
one([1, 3, 5], isEven); // false

// Check if no values satisfy condition
no([1, 3, 5], isEven); // true

// Check if at most one value satisfies condition
lone([2, 3, 5], isEven); // true (only 2 is even)

// Assert that a range of values satisfy condition
assert(numbers, isEven, 2, 3); // true (exactly 2 even numbers)
```

### Math Utilities (`std-math`)

```typescript
import { random } from '@zenkai/std';

// Random number between 0 and 10
random(10);

// Random number between 5 and 10
random(5, 10);

// Cryptographically secure random
random(1, 100, true);
```

### Object Utilities (`std-object`)

```typescript
import { hasOwn, isDerivedOf, cloneObject } from '@zenkai/std';

const obj = { name: 'John', age: 30 };

// Check if object has own property
hasOwn(obj, 'name'); // true
hasOwn(obj, 'toString'); // false (inherited)

// Deep clone with circular reference support
const original = { a: 1, b: { c: 2 } };
const cloned = cloneObject(original);
cloned.b.c = 3;
console.log(original.b.c); // 2 (unchanged)
```

### Type Checking Utilities (`std-parse`)

```typescript
import { 
    isString, isDate, isFunction, isObject, 
    isNull, isUndefined, isNullOrUndefined,
    isEmpty, isNullOrWhitespace, valOrDefault
} from '@zenkai/std';

// Type guards
isString("hello");           // true
isDate(new Date());          // true
isFunction(() => {});        // true
isObject({});                // true

// Null/undefined checks
isNull(null);                // true
isUndefined(undefined);      // true
isNullOrUndefined(null);     // true

// Empty checks
isEmpty([]);                 // true
isEmpty("");                 // true
isNullOrWhitespace("  ");    // true

// Default values
valOrDefault(undefined, 42); // 42
valOrDefault(10, 42);        // 10
```

### Path Utilities (`std-path`)

```typescript
import { addPath, getDir, findByPath } from '@zenkai/std';

// Build paths
addPath("users", "profile"); // "users.profile"
addPath("", "root");         // "root"

// Get directory
getDir("users.profile.name"); // "users.profile"

// Find nested values
const data = {
    users: [
        { name: "John", address: { city: "NYC" } },
        { name: "Jane", address: { city: "LA" } }
    ]
};

findByPath(data, "users[0].address.city"); // "NYC"
findByPath(data, "users[1].name");          // "Jane"
```

### String Utilities (`std-string`)

```typescript
import { 
    capitalize, capitalizeFirstLetter,
    camelCase, pascalCase, formatCase,
    removeAccents, isVowel, isConsonant
} from '@zenkai/std';

// Capitalization
capitalize("hello world");           // "Hello World"
capitalizeFirstLetter("hello");      // "Hello"

// Case conversion
camelCase("hello-world");            // "helloWorld"
pascalCase("hello-world");           // "HelloWorld"
formatCase("hello-world", "upper");  // "HELLO-WORLD"

// Accent removal
removeAccents("café");               // "cafe"

// Character checks
isVowel("a");                        // true
isConsonant("b");                    // true
```

## 📝 Best Practices

### Use Type Guards Effectively

```typescript
function processValue(value: unknown) {
    if (isString(value)) {
        // TypeScript knows value is string here
        return value.toUpperCase();
    }
    if (isDate(value)) {
        // TypeScript knows value is Date here
        return formatDate(value, 'yyyy-mm-dd');
    }
}
```

### Leverage Generic Types

```typescript
interface User {
    name: string;
    age: number;
}

const users: User[] = [/* ... */];

// Type is inferred as User | undefined
const firstUser = first(users);

// Type is preserved through operations
const clonedUsers = users.map(u => cloneObject(u));
```


## 📄 License

MIT License - feel free to use in your projects!

## 🔗 Related

- [Lodash](https://lodash.com/) - More comprehensive utility library
- [Ramda](https://ramdajs.com/) - Functional programming utilities
- [date-fns](https://date-fns.org/) - Modern date utility library
