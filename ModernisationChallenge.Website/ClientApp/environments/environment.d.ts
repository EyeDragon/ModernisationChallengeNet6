declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            DEBUG_MODE: boolean,
            LOCAL_BE: string,
        }
    }
}

export { }
