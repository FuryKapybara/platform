# DEV-2510-04 (Фаза 1): derived-образ front — брендинг «Мудромашина».
# База = слой прода, сборка секундная (сеть не нужна).
# Содержит ТОЛЬКО: фавиконки (тёмный набор), branding.json (+crm.mudromashina.ru), index.html title.
# Build (на VM): docker build -t mm1/front:s0.7.428-mm1 -f mm1/Dockerfile .
FROM platformcollective/front:s0.7.428

COPY dev/prod/public/huly/ /app/dist/huly/
COPY dev/prod/public/branding.json /app/dist/branding.json
COPY mm1/index.html /app/dist/index.html
COPY mm1/index.html.gz /app/dist/index.html.gz

# ── DEV-2510-05 (Фаза 2): auth-страница «Мудромашина» ──
# Фон auth (6 ассетов под md5-именами бандла) + лого «М» + CSS-инъекция (lime-глассморфизм, кнопки lime punch)
# + патченный login.html (+ .gz, готча №9) с <link mm-auth.css>.
COPY mm1/fase2/img/ /app/dist/img/
COPY mm1/fase2/mm-auth.css /app/dist/mm-auth/
COPY mm1/fase2/mm-logo-m.png /app/dist/mm-auth/
COPY mm1/fase2/login.html /app/dist/login.html
COPY mm1/fase2/login.html.gz /app/dist/login.html.gz

# ── DEV-2510-07 (Фаза 3): Cormorant-вордмарк, кэш-баст фон (/mm-auth/bg-go.webp),
# кнопки Яндекс ID / Сбер ID (mm-auth.js), крупная гостевая кнопка ──
COPY mm1/fase2/mm-auth.css /app/dist/mm-auth/
COPY mm1/fase2/mm-auth.js /app/dist/mm-auth/
COPY mm1/fase2/bg-go.webp /app/dist/mm-auth/
COPY mm1/fase2/fonts/ /app/dist/mm-auth/fonts/
COPY mm1/index.html /app/dist/index.html
COPY mm1/index.html.gz /app/dist/index.html.gz
COPY mm1/fase2/login.html /app/dist/login.html
COPY mm1/fase2/login.html.gz /app/dist/login.html.gz
