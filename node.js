const http = require('http');
const os = require('os');

// Create the server
const server = http.createServer((req, res) => {
    // Simulate asynchronous operation with random delay
    const delay = Math.random() * 1000; // Delay in milliseconds
    setTimeout(() => {
        //  Handle GET route to return CPU and OS information
        if (req.method === 'GET' && req.url === '/info') {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*'); // CORS configuration

            // Extract CPU and OS information
            const cpuInfo = os.cpus();
            const osInfo = {
                platform: os.platform(),
                arch: os.arch(),
                release: os.release(),
                totalMemory: os.totalmem(),
                freeMemory: os.freemem()
            };

            // Send response with CPU and OS information
            res.end(JSON.stringify({ cpu: cpuInfo, os: osInfo }));
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    }, delay);
});

// Start the server
const PORT = 3000; // Choose any port you prefer
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

