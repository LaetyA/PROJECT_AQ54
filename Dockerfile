#image docker
FROM nginx:alpine

#auteur 
LABEL auteur = "ATELIE"

#fichier du projet
COPY index.html /usr/share/nginx/html/
COPY src /usr/share/nginx/html/src

# Port : 8080
EXPOSE 8080

#commande à executer 

CMD ["nginx","-g","daemon off;"]

