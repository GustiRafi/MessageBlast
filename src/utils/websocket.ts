import WebSocket from 'ws';

const clients = new Map<string, WebSocket>();

const initWebSocket = (server: any) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws: WebSocket, req) => {
        const userId = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('userId');

        if (!userId) {
            ws.close();
            return;
        }

        console.log(`User ${userId} connected to WebSocket`);
        clients.set(userId, ws);

        ws.on('message', (message: string) => {
            console.log(`Received from ${userId}: ${message}`);
        });

        ws.on('close', () => {
            console.log(`User ${userId} disconnected`);
            clients.delete(userId);
        });
    });
};

const sendToUser = (userId: string, data: any) => {
    const ws = clients.get(userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
    }
};

export { initWebSocket, sendToUser };
