FROM node:14.15.0-alpine
WORKDIR /app/backend
COPY package.json package.json 
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
# COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]
# RUN ls -la
RUN npm install
COPY . .
# ADD . /app
# RUN ls -la
# RUN ls -la
EXPOSE 3000
CMD ["npm", "run", "start:dev"]