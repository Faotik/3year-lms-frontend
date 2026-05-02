# Project Architecture

## Main Approach

We split the project into small folders so everything is easy to spot and navigate.

```
src/
├── app/
├── components/
├── pages/
├── hooks/
├── context/
├── services/
├── utils/
├── constants/
├── styles/
└── assets/
└── index.js
```

**Do not touch `index.js`, this file will invocate and start all the app**

---

## Responsibilities

### `app/`

Main entry of the app. Here all pages and routing are mounted.

* `App.js` → app entry point

---

### `components/`

Reusable, global UI pieces. Organised into three sub-folders:

* `common/` → general-purpose pieces used anywhere (e.g. `LoadingSpinner`, `ErrorMessage`)
* `layout/` → structural pieces (e.g. `Navbar`, `Sidebar`, `Footer`)
* `ui/` → base visual elements (e.g. `Button`, `Input`, `Card`)

**Defining rule**: if a piece of UI is used in more than one place → it belongs here.

---

### `pages/`

Full screens that the user sees in the browser.

Examples:

* Home page
* Login page
* Module page

Here goes the entire page that user will see in browser, not just a component

---

### `hooks/`

Reusable React logic extracted into custom hook functions.

A hook is a plain JS function that starts with `use`. It lets you share stateful logic across multiple components without copy-pasting.

Example — `useUser.js`:

```js
// hooks/useUser.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useUser() {
  const { user } = useContext(AuthContext);
  return {
    user,
    role: user?.role,           // "student" | "teacher" | "admin"
    isStudent: user?.role === 'student',
    isTeacher: user?.role === 'teacher',
    isAdmin:   user?.role === 'admin',
  };
}
```

Any component can then just do:

```js
import { useUser } from '../hooks/useUser';

const { isAdmin } = useUser();
```

**Rule of thumb**: if the same React logic (state, effects, context reads) appears in more than one component → extract it into a hook here.

---

### `context/`

Global data that needs to be shared across the whole app without prop-drilling.

Examples:

* `AuthContext` → stores the current `user` object and `setUser`
* Role information derived from the user


---

### `services/`

All future backend communication lives here. Currently empty / placeholders.

Later:

```js
getCourses()
login()
getModuleById(id)
```

**Rule**: no component ever calls an API directly — it always goes through a service function.

---

### `utils/`

Small, pure helper functions with no React dependency.

Examples:

* `formatDate(date)`
* `validateEmail(email)`
* `truncateText(text, maxLength)`

---

### `constants/`

Fixed values shared across the app.

Example:

```js
// constants/roles.js
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN:   'admin',
};
```

---

### `styles/`

Global CSS files (resets, variables, typography).

---

### `assets/`

Static files: images, icons, fonts.
