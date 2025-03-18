FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

RUN cd /src

CMD ["bun", "run", "index.ts"]