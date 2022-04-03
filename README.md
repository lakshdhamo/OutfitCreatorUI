# Random Outfit Creator App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## About
Its a random outfit generator application. It generates the Outfit based on the Country, Gender and category if any. It displays 20 items per page. User can navigate to any page to display the desired product items. User can also view the detailed information about any items by clicking the product image. And, use can come back to home screen by closing the product page. Texts and currencies are localized based on the country selection.

Below are some of the highlights about the App:
1. Its a single page application developed using Angular. 
2. Default Gender is MALE
3. Default Country code is DE
4. Default Offset is 0
5. Default limit is 20
6. Filters can be collapsed and expanded
7. At any point of time, only one Category group will be selected
8. Category selection is handled between parent and child 
9. New set of outfits will be fetched for every category change, gender change, country change, pagination change
10. Implemented pagination and 20 outfits will be created per page. Can be navigated to any page.
11. Detailed Product information can be viewed by clicking any image
12. Product page can be closed to go back to home screen

![image](https://user-images.githubusercontent.com/56861446/161390794-ae64d55a-5fd2-4b4a-be4f-b0a061a3ee5f.png)


## Project setup
Install the project dependencies using ` npm install `

## Development environment 

Used `VS Code` for application development

## API Configuration

API endpoint can be configured in `\environments\environment.ts - apiBase`


## Run the application

Run `npm ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Buildling blocks of the application

1. FilterComponent - Display the category data - filters
2. GlobalheaderComponent - Global header
3. HeaderComponent - Header details for Outfit list
4. LoaderComponent - Show the loading image for every API hit
5. OutfitComponent - Displays the list of outfits
6. OutfitareaComponent - Container for Outfit and filter
7. ProductComponent - Display the individual product
8. ProductdetailComponent - Container for Individual product variant and information components
9. ProductinfoComponent - Displays the detailed information about the product
10. ProductvariantsComponent - Displays the other variants related to the selected product
11. enums - application specific constant values
12. Objects - folder contains various objects used in the application
13. AppRoutingModule - specifies the route configuration
14. CountryService - Interact with backend services related to Country information
15. HttpClientService - Generic interface to interact with backend service
16. AppHttpInterceptor - Intercept every HTTP request and shows the loading icon
17. LoaderService - NO/OFF the loading icon
18. OutfitService - contains the API calls to fetch the filter, translation, outfit, product data
19. environment - contains the environment specific data

