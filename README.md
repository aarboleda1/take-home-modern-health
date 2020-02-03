# Modern Health Take Home Coding Exercise
This a React application that displays messages in an infinite scrolling list. View a live link [here](https://take-home-modern-health.stackblitz.io/)

## Features
- All messages are displayed in a list.
- Each message has its `content`, `senderUuid`, and `sentAt` properties displayed.
- Messages are displayed at-most once. If there are duplicated messages, they are deduplicated if the `uuid` and `content` are the same.
- Displays a more
human-readable string such as "DayOfTheWeek Month Day, Year at Time".
- Supports sorting by `sentAt` in either ascending or descending order.
- Supports pagination through messages where each page contains 5 messages. 
- Allows for a message to be deleted.

## Potential Enhancements
- Session storage in the browser to know exactly where in the the chat list the user was last viewing. 
- UI enhancements such as having a more defined color pallete and theme throughout the application
- Display the username rather than the senderUuid
- Make the List a re-usable infinite scroll list component 