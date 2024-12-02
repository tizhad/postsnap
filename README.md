## PostSnap - Angular App

A responsive Angular application that fetches 100 posts from the JSONPlaceholder API, displays them in a grid layout, and allows users to interact with them by rotating through post details on click.

---

### Table of Contents

1. [About](#about)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Development](#development)
8. [FAQ](#faq)

---

### About

\***\*PostSnap\*\*** is an Angular-based application designed to display posts from the JSONPlaceholder API. Posts are arranged in a grid layout, allowing users to click and rotate through details of a post. The application utilizes Angular Signals for efficient state management.

---

### Tech Stack

- \***\*Angular\*\***: Frontend framework for building the application.
- \***\*Angular Signals\*\***: For state management.
- \***\*JSONPlaceholder\*\***: Fake API for fetching posts.
- \***\*SCSS\*\***: For styling the application.
- \***\*HttpClientModule\*\***: For making HTTP requests.
- \***\*Angular CLI\*\***: For scaffolding and building the app.

---

### Features

- Displays 100 posts in a grid of 10 rows and 10 columns on large screens.
- Responsive design reduces columns on smaller screens to fit content.
- Rotates post details (title, userId, id, body) when a post is clicked.
- Only one post shows its details at a time; clicking another resets the previous selection.
- Modular component-based architecture for scalability and maintainability.

---

### Installation

#### Prerequisites

- \***\*Node.js\*\*** (version 18 or higher)

- \***\*npm\*\*** (Node Package Manager)

### Steps to Install

**_Clone the repository:_**
`git  clone  https:github.comtizhadpostsnap`

cd postsnap

**_ Install dependencies: _**
` npm  install`

**_Running the Application_**
After installing the dependencies, start the application:

`ng  serve`
This will launch the development server at [http:localhost:4200](http:localhost:4200).

**_Testing_**

`ng  test`
This will execute all unit tests and display results in the terminal.

### Development

**Code Style**
Using **Prettier** and **ESLint** for formatting and linting.

**_FAQ_**

**1. Is using JWTs safe?**
JWTs can be safe if:
• Secure Key Storage: Keep the signing key private and secure. Exposure of this key allows attackers to forge tokens.
• Avoid Sensitive Data in Payload: Never store sensitive information (e.g., passwords, PII) in the payload. Use JWT for non-critical data like user IDs or roles.

**2. What are the security risks of allowing HTML in user messages?**

**Attack Vectors**:

- **Cross-Site Scripting (XSS)**:

  - **Risk**: Malicious JavaScript can execute in users’ browsers, stealing sensitive data.
  - **Mitigation**:
    - Use libraries like **DOMPurify** to sanitize user input.
    - Enforce a strong **Content Security Policy (CSP)**.
    - Escape content before rendering in the DOM.

- **HTML Injection (Phishing)**:
  - **Risk**: Attackers may inject fake login forms or misleading content.
  - **Mitigation**:
    - Use a whitelist approach for safe HTML tags and attributes.
    - Validate URLs to prevent malicious redirects.
    - Clearly distinguish user-generated content.

**Best Practices**:

- Sanitize and validate all inputs server-side.
- Monitor user activity for patterns of abuse.

**3. What are mutable and immutable objects?**

- **Mutable Objects**: Can be modified after creation (e.g., arrays, objects).
- **Immutable Objects**: Cannot be modified after creation. Modifications return a new object instead of altering the original.

**Example of Immutable Object in JavaScript**

```typeScript
const str = "hello";
const newStr = str.toUpperCase();
console.log(str);
```

**Pros of Immutability**

- **_Predictable State Changes_**: Ensures data integrity and eliminates unexpected side effects.
- **_Functional Programming_**: Fits well with functional programming paradigms.
- **_State Management_**: Efficient for libraries like Redux.

**Cons of Immutability**

- **_Performance Overhead_**: Frequent object creation can impact performance.
- **_Verbosity_**: Updating nested structures often requires complex syntax.

**How to Achieve Immutability**

- **_Using Spread Operator_**:

```typeScript
const arr = [1, 2, 3]
const newArr = [...arr, 4];
```

**_Using_** Object.freeze:

```typeScript
const obj = Object.freeze({ key: "value" });
obj.key = "newValue";
```

- **Using Libraries like Immer**:

```typeScript
import {  produce  }  from  "immer";
const state = { count: 0 };
const  newState  =  produce(state, (draft) =>  {
draft.count++;
});
```

**3. Speeding Up Web Application Loading**
The first step is identifying the root causes affecting application speed using performance tools such as Lighthouse and Chrome DevTools. Once identified, focus on addressing the most critical issues. Key strategies include:

- Minimize JavaScript, CSS, and HTML files to reduce size and improve loading times.
- Use code splitting to load only the necessary JavaScript for the initial page render.
- Implement lazy loading for images and components that are not immediately visible.
- Use WebP or other next-gen image formats to reduce image file sizes and improve performance.
- Optimize database queries by fetching only the required data to reduce payload sizes.
- Use more efficient algorithms and optimize loops for better performance.
- Implement pagination or infinite scrolling to load only the required data, preventing large datasets from being loaded all at once.
- Optimize state management to prevent unnecessary re-renders and improve UI responsiveness.
- Server-Side Rendering (SSR): Pre-render content to provide a faster initial load for users.
