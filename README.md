# RF Dynamic Form Builder

This repository contains a full stack Dynamic Form Builder application with the MERN stack.

## Project Structure

```
.
├── client    # Frontend components
└── server    # Backend components
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) database

---

## Frontend (React)

Located in the `./client` directory.

### Install Dependencies

```bash
cd ./client
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will typically run on [http://localhost:5173](http://localhost:5173).

---

## Backend (Express)

Located in the `./server` directory.

### Environment Variables

Before running the backend, create a `.env` file in the `./server` directory with the following content:

```
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.t3qzwht.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=cluster0
```

- `PORT`: The port on which the Express server will run.
- `MONGODB_URI`: Your MongoDB connection string.

### Install Dependencies

```bash
cd ./server
npm install
```

### Start Server

```bash
npm run dev
```

The Express server will run on [http://localhost:3000](http://localhost:3000) (or your specified port).

---

## Running Both Together

You can run both frontend and backend in separate terminal windows/tabs:

1. Start the backend:
   ```bash
   cd ./server
   npm run dev
   ```
2. Start the frontend:
   ```bash
   cd ./client
   npm run dev
   ```

---

## Additional Notes

- Make sure MongoDB is running and accessible from your backend.
- For production deployment, consider building the React app and serving it via Express.

---

## License

This project is licensed under the [MIT License](LICENSE).
