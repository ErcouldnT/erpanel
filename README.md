# ERPanel

ERPanel is a modern, lightweight, and highly customizable desktop dashboard built to automate operating system tasks and streamline your terminal workflows. Instead of manually typing repetitive terminal commands, ERPanel provides an elegant, persistent graphical interface to execute, monitor, and organize those operations.

Built entirely with the most cutting-edge web and system tech stack:

- **[Tauri v2](https://v2.tauri.app/)** - Secure, lightweight native app foundation
- **[Svelte 5 (Runes)](https://svelte.dev/)** - Lightning-fast frontend reactivity
- **[Tailwind CSS v4](https://tailwindcss.com/) & [daisyUI](https://daisyui.com/)** - Premium, modern UI components
- **[@antfu/eslint-config](https://github.com/antfu/eslint-config)** - High-quality coding standards

## Features

- **Custom Command Widgets**: Add any shell command as a dashboard widget (e.g., `ping google.com`, `brew update`, etc.) and execute them with a single click.
- **Process Management**: Easily start background processes and terminate (`kill`) them directly from the UI when they are active.
- **Live Output Streaming**: View the native OS streams (`stdout` and `stderr`) rendered directly inside the widget console in real time.
- **System Cron Viewer**: Automatically parses your OS scheduled background cron jobs (`crontab -l`) and displays them in a beautiful table format.
- **Persistent Storage**: All custom dashboards are permanently saved securely on your disk utilizing `@tauri-apps/plugin-store`.
- **Import/Export Dashboard**: Share your custom widget configurations with friends or back them up effortlessly via JSON.

## Prerequisites

Before building, you must have the required development toolchains installed:

- [Node.js](https://nodejs.org/en) (macOS/Windows/Linux)
- [Rust & Cargo](https://rustup.rs/) (Tauri core backend)
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start the Development Server**

   ```bash
   npm run tauri dev
   ```

   _This commands starts the Vite web server alongside the native Tauri Rust backend._

3. **Build the Application**
   ```bash
   npm run tauri build
   ```
   _This packages the macOS `.app` (or respective native OS binary) and saves it in the `src-tauri/target/release/bundle/` directory._

## Code Quality

To maintain the high standards of the codebase:

- `npm run lint` - Runs ESLint checks on the entire project
- `npm run format` - Automatically formats, lints, and fixes Svelte/TS code issues
- `npm run check` - Svelte compiler type checking

## License

This project is entirely open-source and licensed under the [MIT License](LICENSE).
