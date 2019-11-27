# WeatherApp

This application allows a user to search for weather information in s specified city.
The data in this application is pulled from `https://openweathermap.org/`
For such a simple application, Angular 8 is not required however, this project is meant to be an exercise
in angular architecture and organization.

According to the API documentation, `We recommend to call API by city ID to get unambiguous result for your city.` which is where the `city.list.json` file comes into play. In an ideal situation, the city and country could be handed to a server side process that would be able to look up the city id in order to follow the documented process.

You will also need to provide your own api key. This is in the `environment.ts` file.
Replace `{{YOUR API KEY}}` with your API key from openweather.

# Note
I do want to recognize that for this task, angular is a bit overkill. The idea behind this project isn't to need to rely on angular but to explore angular architecture and how one might organize an application.

# Setup
This project requires that you have `npm` installed on your machine. Run `npm i` to install the required packages. One complete run `npm start` to start the angular development server. By default angular will broadcast on port `4200`.

# Improvements Made
- Search against a known set of data so we can run validation before we hit the openweather api.
- Split out the city and country input fields in order to better search for data.
- Add a loading bar to indicate that a request is being made.

# Recommended Improvements
- Add auto complete to the city and country code fields that can respond to user input. The more they type the less options available to them.
- Add an empty state message for before any data is loaded into the table.
- Add a success toast when a new entry is added from the table.
- If a cities data is requested that we have already loaded into the table, update that row and add an update toast.
- A detail page that will diaplay all of the weather information for that city.
- Add table filtering, useful if the table dataset becomes quite large.

# Tools
- Postman
- http://www.jsontots.com/
- vscode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
