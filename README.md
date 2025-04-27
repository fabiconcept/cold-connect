# Cold Connect

Cold Connect is a mobile application designed to bridge the gap between ColdHubs' cold storage services, logistics, and their users. It offers a smooth and user-friendly way for customers to book cold storage, buy crates, and request cold truck logistics, all in one place.

---

## Features

- 📦 **Cold Storage Booking**  
  Book crates in high or low quantities easily.

- 🚚 **Cold Logistics**  
  Hire 10 or 20-ton refrigerated trucks to transport perishables across Nigeria.

- 🔐 **Secure User Flow**  
  Local authentication setup (planned) for protecting user data.

- 🎨 **Beautiful UI**  
  Built with Tailwind CSS for fast and responsive designs.

- ⚡ **Smooth Performance**  
  Built using Expo and React Native with NativeWind for styling.

---

## Tech Stack

- **Framework:** [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- **Styling:** [TailwindCSS via NativeWind](https://www.nativewind.dev/)
- **State Management:** Redux
- **TypeScript:** Full Type Safety

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Yarn (`npm install --global yarn`)

### Installation

```bash
# Clone the repository
git clone https://github.com/fabiconcept/cold-connect.git

# Navigate into the project directory
cd cold-connect

# Install dependencies
npm install

# Start the Expo app
npm start
```

### Running on Mobile

- Scan the QR code from the terminal or browser after running `npm start`.

---

## Folder Structure

```
/app         # Pages and Navigation
/assets      # Images and static files
/components  # Reusable UI components
/constants   # App-wide constants
/lib         # Helper functions and libraries
/scripts     # Setup or configuration scripts
/store       # Redux store and slices
/types       # TypeScript types
```

---

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add some awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
