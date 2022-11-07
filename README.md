# Qatar World Cup Prode

## Description

This repository contains a project created for didactic purposes only. 

The App consists of a prediction game of the results of the matches played during the Qatar 2022 World Cup. 

Users must register and be logged in to be able to store the results and compare the score obtained with the rest of the participants.

You can visit the deployed project at  [https://qatarworldcup-prode.web.app/](https://qatarworldcup-prode.web.app/)

## Technologies implemented

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) ![Day.js](https://img.shields.io/badge/day.js-CA4245?style=for-the-badge) ![SweetAlert2](https://img.shields.io/badge/Flag_icons-%23e4ae93.svg?style=for-the-badge)

* [React JS](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Router Dom](https://reactrouter.com/)
* [Material UI](https://mui.com/)
* [Firebase](https://firebase.google.com/)
* [Day.JS](https://day.js.org/)
* [Flag-icons](https://github.com/lipis/flag-icons)

## Run project

You can run the project by downloading it as .zip or cloning it with:

```
git clone https://github.com/Mate0Alvarez/worlcup_game_prediction_react.git
cd worlcup_game_prediction_react
```

Install all dependencies:

```
npm install
```

Luego es necesario crear un proyecto en Firebase y crear una colección en Firestore (`games`). Para realizar una carga de partidos masiva, puede implementarse el componente `<LoadGames>`.

##### Game example:
```
game = {
        "local": "Cameroon",
        "local_score": "-",
        "local_code": "cm",
        "visitor": "Brazil",
        "visitor_score": "-",
        "visitor_code": "br",
        "final_result": "-",
        "time_stamp": "2022-12-2 16:00",
        "status": "pending",
        "date": "2022-12-02"
    }
```

The `users` collection will be created automatically when each user registers.

Once the app is available in Firebase, having loaded games, rename the `.env.example` file located at the root of the project to `.env` and fill in the Firebase-provided configuration variables:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

Start server with:

```
npm start
```

The project will run in `http://localhost:3000`

## Additional comments

### MaterialUI
Material UI was chosen as the component library to streamline the application development and styling process, taking advantage of the possibility of extending the components through the use of themes.
### Firebase
The list of games and user authentication was provided by the integration with Firebase services.
### Day.JS
Day.JS was implemented to optimize the correct handling of dates.
### Flag-icons
This library was implemented to obtain the flag icon of each of the participating countries.
