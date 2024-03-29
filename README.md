# echo web frontend

[![Jest](https://github.com/echo-webkom/echo-web-frontend/actions/workflows/jest_test.yaml/badge.svg)](https://github.com/echo-webkom/echo-web-frontend/actions/workflows/jest_test.yaml)
[![Cypress](https://github.com/echo-webkom/echo-web-frontend/actions/workflows/cypress_test.yaml/badge.svg)](https://github.com/echo-webkom/echo-web-frontend/actions/workflows/cypress_test.yaml)

<a href="https://vercel.com/?utm_source=echo-webkom&utm_campaign=oss" target="_blank" rel="noopener">
   <img src="public/powered-by-vercel.svg" width="175" alt="Powered by Vercel" />
</a>

Frontend til nettsiden til **echo – Linjeforeningen for informatikk** ved Universitetet i Bergen.

Utviklet av frivillige informatikkstudenter fra undergruppen **echo Webkom**.

## Tilbakemeldinger

Har du noen tilbakemeldinger til nettsiden?
Vi jobber hele tiden med å forbedre den,
og setter stor pris på om du sier ifra om noe er feil,
eller du har idéer til nye endringer!

Fyll gjerne ut skjemaet [her](https://forms.gle/r9LNMFjanUNP7Gph9),
eller send oss en mail på [webkom-styret@echo.uib.no](mailto:webkom-styret@echo.uib.no).

## Oppsett for utviklere

**1. Klon Git-repoet.**

    git clone git@github.com:echo-webkom/echo-web-frontend

**2. Naviger til riktig mappe.**

    cd echo-web-frontend

**3. Installer dependencies (du trenger [yarn](https://classic.yarnpkg.com/en/docs/install) for dette).**

    yarn

**4. Kopier innholdet i `.env.example` til en fil med navn `.env` (og evt. fyll inn verdier for feltene).**

    cp .env.example .env

**5. Start en lokal server.**

    yarn dev

Gå til `localhost:3000` i en nettleser for å se nettsiden.
