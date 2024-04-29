FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=coordinadora
ENV MYSQL_USER=coordinadora
ENV MYSQL_PASSWORD=coordinadora

ADD coordinadora_DLL.sql /docker-entrypoint-initdb.d
ADD coordinadora_DML.sql /docker-entrypoint-initdb.d

EXPOSE 3306
