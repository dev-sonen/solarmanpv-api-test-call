# solarmanpv-api-test-call

Install dependencies.

    >_ npm install

Create environment variables file.

    >_ touch .env

Properties for .env

    NETWORK_PORT=<port>
    APP_ID=<app_id>
    APP_SECRET=<app_secret>

    CREDENTIALS_EMAIL=<email>
    CREDENTIALS_USERNAME=<username>
    CREDENTIALS_PASSWORD=<password_converted_to_SHA256>

Examples: ("Dummy values.")

    NETWORK_PORT=3000
    APP_ID=643812945675319
    APP_SECRET=783615b9ca3185dc009d462813e4b8e6

    CREDENTIALS_EMAIL=your_email@email.com
    CREDENTIALS_USERNAME=myCoolUsername
    CREDENTIALS_PASSWORD=81ca60c48071aa91d7358fc84f0ce25702063ce0427f74cc3715eb6383a49dd6

Run the app.

    Development server:     >_ npm run dev
    Deployment server:      >_ npm run start
