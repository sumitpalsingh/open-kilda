FROM kilda/base-ubuntu

#RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nginx
RUN echo 'Our first Docker image for Nginx' > /usr/share/nginx/html/index.html
EXPOSE 1010

RUN apt-get install -y maven wget
RUN apt-get install -y net-tools
RUN mkdir -p /app/src

WORKDIR /app

RUN mkdir conf/
ADD pom.xml /app
ADD src/ /app/src/
ADD conf/ /app/conf/
RUN mkdir target
RUN mkdir /app/src/main/resources/fonts/

#WGET FONTS
RUN wget https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf
RUN wget https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2

#WGET CSS
RUN wget --output-document=roboto.css https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i
RUN wget https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
RUN wget https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
RUN wget http://dygraphs.com/2.0.0/dygraph.css
RUN wget https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.14/jquery.datetimepicker.css
RUN wget https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.css

#WGET JS
RUN wget https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
RUN wget https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.14/jquery.datetimepicker.full.js
RUN wget https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.3/moment.js
RUN wget https://cdnjs.cloudflare.com/ajax/libs/dygraph/2.0.0/dygraph.js
RUN wget --output-document=jquery-3.2.1.min.js https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js 
RUN wget https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js

#MOVING FONTS
RUN mv fontawesome-webfont.ttf src/main/resources/fonts/
RUN mv fontawesome-webfont.woff2 src/main/resources/fonts/

#MOVING CSS FILES
RUN mv roboto.css src/main/resources/css/
RUN mv dygraph.css src/main/resources/css/
RUN mv bootstrap.min.css src/main/resources/css/
RUN mv jquery.datetimepicker.css src/main/resources/css/
RUN mv font-awesome.min.css src/main/resources/css/
RUN mv jquery.toast.min.css src/main/resources/css/

#MOVING JAVASCRIPT FILES
RUN mv jquery.datetimepicker.full.js src/main/resources/javascript/
RUN mv bootstrap.min.js src/main/resources/javascript/
RUN mv moment.js src/main/resources/javascript/
RUN mv dygraph.js src/main/resources/javascript/
RUN mv jquery-3.2.1.min.js src/main/resources/javascript/
RUN mv jquery.toast.min.js src/main/resources/javascript/
RUN ls -la 
RUN mvn clean install


CMD ["java","-jar","target/openkilda-gui.jar"]
