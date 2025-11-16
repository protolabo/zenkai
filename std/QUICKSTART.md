# Quick Start Guide

Get up and running with the @protolabo/zenjs utility library in minutes.

## 📥 Installation

```bash
npm install @protolabo/zenjs
```

## 🚀 Basic Usage

### Import Everything

```typescript
import * as STD from '@protolabo/zenjs';

STD.capitalize("hello world");  // "Hello World"
STD.random(1, 10);              // Random number 1-10
STD.last([1, 2, 3]);            // 3
```

### Import Specific Functions (Recommended)

```typescript
import { capitalize, random, last } from '@protolabo/zenjs';

capitalize("hello world");  // "Hello World"
random(1, 10);              // Random number 1-10
last([1, 2, 3]);            // 3
```

### Import by Module (Best for Tree-Shaking)

```typescript
import { capitalize } from '@protolabo/zenjs/std-string';
import { random } from '@protolabo/zenjs/std-math';
import { last } from '@protolabo/zenjs/std-array';
```

## 💡 Common Use Cases

### 1. Type Checking

```typescript
import { isString, isNullOrUndefined, isEmpty } from '@protolabo/zenjs';

function processInput(value: unknown) {
    if (isNullOrUndefined(value)) {
        return "No value provided";
    }
    
    if (isString(value)) {
        return isEmpty(value) ? "Empty string" : value.toUpperCase();
    }
    
    return "Unknown type";
}
```

### 2. String Formatting

```typescript
import { capitalize, camelCase, removeAccents } from '@protolabo/zenjs';

// User input normalization
const input = "café-résumé";
const normalized = removeAccents(input);  // "cafe-resume"
const className = camelCase(normalized);  // "cafeResume"

// Display name formatting
const displayName = capitalize("john doe");  // "John Doe"
```

### 3. Array Operations

```typescript
import { first, last, insert } from '@protolabo/zenjs';

const items = [1, 2, 3, 4, 5];

// Safe array access
const firstItem = first(items) ?? 0;  // 1
const lastItem = last(items) ?? 0;    // 5

// Array modification
const newItems = [...items];
insert(newItems, 2, 99);  // [1, 2, 99, 3, 4, 5]
```

### 4. Object Manipulation

```typescript
import { cloneObject, findByPath } from '@protolabo/zenjs';

const user = {
    name: "John",
    address: { city: "NYC", zip: "10001" }
};

// Deep clone
const userCopy = cloneObject(user);
userCopy.address.city = "LA";  // Original unchanged

// Safe nested access
const city = findByPath<string>(user, 'address.city') ?? 'Unknown';
```

### 5. Validation Logic

```typescript
import { all, some, one } from '@protolabo/zenjs';

const ages = [15, 18, 21, 25];
const isAdult = (age: number) => age >= 18;

if (all(ages, isAdult)) {
    console.log("Everyone is an adult");
}

if (some(ages, isAdult)) {
    console.log("At least one adult present");
}

if (one(ages, (age) => age < 18)) {
    console.log("Exactly one minor");
}
```

### 6. Date Formatting

```typescript
import { formatDate, shortDate, compareTime } from '@protolabo/zenjs';

const now = new Date();

// Custom format
formatDate(now, 'yyyy-mm-dd hh:MM');  // "2025-11-11 14:30"

// Short format
shortDate(now);  // "2025-11-11"

// Time comparison
if (compareTime("14:30", "15:00") < 0) {
    console.log("First time is earlier");
}
```

## 🎯 Real-World Example

Here's a complete example showing multiple utilities working together:

```typescript
import {
    isNullOrUndefined,
    isEmpty,
    capitalize,
    camelCase,
    all,
    findByPath,
    shortDate
} from '@protolabo/zenjs';

interface UserData {
    firstName?: string;
    lastName?: string;
    email?: string;
    roles?: string[];
    profile?: {
        address?: {
            city?: string;
            country?: string;
        };
    };
    createdAt?: Date;
}

function validateAndFormatUser(data: UserData) {
    // Validation
    const errors: string[] = [];
    
    if (isEmpty(data.firstName)) {
        errors.push("First name is required");
    }
    
    if (isEmpty(data.email) || !data.email?.includes('@')) {
        errors.push("Valid email is required");
    }
    
    const validRoles = ['admin', 'user', 'moderator'];
    if (data.roles && !all(data.roles, (role) => validRoles.includes(role))) {
        errors.push("Invalid role detected");
    }
    
    if (errors.length > 0) {
        return { success: false, errors };
    }
    
    // Formatting
    const fullName = `${data.firstName} ${data.lastName}`;
    const displayName = capitalize(fullName);
    
    const city = findByPath<string>(data, 'profile.address.city') ?? 'Unknown';
    const country = findByPath<string>(data, 'profile.address.country') ?? 'Unknown';
    
    const memberSince = data.createdAt 
        ? shortDate(data.createdAt)
        : 'Unknown';
    
    return {
        success: true,
        formatted: {
            displayName,
            location: `${city}, ${country}`,
            memberSince,
            roles: data.roles?.map(r => capitalize(r))
        }
    };
}

// Usage
const userData: UserData = {
    firstName: "john",
    lastName: "doe",
    email: "john@example.com",
    roles: ["admin", "user"],
    profile: {
        address: {
            city: "new york",
            country: "usa"
        }
    },
    createdAt: new Date("2024-01-15")
};

const result = validateAndFormatUser(userData);
console.log(result);
/* Output:
{
    success: true,
    formatted: {
        displayName: "John Doe",
        location: "New York, Usa",
        memberSince: "2024-01-15",
        roles: ["Admin", "User"]
    }
}
*/
```

## 🔍 Module Overview

| Module | Purpose | Most Used Functions |
|--------|---------|-------------------|
| `std-array` | Array operations | `first`, `last`, `insert` |
| `std-convert` | Type conversion | `boolToInt`, `toBoolean` |
| `std-datetime` | Date/time utilities | `formatDate`, `shortDate`, `compareTime` |
| `std-logic` | Logic operations | `all`, `some`, `one`, `no` |
| `std-math` | Math utilities | `random` |
| `std-object` | Object manipulation | `cloneObject`, `hasOwn`, `findByPath` |
| `std-parse` | Type checking | `isString`, `isNullOrUndefined`, `isEmpty` |
| `std-path` | Path utilities | `findByPath`, `addPath` |
| `std-string` | String manipulation | `capitalize`, `camelCase`, `removeAccents` |

## 🎓 Learn More

- **Full API Reference**: See [README.md](./README.md)
- **Examples**: See [examples.ts](./examples.ts)

## 💬 Get Help

- 📚 Check the [README.md](./README.md) for detailed API documentation
- 💡 Look at [examples.ts](./examples.ts) for more usage patterns
- 🐛 Report issues on GitHub
- 💬 Join our community discussions

## ⚡ Pro Tips

1. **Use type guards** for safer code:
   ```typescript
   if (isString(value)) {
       // TypeScript knows value is string here
   }
   ```

2. **Leverage tree-shaking** by importing specific modules:
   ```typescript
   import { capitalize } from '@protolabo/zenjs/std-string';
   ```

3. **Handle undefined returns**:
   ```typescript
   const item = last(array) ?? defaultValue;
   ```

4. **Combine utilities** for powerful operations:
   ```typescript
   const formattedNames = users
       .map(u => findByPath<string>(u, 'name'))
       .filter(n => !isNullOrUndefined(n))
       .map(n => capitalize(n!));
   ```

5. **Use `findByPath` for safe nested access**:
   ```typescript
   // Instead of: obj?.user?.profile?.city
   // Use: findByPath(obj, 'user.profile.city')
   ```

---

Happy coding! 🚀
