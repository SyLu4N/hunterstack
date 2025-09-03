// env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    TZ: string;

    NEXT_PUBLIC_BASE_URL_BACKEND: string;
  }
}
