# Development guide

## Clone git repository

```bash
git clone https://github.com/csalcedo001/vtour.git
cd vtour
```

## Build the package

```bash
cd app/vtour
npm run build
npm link

cd ../ui
npm link vtour
```