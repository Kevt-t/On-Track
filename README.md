# On Track - Health & Time Management

A modern Next.js application for tracking your time and maintaining balance across five key health dimensions: Physical, Mental, Emotional, Spiritual, and Social.

## Features

- **Authentication**: Sign in/Sign up interface with animated panels
- **Interactive Calendar**: Schedule and track events using FullCalendar
- **Health Tracking**: Visualize time spent across five health dimensions
- **Smart Recommendations**: Get personalized suggestions based on your health balance
- **Profile Management**: Manage your user profile and health goals

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + Tailwind CSS
- **Calendar**: FullCalendar with React integration
- **Charts**: Chart.js with react-chartjs-2

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd On-Track
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
On-Track/
├── app/
│   ├── dashboard/          # Dashboard page with calendar and health tracking
│   ├── profile/            # User profile page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Authentication page (home)
│   └── globals.css         # Global styles
├── public/
│   └── Designing/          # Static assets (logos, images)
├── legacy_backup/          # Original vanilla JS files (for reference)
└── package.json
```

## Pages

### Authentication (`/`)
- Sign in and sign up functionality
- Animated panel transitions
- Links to dashboard upon authentication

### Dashboard (`/dashboard`)
- Interactive calendar for scheduling events
- Health balance visualization with bar chart
- Personalized recommendations
- Event creation modal with health dimension tracking

### Profile (`/profile`)
- User information management
- Health goal selection
- Avatar display

## Health Dimensions

The app tracks five key health dimensions:

1. **Physical**: Physical activities and exercise
2. **Mental**: Mental exercises, reading, problem-solving
3. **Emotional**: Meditation, journaling, emotional wellness
4. **Spiritual**: Reflection, spiritual practices
5. **Social**: Social interactions, connecting with others

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Migration from Vanilla JS

This app was modernized from a vanilla JavaScript application to Next.js. The original files are preserved in the `legacy_backup/` directory for reference.

### Key Improvements

- ✅ Modern React architecture with hooks
- ✅ TypeScript for type safety
- ✅ Server-side rendering capabilities
- ✅ Better code organization with components
- ✅ Improved routing with Next.js App Router
- ✅ CSS Modules for scoped styling
- ✅ Better development experience

## License

MIT
