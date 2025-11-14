# Project Structure Guide

## 📁 Folders

### `/app` - Main Application Code (MOST IMPORTANT)
This is where your app screens live. Uses **Expo Router** for navigation.
- **`(tabs)/`** - Tab-based navigation screens
  - `index.tsx` - Home/main screen (first tab)
  - `explore.tsx` - Second tab screen
  - `_layout.tsx` - Tab navigation configuration
- **`_layout.tsx`** - Root layout (wraps entire app)
- **`modal.tsx`** - Example modal screen

**This is file-based routing:** filename = route
- `app/index.tsx` → `/` (home screen)
- `app/about.tsx` → `/about`
- `app/(tabs)/index.tsx` → `/` with tabs

### `/components` - Reusable UI Components
Put your custom components here:
- Buttons, cards, forms, etc.
- Should be reusable across multiple screens

### `/constants` - App Constants
Static values used throughout the app:
- Colors, sizes, API URLs, etc.
- Keep magic numbers/strings here

### `/hooks` - Custom React Hooks
Reusable logic with `useState`, `useEffect`, etc.:
- `useDatabase.ts` - database operations
- `useSettings.ts` - app settings
- Custom logic you use in multiple places

### `/assets` - Images, Fonts, Static Files
- **`/images`** - Icons, logos, splash screens
- **`/fonts`** - Custom fonts (if any)

### `/scripts` - Build/Setup Scripts
Helper scripts for project setup and automation

### `/.vscode` - VS Code Settings
Editor configuration (code formatting, extensions)

### `/node_modules` - Dependencies
Installed npm packages (don't edit this!)

---

## 📄 Configuration Files

### `app.json` - Expo Configuration
**What it does:** Configures your entire app
- App name, version, icon
- Android/iOS settings
- Splash screen, orientation
- Plugins (expo-router, etc.)

**Key settings:**
```json
"name": "work-journal-app"  // App display name
"slug": "work-journal-app"  // Unique identifier
"version": "1.0.0"          // App version
"orientation": "portrait"   // Lock to portrait mode
"plugins": ["expo-router"]  // Enabled features
```

### `package.json` - Project Dependencies
**What it does:** Lists all installed packages and scripts
- Dependencies: packages your app needs
- Scripts: commands like `npm start`, `npm run android`
- App metadata

**Important:**
- `"main": "expo-router/entry"` - App entry point (Expo Router)
- NativeWind and Tailwind are installed ✅

### `tailwind.config.js` - Tailwind CSS Setup
**What it does:** Configures NativeWind/Tailwind
- Tells Tailwind which files to scan
- Custom colors, spacing, themes

**Current config:**
```javascript
content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"]
```
**⚠️ Issue:** Should include `"./app/**/*.{js,jsx,ts,tsx}"` since you're using Expo Router!

**Fix:**
```javascript
content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
]
```

### `babel.config.js` - JavaScript Compiler Config
**What it does:** Transforms your code for React Native
- `babel-preset-expo` - Expo's transformations
- `nativewind/babel` - Makes Tailwind work

**Don't touch this unless you know what you're doing!**

### `tsconfig.json` - TypeScript Configuration
**What it does:** TypeScript compiler settings
- Type checking rules
- Module resolution
- Path aliases

**Leave as-is** - Expo sets this up correctly

### `nativewind-env.d.ts` - NativeWind Types
**What it does:** Enables TypeScript support for `className` prop
Without this, TypeScript would complain about `className`

### `eslint.config.js` - Code Linting Rules
**What it does:** Enforces code quality/style
- Catches errors
- Enforces best practices
- Auto-formatting rules

### `.gitignore` - Git Ignore List
**What it does:** Tells Git which files NOT to commit
- `node_modules/` - Don't commit dependencies
- Build files, cache, etc.

---

## 🎯 Where to Start Coding

**Main files to edit:**

1. **`app/(tabs)/index.tsx`** - Your home screen (START HERE!)
2. **`app/(tabs)/explore.tsx`** - Second tab (or delete if not needed)
3. **`components/`** - Create reusable components here
4. **`hooks/`** - Custom hooks for database, settings, etc.

---

## 🚀 Quick Start

1. **Run the app:**
   ```bash
   npm start
   ```

2. **Edit home screen:**
   Open `app/(tabs)/index.tsx`

3. **Use Tailwind:**
   ```tsx
   <View className="flex-1 bg-blue-500 p-4">
     <Text className="text-2xl font-bold text-white">Hello!</Text>
   </View>
   ```

4. **Create new screen:**
   - Add `app/settings.tsx` → becomes `/settings` route
   - Add `app/(tabs)/journal.tsx` → new tab

---

## 📝 File Naming Conventions

- **Screens:** `index.tsx`, `profile.tsx`, `settings.tsx`
- **Components:** `Button.tsx`, `WorkEntryCard.tsx` (PascalCase)
- **Hooks:** `useDatabase.ts`, `useSettings.ts` (camelCase with "use")
- **Utils:** `formatDate.ts`, `exportData.ts` (camelCase)
- **Types:** `types.ts` or `WorkEntry.types.ts`

---

## 🎨 Project Uses

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based navigation
- **NativeWind** - Tailwind CSS for React Native
- **TypeScript** - Type safety

---

**Ready to build!** Start editing `app/(tabs)/index.tsx` 🚀
