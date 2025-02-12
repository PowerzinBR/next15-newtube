# New Tube
Welcome to the New Tube source code. A **Next.js** 15 + **React** 19 and **tRPC** project. I've prepared a guide so you can clone and setup the project.

---

# License
MIT License.

# Cloning the repository
- Last edited: 02/11/25 by [Servi](https://github.com/PowerzinBR)
---
## Requirements
- Version control: Git
- OS: Windows/macOS/Linux operational systems
- Runtime: [Node.js v18.0.0](https://nodejs.org) or later
- Package managers: [npm](https://npmjs.org)/[bun](https://bun.sh)/[yarn](https://yarnpkg.com)/[pnpm](https://pnpm.io)

---

> [!NOTE]
> Commands may change depending on your package manager

1. Clone the repository

```bash
git clone https://github.com/PowerzinBR/next15-newtube.git
```

2. Install dependencies
```bash
npm install
```

3. Configure your Clerk account
Go to Clerk's dashboard and create a new project. Get the API keys then create a file for your enviroment variables, and paste the API keys there.

4. Configure your database
Go to [Neon](https://neon.tech) and login into their platform. Create a database with whatever name you want and paste your `DATABASE_URL` key into your `.env.local` file. Make sure your .env file isn't in your commit history.

5. Push your schema into Neon

```bash
npx drizzle-kit push
```

6. Run the development server
```bash
npm run dev
```

## Upstash
- Last edited: 02/11/25 by [Servi](https://github.com/PowerzinBR)
---
To set Upstash, you will need to:
- Create an account (Google, Github, Password)
- Create a database
- Get the keys from your database and paste it at your local enviroment file

Go to [Upstash](https://upstash.com) and log in. Make sure you have at least one database created. After, get the keys in your dashboard and paste them in your `.env.local` file.


# Webhook sync
- Last edited: 02/11/25 by [Servi](https://github.com/PowerzinBR)
---
To create a local tunnel between **Clerk and Drizzle**, you need to:

- Create a ngrok account (or any other local tunnel solution)
- Obtain static domain (not required, but easier for development)
- Add script to concurrently run local tunnel & app
- Create the users webhook
- Connect the webhook on the Clerk dashboard

1. **Setup ngrok**: Create an account in ngrok dashboard. Get your **Authtoken** and add it. You can follow the ngrok documentation. After that go to ngrok dashboard and claim your free domain, then change the URL in our `dev:webhook` script.

2. **Setup clerk**: Add your ngrok URL that you got before into an endpoint. To create an endpoint go inside of **Configure** section in your dashboard and click on Webhooks. Scroll down until you find **Endpoints** as an tab.
- Note: The endpoint should be <NGROK_URL>/api/users/webhook

3. **Setup your .env**: Make sure you add your signing secret, which you find after creating an webhook into your .env.local file (For this, you can copy the .env.example file and put your keys there)


# License
MIT License.