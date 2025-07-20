const PORT = 80;

async function handler(
    req: Request,
    info: Deno.ServeHandlerInfo,
): Promise<Response> {
    const url = new URL(req.url);

    let clientIP = "Unknown";

    if (info.remoteAddr.transport === "tcp") {
        clientIP = info.remoteAddr.hostname;
    } else if (info.remoteAddr.transport === "unix") {
        clientIP = "Unix socket";
    }

    console.log(`${req.method} ${url.pathname}`);

    if (url.pathname === "/hello-world" && req.method === "GET") {
        const html = `<!DOCTYPE html>
<html>
    <head>
        <title>Hello world</title>
    </head>

    <body>
        <h1>Hello, world!</h1>
        <p>Your IP address: \`${clientIP}\`</p>
    </body>
</html>`;

        return new Response(html, {
            status: 200,
            headers: {
                "Content-Type": "text/html",
            },
        });
    }

    return new Response("Not found", { status: 404 });
}

console.log(`Server running on port ${PORT}`);
Deno.serve({ port: PORT }, handler);
