export interface Env {
    // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
    // MY_KV_NAMESPACE: KVNamespace;
    //
    // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    //
    // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
    // MY_BUCKET: R2Bucket;
}

const DOC_RE = /\/(?:(\d+\.\d+\.\d+|master)\/)?(.*)/g;
const ZIG_DOC_URL = "https://ziglang.org/documentation";

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname == "/") {
            return new Response(`zigstd.cro.sh (beta)


Example pathnames: 

/master/ArrayList
/0.7.0/ArrayList
/ArrayList (implies master)`, { headers: { "Content-Type": "text/plain" } });
        }


        console.log(url.pathname);
        let match = DOC_RE.exec(url.pathname);
        DOC_RE.lastIndex = 0;
        if (match === null) {
            return new Response(`Bad request! 



Example pathnames: 

/master/ArrayList
/0.7.0/ArrayList
/ArrayList (implies master)
`, { status: 400, headers: { "Content-Type": "text/plain" } });
        }


        const version = match[1] ?? "master";
        let search = match[2];
        search = "?" + search;

        return Response.redirect(ZIG_DOC_URL + `/${version}/std/#${search}`);
    },
};
