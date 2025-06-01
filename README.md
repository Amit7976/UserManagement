# 👨‍💻 User Management Dashboard – Next.js + TypeScript + Zod + Tailwind

This is a **full-featured admin dashboard** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Zod**, designed for user management tasks. It allows you to view, add, edit, delete, and export users, with support for both **local and external (JSONPlaceholder)** data.

---

## 🌐 Live Link

🌐 **Live Site**: [eventlist-delta.vercel.app](https://eventlist-delta.vercel.app/)

🌐 **Live Site Admin Panel**: [eventlist-delta.vercel.app/admin](https://eventlist-delta.vercel.app/admin)

📦 **GitHub Repo**: [https://github.com/Amit7976/UserManagement](https://github.com/Amit7976/UserManagement)

---


<br>


## 🧪 Testing Credentials 

|User | Email             | Password                   |
|-----| ---------------- | ---------- |
|User1|testuser1@test.com | 000000000 |
|User2|testuser2@test.com | 123456789 |
|User3|testuser3@test.com | asdfghjkl |


<br>

---

<br>

### ADMIN REGISTER PAGE URL = `/auth/register`
### ADMIN REGISTER PAGE UNLOCK Key = `thisIsAssignment`

<br>

---

## 📚 Features

### 🔍 Dashboard (/dashboard)

* Fetch users from `https://jsonplaceholder.typicode.com/users` and local (own) database
* Display users in **Card View** and **Table View**
* **Persistent View Mode** using `localStorage`
* **Search functionality** by **name** and **city**
* **Loading placeholders** using Skeletons
* **Delete user**:

  * JSONPlaceholder user ➜ moved to `removedUsers` table
  * Own user ➜ completely deleted
* **Edit user**:

  * JSONPlaceholder user ➜ edited data becomes a **new own user**
  * ID of the placeholder user is stored in `removedUsers`

### ➕ Add User (/dashboard/add)

* **Multi-step form** (3 steps):

  1. Basic Info (name, email)
  2. Address (street, city, zip)
  3. Review & Confirm
* Uses **Zod** + **React Hook Form** for validation:

  * `name`, `email`, `street`, `city`, `zip` are **required**
  * All other fields are **optional**
* Precise location selection using a **Map Dialog**

  * Click button ➜ open map ➜ drag to pick `lat` & `lng`
* Data saved on submit and logged to console
* **Progress saved** in `localStorage` to recover after refresh

### ✏️ Edit User

* Pre-fills all form fields
* Reuses same multi-step structure with existing data
* Validation remains intact

### 🗑️ Delete User

* Different handling for placeholder & own users
* UI updates instantly with toast notifications

### 📤 Export Functionality

* Export user list to **CSV** and **JSON**
* Clean export with headers and proper formatting

### 🍞 Notifications

* All major actions use **Toast messages** for real-time feedback

### 🌈 UI/UX & Styling

* Responsive Design using **Tailwind CSS**
* Modern UI with **ShadCN UI**
* **Dark/Light Mode** support
* Smooth transitions with **framer-motion**

---

## 🧰 Tech Stack

### **Frontend**

* [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [ShadCN UI](https://ui.shadcn.com/) for modern UI components
* [Framer Motion](https://www.framer.com/motion/) for animations
* [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for form validation

### **State & Utilities**

* [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for persistent UI preferences
* [Axios](https://axios-http.com/) for HTTP requests

---

<br>

## 🔐 Environment Variables

```env
MONGO_URI = mongodb+srv://guptaamit60600:094SNKgNS5hBQCkN@usermanagement.ngepsbf.mongodb.net/?retryWrites=true&w=majority&appName=userManagement

AUTH_SECRET= "d51Z7Z0rvqYHEvsR/ss67vR+KkR7nJEBu2JgdVOKqTw="

NEXT_PUBLIC_ADMIN_REGISTER_UNLOCK_SECRET_KEY=thisIsAssignment
```

<br>

## 🗺 User Flow

1. Navigate to `/dashboard`
2. Toggle between **Card** or **Table** view (saved)
3. Search for users by **name** or **city**
4. Add a user from `/dashboard/add` via multi-step form
5. Edit or delete users from list view
6. Export user data as **CSV** or **JSON**
7. Responsive toast messages guide the user throughout

---

## 🧠 Challenges Faced

* Handling merged data from two sources (own & placeholder)
* Keeping UI in sync after data changes (e.g., edit/delete)
* Clean architecture with form validation and multi-step state

---

<br>

## 🔌 API Endpoints

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/auth/[...nextauth]`  | Auth routes via NextAuth      |
| GET    | `/api/users`         | Retrieve all Users |
| POST   | `/api/users`         | Add new Users |
| DELETE    | `/api/users?id=`         | Remove Users |
| PUT | `/api/users?id`         | Edit This User Details|
| GET    | `https://jsonplaceholder.typicode.com/users`      | User Data from Api     |


<br>


---

## 📷 Screenshots

<p align="center">
  <img src="./public/images/showcase/Screenshot1.png" width="600" alt="Blog Post"/>
  <br/>
  <em>Dashboard</em>
</p>

<p align="center">
  <img src="./public/images/showcase/Screenshot2.png" width="600" alt="DashBoard Image"/>
  <br/>
  <em>Add New User</em>
</p>

<br>

---

## 🛠 Local Setup

```bash
git clone https://github.com/Amit7976/UserManagement
cd your-repo
npm install
# Add .env.local file if needed
npm run dev
```

---

## 📬 Contact

For queries, feel free to reach out:
📧 [guptaamit60600@gmail.com](mailto:guptaamit60600@gmail.com)
