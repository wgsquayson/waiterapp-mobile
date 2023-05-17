# WaiterApp - Mobile

Hi! Welcome to WaiterApp, a system that handles the orders at a restaurant, with real-time updates.

This system is a personal project, and has other two parts, [api](https://github.com/wgsquayson/waiterapp-api) and [frontend](https://github.com/wgsquayson/waiterapp-web). The mobile part is responsible for taking orders and sending them to the board, which is updated in real-time when an order comes in. This app was built using:

- [Expo](https://expo.dev)
- [Typescript](https://www.typescriptlang.org)
- [Styled-Components](https://styled-components.com) for styling
- [Axios](https://axios-http.com/docs/intro) for api calls
- [Intl](https://www.npmjs.com/package/intl) for currency handling

## How to run this app

- Clone this repository
- Run `yarn` on the root folder to install the project dependencies
- Run `yarn android` or `yarn ios` depending on which environment you have

## Preview

The app was built in brazilian portuguese, but it's pretty straight forward: you start a new order, fill in the table, choose the order items and send them to the order board.

| Filter the menu | Make a new order |
| -- | -- |
|<video src="https://github.com/wgsquayson/waiterapp-mobile/assets/43099794/ec2f2107-e6ff-48a7-bc2d-fa4323ccc96b" height="600"/> |<video src="https://github.com/wgsquayson/waiterapp-mobile/assets/43099794/3e01e4d3-aa2f-4bd0-b62f-de0613636b25" /> |

