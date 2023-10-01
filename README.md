# program.me

Work in Progress - Synopsis to include at a later date

### Setup

Yarn is the package manager of choice for this repository.

### Development

```
yarn
yarn dev
```

### Production

```
yarn
yarn build
yarn start
```

Or build an image from the Dockerfile:

```
docker build . -t "pairprogramme"
docker run -dp 3000:3000 pairprogramme
```
