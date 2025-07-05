The English version and developer instructions are below.

# Про проєкт

Tetrahedron - програма для візуалізації даних на 3D моделях.
Розроблена для візуалізації результатів розрахунків проведених методом скінченних елементів.
В програмі підтримується один скінченний елемент - тетраедр, від нього і походить назва програми.

## Дизайн

[Проєкт у Figma](https://www.figma.com/design/qRI4mkLqebFSf43ICyF4mn/TETRAHEDRON?node-id=0-1&p=f&t=CPYtHWevupWzcIn4-0)

## Розробники проєкту

#### Дизайнер

- [Саченко Тетяна (ІКМ-221А)](https://github.com/SachenkoTanya)

#### Розробники проєкту

- [Пасічніченко Ілля (ІКМ-221А)](https://github.com/ipasic-softserve)
- [Слободчиков Максим (ІКМ-221А)](https://github.com/Max1mj)

#### Ментори

- [Татарінова Оксана. Завідувачка кафедрою Комп’ютерного Моделювання Процесів та Систем, НТУ "ХПІ"](https://web.kpi.kharkov.ua/cmps/uk/tatarinova-oksana-andriyivna/)
- [Бородін Марія. Аспірант кафедри Комп’ютерного Моделювання Процесів та Систем, НТУ "ХПІ"](https://web.kpi.kharkov.ua/cmps/uk/golovna/vikladatskij-sklad/borodin-mariya-anatoliyivna/)

# About

Tetrahedron - a program for visual data analysis.
It allows you to load files to build models, apply and analyse any data on it (for example stress or displacement)

## Design

[Figma project](https://www.figma.com/design/qRI4mkLqebFSf43ICyF4mn/TETRAHEDRON?node-id=0-1&p=f&t=CPYtHWevupWzcIn4-0)

## Project developers

#### Designer

- [Tetiana Sachenko](https://github.com/SachenkoTanya)

#### Software Developers

- [Illia Pasichnichenko](https://github.com/ipasic-softserve)
- [Maksym Slobodchykov](https://github.com/Max1mj)

#### Mentors

- [Tatarinova Oksana. Head of the Department of Computer Modeling of Processes and Systems, NTU "KhPI"](https://web.kpi.kharkov.ua/cmps/en/main/magistral-staff/tatarinova-oksana/)
- [Mariia Borodin. Ph.D. student at the Department of Computer Modeling of Processes and Systems, NTU "KhPI"](https://web.kpi.kharkov.ua/cmps/en/magistral-staff/borodin-mariia/)

# How to run the project locally

- install Node.js v20.15.1
- `git clone` the project
- install dependencies: `npm i`
- run the project: `npm run dev`
- run tests: `npm run test`

# How to work with Electron

## Running the electron app locally

- `git clone` the project
- install Node.js v20.15.1
- install dependencies: `npm install`
- `npm run transpile:electron` will transpile electron TS code to JS and create a `dist-electron` folder
- `npm run build` will build the react application and create a `dist-react` folder
- `npm run dev:electron` will run the electron application locally in dev mode

## Building electron app for Windows, macOS or Linux:

- `git clone` the project
- install Node.js v20.15.1
- install dependencies: `npm install`

Depending on your OS, run one of the following commands:

- Windows: `npm run dist:win`. If you have an error, try running the same command as administrator
- macOS: `npm run dist:mac`
- Linux: `npm run dist:linux`
  Building process might take a while depending on your computer.
