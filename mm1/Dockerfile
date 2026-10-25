# DEV-2510-04 (Фаза 1): derived-образ front — брендинг «Мудромашина».
# База = слой прода, сборка секундная (сеть не нужна).
# Содержит ТОЛЬКО: фавиконки (тёмный набор), branding.json (+crm.mudromashina.ru), index.html title.
# Build (на VM): docker build -t mm1/front:s0.7.428-mm1 -f mm1/Dockerfile .
FROM platformcollective/front:s0.7.428

COPY dev/prod/public/huly/ /app/dist/huly/
COPY dev/prod/public/branding.json /app/dist/branding.json
COPY mm1/index.html /app/dist/index.html
COPY mm1/index.html.gz /app/dist/index.html.gz
