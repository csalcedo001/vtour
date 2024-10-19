# Development guide

## Clone git repository

```bash
git clone https://github.com/csalcedo001/vtour.git
cd vtour
```

## Build the package

```bash
cd app/vtour
npm install
npm run build
npm link
```

To use the package locally for development:

```bash
cd path/to/your/app
npm link vtour
```

and add components. For this example import as

```typescript
import { OnboardingStep } from 'vtour'

...
```