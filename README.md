
# Finite Automata Web Application
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/>

![Feature image](https://user-images.githubusercontent.com/29684683/169877999-6c5a922e-8817-48aa-99f0-4a478d20d4ab.png)

## Getting Started
Run the following commands to start the application. You may need to ask for `.env` from a contributor to make this work.
```s
yarn install
yarn start
```

## Built with
- [React](https://reactjs.org): A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org): A strongly typed programming language that builds on JavaScript.
- [React Boilerplate meets CRA](https://github.com/react-boilerplate/react-boilerplate-cra-template): Used as template & structure for our project.

## Database
To keep user input data, we use [Firebase](https://firebase.google.com/) as a database to save & store them. This also includes CRUD & pagination for a better experience.

## Functionality

1. Design a finite automaton (FA) [ [app/models/FaModel.ts](src/app/models/FaModel.ts) ]
2. Test if a FA is deterministic or non-deterministic [ [app/models/FaModel.ts](src/app/models/FaModel.ts) ]
3. Test if a string is accepted by a FA [ [app/models/FaModel.ts](src/app/models/FaModel.ts) ]
4. Construct an equivalent DFA from an NFA [ [app/services/nfa_to_dfa](src/app/services/nfa_to_dfa) ]
5. Minimize a DFA [ [app/services/minimize_dfa](src/app/services/minimize_dfa/MinimizeDfaService.ts) ]


## Prototype
We use Figma to design our prototype. Explore our design with the following link: [Figma Design](https://www.figma.com/file/wQZ6FV9LSMupIvdVjNCw2a/Finite-Automata)

## Authors
See the list of [contributors](https://github.com/cadt-g6/finite_automata/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
