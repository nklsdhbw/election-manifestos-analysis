# 📊 Election manifestos analysis
As part of the Natural Language Processing module at the DHBW Mannheim, the election manifestos of the FDP, CDU-CSU, Die Linke, Die Grünen and the AFD were analysed and compared.
The following points were analysed
- ⚖️ Similarity of the manifestos
- 👀 Sentiment of the manifestos
- 📚 Topic modelling
- 🧮 Most frequent words
## ✍🏼 Contributors
![Niklas Scholz](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/96066220?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d
)                          ![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/96065475?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d
)                          ![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/28670581?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d
)                            ![avatar](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/96066381?v=4&h=100&w=100&fit=cover&mask=circle&maxage=7d
)

[Niklas Scholz](https://github.com/nklsdhbw?tab=repositories) [Luca Mohr](https://github.com/Luca2732) [Christian Schmid](https://github.com/chris017) [Jan Mühlnikel](https://github.com/JanMuehlnikel)

## 🚀 Getting started
Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Mac or Windows. [Docker Compose](https://docs.docker.com/compose/) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).

## ⬇️ Download repository & run the application
Run the following command in your terminal to download the repo. You can also use your package-manager of choice.

    wget https://github.com/nklsdhbw/election-manifestos-analysis/archive/refs/heads/main.zip
  
  Now unzip the `main.zip` folder e.g. with the `unzip`package
 
	 unzip main.zip

Change to the directory containing the `docker-compose.yml` file

	cd election-manifestos-analysis/docker

Now start the containers using the following command

	docker compose up --build
The  `frontend React-app`  will then be running at  [http://localhost:3000](http://localhost:3000/).

## 💻 Tech-stack
 ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
 
