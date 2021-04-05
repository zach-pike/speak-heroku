# Annoy Zach! 👋
This is the repo of the app I made where people can make my computer speak text anonymously!

# Details🚀
To run this app on Heroku, just fork the repo, change what you want and attach Heroku to the repo, everything is set up! Although you may want to look at the configuration section of this README

# How to host on Heroku
Steps

1. Fork the Repository
2. Start the local TTS server
    1. run ``npm run build``
    2. run ``npm run startTTSServer``
    3. Port foward the default port of 8085 
2. Create a new Heroku app on the [dashboard](https://dashboard.heroku.com/apps)
3. Add some Config Vars in **Settings**
    - **IPADDR** should be the address of your local WebSocket TTS server running on your computer
        - Ex: "ws://\<YOUR IP>\:\<PORT (probably 8085)\>"
    - **OWNERSECRET** is the string that is used on the chat on the website that makes your name show up as bold and your set name instead of just "Anon", keep this secret thought because people could impersonate you if you let this public
        - Ex: "OwNeRPw"
4. Link the repo to the Heroku app
5. Access the Heroku app and test that it works.
You should be done!

# How to host locally
1. Fork the Repository
2. Start the local WebSocket TTS server
3. Edit the .env file and change ``OWNERSECRET`` to what you want your ownersecret to as decribed in "How to host on Heroku" Step 3 #2
4. run ``npm run build``
5. open up two terminal windows in the project root directory
6. in one, type ``npm run startTTSServer``
7. in the second one type ``npm run startServer``
8. Port foward port 80 to the world and distribute your ip (this is whyi recommend hosting on Heroku as it acts like a proxy and adds SSL)

# Issues 
If you encouter a error with the program, or want to contribute, Just drop a PR and if adds of fixes something in i'll merge it!

Happy TTS'ing😁