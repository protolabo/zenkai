/**
 * STD Library - Usage Examples
 * 
 * This file demonstrates common use cases for the STD utility library
 */

import {
    // Array utilities
    insert, last, first,
    // String utilities
    capitalize, camelCase, pascalCase, removeAccents,
    // Type checking
    isString, isDate, isNullOrUndefined, isEmpty,
    // Logic utilities
    all, some, one, no,
    // Object utilities
    cloneObject, findByPath,
    // Date utilities
    formatDate, shortDate, compareTime,
    // Math utilities
    random
} from './index.js';

// ============================================
// 1. ARRAY UTILITIES
// ============================================

const numbers = [1, 2, 3, 4, 5];

console.log('First:', first(numbers));        // 1
console.log('Last:', last(numbers));          // 5

const modified = [...numbers];
insert(modified, 2, 99);
console.log('After insert:', modified);       // [1, 2, 99, 3, 4, 5]

// ============================================
// 2. STRING UTILITIES
// ============================================

const text = "hello-world from café";

console.log('Capitalized:', capitalize(text));              // "Hello-World From Café"
console.log('camelCase:', camelCase(text));                 // "helloWorldFromCafé"
console.log('PascalCase:', pascalCase(text));               // "HelloWorldFromCafé"
console.log('No accents:', removeAccents(text));            // "hello-world from cafe"

// ============================================
// 3. TYPE CHECKING
// ============================================

function processValue(value: unknown) {
    if (isNullOrUndefined(value)) {
        console.log('Value is null or undefined');
        return;
    }
    
    if (isString(value)) {
        console.log('String value:', value.toUpperCase());
    } else if (isDate(value)) {
        console.log('Date value:', formatDate(value, 'yyyy-mm-dd'));
    } else {
        console.log('Other type:', value);
    }
}

processValue("test");           // "String value: TEST"
processValue(new Date());       // "Date value: 2025-11-11"
processValue(null);             // "Value is null or undefined"

// ============================================
// 4. LOGIC UTILITIES
// ============================================

const ages = [15, 18, 21, 25, 30];
const isAdult = (age: number) => age >= 18;
const isMinor = (age: number) => age < 18;

console.log('All adults?', all(ages, isAdult));           // false
console.log('Some adults?', some(ages, isAdult));         // true
console.log('Exactly one minor?', one(ages, isMinor));    // true
console.log('No minors?', no(ages, isMinor));             // false

// ============================================
// 5. OBJECT UTILITIES
// ============================================

// Deep cloning with circular reference support
const original = {
    name: "John",
    age: 30,
    address: {
        city: "NYC",
        zip: "10001"
    }
};

// Create circular reference
const withCircular: any = { ...original };
withCircular.self = withCircular;

const cloned = cloneObject(withCircular);
console.log('Cloned successfully:', cloned.name);         // "John"
console.log('Circular ref handled:', cloned.self === cloned); // true

// Path-based access
const userData = {
    users: [
        { 
            name: "Alice", 
            address: { city: "NYC", zip: "10001" } 
        },
        { 
            name: "Bob", 
            address: { city: "LA", zip: "90001" } 
        }
    ]
};

console.log('First user city:', findByPath(userData, 'users[0].address.city')); // "NYC"
console.log('Second user name:', findByPath(userData, 'users[1].name'));        // "Bob"

// ============================================
// 6. DATE UTILITIES
// ============================================

const now = new Date();

console.log('Formatted:', formatDate(now, 'yyyy-mm-dd hh:MM:ss'));
console.log('Short date:', shortDate(now));               // "2025-11-11"

// Time comparison
console.log('10:30 vs 09:45:', compareTime("10:30", "09:45"));  // 1 (later)
console.log('10:30 vs 10:30:', compareTime("10:30", "10:30"));  // 0 (equal)
console.log('10:30 vs 11:00:', compareTime("10:30", "11:00"));  // -1 (earlier)

// ============================================
// 7. MATH UTILITIES
// ============================================

// Random numbers
console.log('Random 0-10:', random(10));
console.log('Random 5-10:', random(5, 10));
console.log('Secure random:', random(1, 100, true));

// ============================================
// 8. REAL-WORLD EXAMPLE: User Validation
// ============================================

interface User {
    name: string;
    email: string;
    age: number;
    roles: string[];
}

function validateUser(user: User): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check required fields
    if (isEmpty(user.name)) {
        errors.push('Name is required');
    }
    
    // Check email format (simplified)
    if (!isString(user.email) || !user.email.includes('@')) {
        errors.push('Invalid email format');
    }
    
    // Check age
    if (user.age < 18) {
        errors.push('User must be 18 or older');
    }
    
    // Check roles
    const validRoles = ['admin', 'user', 'moderator'];
    if (!all(user.roles, (role) => validRoles.includes(role))) {
        errors.push('Invalid role detected');
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

const testUser: User = {
    name: "John Doe",
    email: "john@example.com",
    age: 25,
    roles: ['user', 'moderator']
};

console.log('User validation:', validateUser(testUser));

// ============================================
// 9. REAL-WORLD EXAMPLE: Data Processing
// ============================================

interface DataRecord {
    id: number;
    status: 'pending' | 'active' | 'completed';
    createdAt: Date;
    metadata: {
        priority: 'low' | 'medium' | 'high';
        assignee?: string;
    };
}

function processRecords(records: DataRecord[]) {
    // Find all high-priority active records
    const highPriority = records.filter(r => 
        r.status === 'active' && 
        findByPath(r, 'metadata.priority') === 'high'
    );
    
    // Check if all high-priority items are assigned
    const allAssigned = all(
        highPriority,
        (r) => !isNullOrUndefined(findByPath(r, 'metadata.assignee'))
    );
    
    // Check if there's exactly one pending record
    const onePending = one(
        records,
        (r) => r.status === 'pending'
    );
    
    return {
        highPriorityCount: highPriority.length,
        allHighPriorityAssigned: allAssigned,
        hasExactlyOnePending: onePending
    };
}

const records: DataRecord[] = [
    {
        id: 1,
        status: 'active',
        createdAt: new Date(),
        metadata: { priority: 'high', assignee: 'Alice' }
    },
    {
        id: 2,
        status: 'pending',
        createdAt: new Date(),
        metadata: { priority: 'low' }
    },
    {
        id: 3,
        status: 'active',
        createdAt: new Date(),
        metadata: { priority: 'high', assignee: 'Bob' }
    }
];

console.log('Processing results:', processRecords(records));

// ============================================
// 10. REAL-WORLD EXAMPLE: API Response Formatting
// ============================================

interface ApiResponse {
    user?: {
        firstName?: string;
        lastName?: string;
        email?: string;
    };
    timestamp?: Date;
}

function formatApiResponse(response: ApiResponse): string {
    const firstName = findByPath<string>(response, 'user.firstName');
    const lastName = findByPath<string>(response, 'user.lastName');
    
    if (isNullOrUndefined(firstName) || isNullOrUndefined(lastName)) {
        return 'Unknown User';
    }
    
    const fullName = `${firstName} ${lastName}`;
    const formattedName = capitalize(fullName);
    
    const timestamp = response.timestamp;
    const formattedDate = isDate(timestamp) 
        ? shortDate(timestamp)
        : 'No date';
    
    return `${formattedName} (${formattedDate})`;
}

const apiResponse: ApiResponse = {
    user: {
        firstName: "john",
        lastName: "doe",
        email: "john@example.com"
    },
    timestamp: new Date()
};

console.log('Formatted response:', formatApiResponse(apiResponse));
// Output: "John Doe (2025-11-11)"

export { };
