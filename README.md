# Level 4 Challenge

It’s a Friday evening. You’ve had a long week and you just want to go out and have a nice dinner. It’s 5:30 pm and it’s time to decide where to have dinner. And here begins the age-old challenge of deciding where to eat with your partner/roommate/friend… You have been in the mood for some Thai food, but the other person is feeling more like Italian. What to do?

Build a web app that allows any two people to decide where to eat together. For this challenge, we want you to use an API that allows you to access restaurant information and design a system that allows two people to prioritize and decide on where to eat in a fair manner. There is an emphasis on “fair” here – we all know that one person who always gets to decide where to eat. This challenge is purposefully vague – we want you to get creative!

## Developing

Download and install:

```bash
git clone https://github.com/zqianem/sesl1-level4-eatery-decider.git
npm install
```

Get the project URL and service role API key from [Supabase](https://app.supabase.com/project/ejyhdjdsexqnttkydvve/settings/api) and add them to `.env`:

```bash
cp .env.example .env
```

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
