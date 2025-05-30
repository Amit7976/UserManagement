# 🎉 EventList – Full Stack Event Platform (Next.js + MongoDB)
<br>

This is a full-stack event list platform built with **Next.js + TypeScript** and **MongoDB (Atlas)**. It includes rich features like **scrap event data**, **admin authentication**, **event filtering**, and more.

🌐 **Live Site**: [eventlist-delta.vercel.app](https://eventlist-delta.vercel.app/)

🌐 **Live Site Admin Panel**: [eventlist-delta.vercel.app/admin](https://eventlist-delta.vercel.app/admin)

📦 **GitHub Repo**: [github.com/Amit7976/eventlist](https://github.com/Amit7976/eventlist)

<br>

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


## 📚 Features

* 📝 Scrape websites to retrieve event data
* 🔐 Auth with NextAuth (Email/Password)
* 🧾 Data filtering and search
* 📁 Admin Panel
* 📱 Responsive Design (Mobile, Tab, PC)
* 🌙 Dark Mode available 
* 📤 Axios used for all API communication
* 🗺️ Event Cards with image, title, location, date, and organizer


<br>

---

<br>


## 🧰 Tech Stack

### **Frontend:**

* [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [ShadCN UI](https://ui.shadcn.com/) for modern UI components
* [Axios](https://axios-http.com/) for API requests
* [React Icons](https://react-icons.github.io/react-icons/) for iconography

### **Backend & Auth:**

* [MongoDB Atlas](https://www.mongodb.com/atlas/database)
* [Mongoose](https://mongoosejs.com/) for schema modeling
* [NextAuth.js](https://next-auth.js.org/) for authentication
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing

<br>

---

<br>

## 🔐 Environment Variables

```env
MONGO_URI = mongodb+srv://guptaamit60600:NO7JprEG5qr7zAid@eventlist.b7m2hvd.mongodb.net/

AUTH_SECRET = "X+lh3A635G3zrYgAH5OlsSGIfq75fRq44tQQdY3W8Eg="
```

<br>

---

<br>

## 🔌 API Endpoints

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/api/auth/[...nextauth]`  | Auth routes via NextAuth      |
| GET    | `/api/newsletter`         | Retrieve all subscribers           |
| POST   | `/api/newsletter`         | Add new Subscribers                 |
| DELETE    | `/api/newsletter?id=`         | Remove Subscribers                |
| GET | `/api/scrape`         | Scrape 1st to 5th page                |
| GET    | `/api/scrape?page=`      | Scrape specific page     |
| GET    | `/api/user` | Fetch all Event Interested Users |
| POST    | `/api/user`   | Add new Event Interested User              |
| DELETE    | `/api/users?id=`  | Remove Event Interested User             |

<br>

---

<br>

## 🚀 User Flow

1. **Home Page** – Browse Events by Searching City and Country.
2. **Authentication** – Login/Register via dedicated pages using NextAuth for accessing admin panel.
3. **Dashboard** – View admin panel with event-interested users and subscriber details.
6. **Logout** – Securely log out of the session.

<br>

---

<br>

## ✅ Assignment Requirements Coverage

| Requirement                      | Status    |
| -------------------------------- | --------- |
| Lists all the events in a specific city       | ✅         |
| Scrape data from event websites  | ✅         |
| List beautifully in the website              | ✅         |
| Collect user email addresses    | ✅         |
| Events are updated automatically       | ✅         |
| Clean backend APIs               | ✅         |
| MongoDB schema                   | ✅         |
| Authentication (NextAuth)        | ✅ (Bonus) |
| Admin Panel for managing users       | ✅         |
| Scraped Events shown attractively    | ✅         |


<br>

---

<br>

## 🗺 System Architecture Diagram

This is the **system architecture diagram** of the Event List Website

```
[ User (Browser) ]
        |
        |  (1) Interacts via UI (Next.js + ShadCN)
        v
[ Frontend (Next.js + TypeScript) ]
        |
        |  (2) API Requests using Axios
        v
[ API Routes (Next.js Server Functions) ]
        |
        |  (3) Handles Auth, CRUD, Draft Save, etc.
        v
[ Backend (MongoDB via Mongoose) ]
        |
        |  (4) Stores Blog, User, and Auth Data
        v
[ MongoDB Atlas (Database) ]
```

<br>

---

<br>

## 📂 Folder Structure (Simplified)

```
/app
  ├── api
  │   ├── auth         → NextAuth configuration
  │   ├── scrape       → Scraping Event List Website
  │   ├── user         → Handle Event Interested User Operations
  │   └── newsletter   → Handle Subscriber Operations
  ├── admin            → Admin dashboard page
  └── page.tsx         → Home page

/components           → Reusable UI components  
/lib                  → Helpers, DB connection, auth utilities  
/models               → Mongoose models

```

<br>

---

<br>

## 🧠 Challenges Faced

- Scraping data from websites
- Secured API routes using NextAuth session management.

<br>

---

<br>

## 📷 Screenshots

<p align="center">
  <img src="./public/images/showcase/Screenshot (97).png" width="600" alt="Blog Post"/>
  <br/>
  <em>Home Page</em>
</p>

<p align="center">
  <img src="./public/images/showcase/Screenshot (103).png" width="600" alt="DashBoard Image"/>
  <br/>
  <em>Event List Cards</em>
</p>

<br>

---

## Working Demo

<br>

🎬 [Click here to watch the Client Side demo video](https://drive.google.com/file/d/1O5YTRRuHpbR6RQogItaJrJnh_SuY9qwZ/view?usp=sharing)

🎬 [Click here to watch the Admin Side demo video](https://drive.google.com/file/d/1q5UiJvMQaOQ00xLslQ_5YjHNG1QeTMdb/view?usp=sharing)

<br>

---

<br>

## 🧪 Local Setup Instructions

```bash
git clone https://github.com/Amit7976/eventlist
cd eventlist
npm install
# Add your .env file with the variables mentioned above
npm run dev
```

<br>

---

<br>

## 🚀 Future Improvements

- Display Full Events Details
- Add pagination and infinite scroll to list Events

<br>

---

<br>

## 📬 Contact

For any queries or issues:
📧 [guptaamit60600@gmail.com](mailto:guptaamit60600@gmail.com)
