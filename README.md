# Kaffe-kedjan

En decentraliserad liggare för att spåra Fair Trade-kaffeleveranser från gård
till rosteri till kafé. Byggd på en Proof-of-Work-blockkedja och exponerad
genom ett Express REST-API.

## Kör

```bash
npm install
npm start
```

## Testa

```bash
npm test
```

Mining-svårighetsgraden sätts automatiskt till `1` när `NODE_ENV=test`, och
till `3` annars, så att testsviten inte hänger sig på en tung PoW-loop.

## API

| Metod  | Endpoint         | Beskrivning                                                        |
|--------|------------------|---------------------------------------------------------------------|
| GET    | `/blockchain`    | Returnerar hela kedjan                                              |
| POST   | `/transactions`  | Lägger till en väntande kaffeleverans (`sender`, `recipient`, `batchId`, `weightKg`) |
| POST   | `/mine`          | Minar alla väntande transaktioner till ett nytt block                |

## TDD-process

Tester skrevs innan implementation för varje enhet. Commit-historik:

1. Block-hashning/PoW — test: `https://github.com/MaxWK96/Inl1KaffeKedja/commit/89fc902505291450a25ddcda395a5d6e3b4fb5e8` → implementation: `https://github.com/MaxWK96/Inl1KaffeKedja/commit/655925bc695d62d3fdc9c5f6ceba80b8c120f237`
2. Blockchain add/mine/validate — test: `https://github.com/MaxWK96/Inl1KaffeKedja/commit/f09d4a502cf3e426af39d57adcb4208ee0ad33b8` → implementation: `https://github.com/MaxWK96/Inl1KaffeKedja/commit/696ea45d4f0422675cf6ed03aae4a53689463052`
3. Express API-endpoints — test: `https://github.com/MaxWK96/Inl1KaffeKedja/commit/72f1024308105b5d5e6145e03200a9cb5086d76e` → implementation: `https://github.com/MaxWK96/Inl1KaffeKedja/commit/ec0281ddf50ce2d47ff1af1eb23bac52fbdca0ac`